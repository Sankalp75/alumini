import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDb, getDbPath } from "./db.js";
import { runSeed } from "./seed.js";
import { authRouter } from "./routes/auth.js";
import { alumniRouter } from "./routes/alumni.js";
import { feedRouter } from "./routes/feed.js";
import { collegesRouter } from "./routes/colleges.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

// Ensure DB schema exists, then seed demo data if empty
getDb();
const seedResult = runSeed(false);
if (seedResult.skipped) {
  console.log(`[db] Using existing database at ${seedResult.dbPath}`);
} else {
  console.log(`[db] Seeded ${seedResult.seeded} alumni into ${seedResult.dbPath}`);
}

const app = express();

app.use(
  cors({
    origin: [CLIENT_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "alumni-connect-express",
    dbPath: getDbPath(),
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/alumni", alumniRouter);
app.use("/api/feed", feedRouter);
app.use("/api/colleges", collegesRouter);

// Visible local test page (Phase 2 demo)
app.get("/demo", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "demo.html"));
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const anyErr = err as { status?: number; statusCode?: number; type?: string; message?: string };
  if (anyErr?.type === "entity.parse.failed" || anyErr?.status === 400 || anyErr?.statusCode === 400) {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[server] Express API listening on http://localhost:${PORT}`);
  console.log(`[server] Health: http://localhost:${PORT}/api/health`);
  console.log(`[server] Live test UI: http://localhost:${PORT}/demo`);
  console.log(`[server] Demo admin: manpreet.singh@example.com / Password123`);
});
