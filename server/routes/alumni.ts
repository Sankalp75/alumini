import { Router } from "express";
import { z } from "zod";
import { getDb, nowIso } from "../db.js";
import { mapAlumni } from "../mappers.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const alumniRouter = Router();

alumniRouter.get("/", requireAuth, (req, res) => {
  const { search, batch, branch, college } = req.query;
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM alumni_profiles ORDER BY name COLLATE NOCASE ASC")
    .all() as Parameters<typeof mapAlumni>[0][];

  let list = rows.map(mapAlumni);

  if (typeof batch === "string" && batch && batch !== "All") {
    list = list.filter((p) => p.batch === batch);
  }
  if (typeof branch === "string" && branch && branch !== "All") {
    list = list.filter((p) => p.branch === branch);
  }
  if (typeof college === "string" && college && college !== "All") {
    list = list.filter((p) => p.college === college);
  }
  if (typeof search === "string" && search.trim()) {
    const s = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.company.toLowerCase().includes(s) ||
        p.email.toLowerCase().includes(s) ||
        p.college.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s)
    );
  }

  res.json({ alumni: list });
});

alumniRouter.get("/:id", requireAuth, (req, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(req.params.id) as
    | Parameters<typeof mapAlumni>[0]
    | undefined;

  if (!row) {
    res.status(404).json({ error: "Alumni not found" });
    return;
  }

  res.json({ alumni: mapAlumni(row) });
});

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  batch: z.string().min(2).optional(),
  branch: z.enum(["CSE", "ECE", "ME", "CE", "EE", "IT", "Other"]).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  contact: z.string().optional(),
  linkedinUrl: z.string().optional(),
  photoURL: z.string().optional(),
});

alumniRouter.patch("/:id", requireAuth, (req: AuthedRequest, res) => {
  const targetId = req.params.id;
  const isOwner = req.user!.uid === targetId;
  const isAdmin = req.user!.role === "admin";

  if (!isOwner && !isAdmin) {
    res.status(403).json({ error: "You can only edit your own profile" });
    return;
  }

  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid profile data", details: parsed.error.flatten() });
    return;
  }

  const db = getDb();
  const existing = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(targetId) as
    | Parameters<typeof mapAlumni>[0]
    | undefined;

  if (!existing) {
    res.status(404).json({ error: "Alumni not found" });
    return;
  }

  const data = parsed.data;
  const ts = nowIso();
  db.prepare(`
    UPDATE alumni_profiles SET
      name = ?,
      batch = ?,
      branch = ?,
      college = ?,
      company = ?,
      location = ?,
      contact = ?,
      linkedin_url = ?,
      photo_url = ?,
      updated_at = ?
    WHERE uid = ?
  `).run(
    data.name ?? existing.name,
    data.batch ?? existing.batch,
    data.branch ?? existing.branch,
    data.college ?? existing.college,
    data.company ?? existing.company,
    data.location ?? existing.location,
    data.contact ?? existing.contact,
    data.linkedinUrl ?? existing.linkedin_url,
    data.photoURL ?? existing.photo_url,
    ts,
    targetId
  );

  const row = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(targetId) as Parameters<
    typeof mapAlumni
  >[0];
  res.json({ alumni: mapAlumni(row) });
});
