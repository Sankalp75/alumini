import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = path.join(__dirname, "data", "alumniconnect.db");
const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : defaultDbPath;

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (db) return db;

  db = new DatabaseSync(dbPath);
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      uid TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS alumni_profiles (
      uid TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      batch TEXT NOT NULL,
      branch TEXT NOT NULL,
      college TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      contact TEXT NOT NULL DEFAULT '',
      linkedin_url TEXT NOT NULL DEFAULT '',
      photo_url TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'alumni' CHECK (role IN ('alumni', 'admin')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS feed_posts (
      id TEXT PRIMARY KEY,
      author_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_photo TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL CHECK (type IN ('announcement', 'job', 'event')),
      content TEXT NOT NULL,
      link TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (author_id) REFERENCES users(uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS college_requests (
      id TEXT PRIMARY KEY,
      college_name TEXT NOT NULL,
      affiliation TEXT NOT NULL DEFAULT '',
      district TEXT NOT NULL DEFAULT '',
      address TEXT NOT NULL DEFAULT '',
      aicte_code TEXT NOT NULL DEFAULT '',
      authority_name TEXT NOT NULL,
      authority_designation TEXT NOT NULL DEFAULT '',
      authority_email TEXT NOT NULL,
      authority_phone TEXT NOT NULL DEFAULT '',
      official_website TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      requested_by TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (requested_by) REFERENCES users(uid) ON DELETE SET NULL
    );
  `);

  return db;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function getDbPath(): string {
  return dbPath;
}
