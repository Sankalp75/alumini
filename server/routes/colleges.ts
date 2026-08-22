import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getDb, nowIso } from "../db.js";
import { mapCollege } from "../mappers.js";
import {
  optionalAuth,
  requireAuth,
  requireAdmin,
  type AuthedRequest,
} from "../middleware/auth.js";

export const collegesRouter = Router();

const createSchema = z.object({
  collegeName: z.string().min(2),
  affiliation: z.string().default(""),
  district: z.string().default(""),
  address: z.string().default(""),
  aicteCode: z.string().default(""),
  authorityName: z.string().min(2),
  authorityDesignation: z.string().default(""),
  authorityEmail: z.string().email(),
  authorityPhone: z.string().default(""),
  officialWebsite: z.string().default(""),
});

collegesRouter.post("/requests", optionalAuth, (req: AuthedRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid college request", details: parsed.error.flatten() });
    return;
  }

  const id = randomUUID();
  const ts = nowIso();
  const data = parsed.data;
  const db = getDb();

  db.prepare(`
    INSERT INTO college_requests (
      id, college_name, affiliation, district, address, aicte_code,
      authority_name, authority_designation, authority_email, authority_phone,
      official_website, status, requested_by, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)
  `).run(
    id,
    data.collegeName,
    data.affiliation,
    data.district,
    data.address,
    data.aicteCode,
    data.authorityName,
    data.authorityDesignation,
    data.authorityEmail.toLowerCase(),
    data.authorityPhone,
    data.officialWebsite,
    req.user?.uid ?? null,
    ts,
    ts
  );

  const row = db.prepare("SELECT * FROM college_requests WHERE id = ?").get(id) as Parameters<
    typeof mapCollege
  >[0];
  res.status(201).json({ request: mapCollege(row) });
});

collegesRouter.get("/requests", requireAuth, requireAdmin, (_req, res) => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM college_requests ORDER BY created_at DESC")
    .all() as Parameters<typeof mapCollege>[0][];
  res.json({ requests: rows.map(mapCollege) });
});

const statusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

collegesRouter.patch("/requests/:id", requireAuth, requireAdmin, (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status update" });
    return;
  }

  const db = getDb();
  const existing = db.prepare("SELECT id FROM college_requests WHERE id = ?").get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: "College request not found" });
    return;
  }

  const ts = nowIso();
  db.prepare("UPDATE college_requests SET status = ?, updated_at = ? WHERE id = ?").run(
    parsed.data.status,
    ts,
    req.params.id
  );

  const row = db.prepare("SELECT * FROM college_requests WHERE id = ?").get(req.params.id) as Parameters<
    typeof mapCollege
  >[0];
  res.json({ request: mapCollege(row) });
});
