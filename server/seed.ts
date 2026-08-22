import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { getDb, getDbPath, nowIso } from "./db.js";
import { DEMO_PASSWORD, SEED_ALUMNI } from "./seed-data.js";

export function runSeed(force = false): { seeded: number; skipped: boolean; dbPath: string } {
  const db = getDb();
  const countRow = db.prepare("SELECT COUNT(*) AS c FROM alumni_profiles").get() as { c: number };

  if (!force && countRow.c >= 15) {
    return { seeded: 0, skipped: true, dbPath: getDbPath() };
  }

  if (force) {
    db.exec(`
      DELETE FROM college_requests;
      DELETE FROM feed_posts;
      DELETE FROM alumni_profiles;
      DELETE FROM users;
    `);
  }

  const passwordHash = bcrypt.hashSync(DEMO_PASSWORD, 10);
  const insertUser = db.prepare(
    "INSERT INTO users (uid, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
  );
  const insertProfile = db.prepare(`
    INSERT INTO alumni_profiles (
      uid, name, email, batch, branch, college, company, location, contact,
      linkedin_url, photo_url, role, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', ?, ?, ?)
  `);
  const insertFeed = db.prepare(`
    INSERT INTO feed_posts (
      id, author_id, author_name, author_photo, type, content, link, created_at, updated_at
    ) VALUES (?, ?, ?, '', ?, ?, '', ?, ?)
  `);

  let seeded = 0;
  let adminUid = "";
  let adminName = "";

  db.exec("BEGIN");
  try {
    for (const s of SEED_ALUMNI) {
      const email = `${s.name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
      const existing = db.prepare("SELECT uid FROM users WHERE email = ?").get(email);
      if (existing) continue;

      const uid = randomUUID();
      const ts = nowIso();
      const role = s.role || "alumni";

      insertUser.run(uid, email, passwordHash, ts);
      insertProfile.run(
        uid,
        s.name,
        email,
        s.batch,
        s.branch,
        s.college,
        s.company,
        s.location,
        s.contact,
        s.linkedinUrl,
        role,
        ts,
        ts
      );

      if (role === "admin") {
        adminUid = uid;
        adminName = s.name;
      }
      seeded += 1;
    }

    if (adminUid) {
      const feedCount = db.prepare("SELECT COUNT(*) AS c FROM feed_posts").get() as { c: number };
      if (feedCount.c === 0) {
        const ts = nowIso();
        insertFeed.run(
          randomUUID(),
          adminUid,
          adminName,
          "announcement",
          "Welcome to Alumni Connect! This feed is powered by the Express API (Firebase replaced).",
          ts,
          ts
        );
        insertFeed.run(
          randomUUID(),
          adminUid,
          adminName,
          "job",
          "Demo job post: Infosys is hiring CSE graduates from Punjab colleges. Apply via your placement cell.",
          ts,
          ts
        );
        insertFeed.run(
          randomUUID(),
          adminUid,
          adminName,
          "event",
          "Demo event: Alumni meetup in Chandigarh next month. Stay tuned for RSVP details.",
          ts,
          ts
        );
      }
    }
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  return { seeded, skipped: false, dbPath: getDbPath() };
}

const isDirectRun = process.argv[1]?.replace(/\\/g, "/").endsWith("/server/seed.ts");
if (isDirectRun) {
  const force = process.argv.includes("--force");
  const result = runSeed(force);
  if (result.skipped) {
    console.log(`Already seeded — skipping. DB: ${result.dbPath}`);
    console.log("Use: npm run seed -- --force  to reseed.");
  } else {
    console.log(`Seeded ${result.seeded} alumni into ${result.dbPath}`);
    console.log("Admin login: manpreet.singh@example.com / Password123");
    console.log("Alumni login example: arjun.sharma@example.com / Password123");
  }
}
