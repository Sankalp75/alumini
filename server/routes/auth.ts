import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getDb, nowIso } from "../db.js";
import { mapAlumni } from "../mappers.js";
import { requireAuth, signToken, type AuthedRequest } from "../middleware/auth.js";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  batch: z.string().min(2),
  branch: z.enum(["CSE", "ECE", "ME", "CE", "EE", "IT", "Other"]),
  college: z.string().default(""),
  company: z.string().default(""),
  location: z.string().default(""),
  contact: z.string().default(""),
  linkedinUrl: z.string().default(""),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid registration data", details: parsed.error.flatten() });
    return;
  }

  const data = parsed.data;
  const email = data.email.toLowerCase();
  const db = getDb();
  const existing = db.prepare("SELECT uid FROM users WHERE email = ?").get(email);
  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const uid = randomUUID();
  const passwordHash = bcrypt.hashSync(data.password, 10);
  const ts = nowIso();

  const insertUser = db.prepare(
    "INSERT INTO users (uid, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
  );
  const insertProfile = db.prepare(`
    INSERT INTO alumni_profiles (
      uid, name, email, batch, branch, college, company, location, contact,
      linkedin_url, photo_url, role, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', 'alumni', ?, ?)
  `);

  db.exec("BEGIN");
  try {
    insertUser.run(uid, email, passwordHash, ts);
    insertProfile.run(
      uid,
      data.name,
      email,
      data.batch,
      data.branch,
      data.college,
      data.company,
      data.location,
      data.contact,
      data.linkedinUrl,
      ts,
      ts
    );
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  const row = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(uid) as Parameters<
    typeof mapAlumni
  >[0];
  const profile = mapAlumni(row);
  const token = signToken({
    uid: profile.uid,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    photoURL: profile.photoURL,
  });

  res.status(201).json({ token, user: profile });
});

authRouter.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid login data" });
    return;
  }

  const email = parsed.data.email.toLowerCase();
  const db = getDb();
  const user = db
    .prepare("SELECT uid, email, password_hash FROM users WHERE email = ?")
    .get(email) as { uid: string; email: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(parsed.data.password, user.password_hash)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const row = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(user.uid) as Parameters<
    typeof mapAlumni
  >[0];
  const profile = mapAlumni(row);
  const token = signToken({
    uid: profile.uid,
    name: profile.name,
    email: profile.email,
    role: profile.role,
    photoURL: profile.photoURL,
  });

  res.json({ token, user: profile });
});

authRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM alumni_profiles WHERE uid = ?").get(req.user!.uid) as
    | Parameters<typeof mapAlumni>[0]
    | undefined;

  if (!row) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json({ user: mapAlumni(row) });
});
