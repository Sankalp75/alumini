import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getDb, nowIso } from "../db.js";
import { mapFeed } from "../mappers.js";
import { requireAuth, requireAdmin, type AuthedRequest } from "../middleware/auth.js";

export const feedRouter = Router();

feedRouter.get("/", requireAuth, (req, res) => {
  const limitRaw = Number(req.query.limit ?? 20);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 20;
  const db = getDb();
  const rows = db
    .prepare(
      "SELECT * FROM feed_posts ORDER BY created_at DESC LIMIT ?"
    )
    .all(limit) as Parameters<typeof mapFeed>[0][];

  res.json({ posts: rows.map(mapFeed) });
});

const createSchema = z.object({
  type: z.enum(["announcement", "job", "event"]),
  content: z.string().min(10),
  link: z.string().default(""),
});

feedRouter.post("/", requireAuth, requireAdmin, (req: AuthedRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid feed post", details: parsed.error.flatten() });
    return;
  }

  const id = randomUUID();
  const ts = nowIso();
  const db = getDb();
  db.prepare(`
    INSERT INTO feed_posts (
      id, author_id, author_name, author_photo, type, content, link, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.user!.uid,
    req.user!.name,
    req.user!.photoURL || "",
    parsed.data.type,
    parsed.data.content,
    parsed.data.link || "",
    ts,
    ts
  );

  const row = db.prepare("SELECT * FROM feed_posts WHERE id = ?").get(id) as Parameters<
    typeof mapFeed
  >[0];
  res.status(201).json({ post: mapFeed(row) });
});
