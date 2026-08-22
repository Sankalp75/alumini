/**
 * Phase 2 — Gate A: local Express API verification (no frontend required).
 * Prerequisite: `npm run server` on port 4000.
 *
 * Run: npm run test:api
 */

const base = process.env.API_BASE || "http://localhost:4000";

type Check = { name: string; ok: boolean; detail?: string };

const results: Check[] = [];

function pass(name: string, detail?: string) {
  results.push({ name, ok: true, detail });
  console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name: string, detail: string): never {
  results.push({ name, ok: false, detail });
  console.error(`  FAIL  ${name} — ${detail}`);
  throw new Error(detail);
}

async function req(
  method: string,
  path: string,
  opts: { token?: string; body?: unknown; expectStatus?: number } = {}
) {
  const headers: Record<string, string> = {};
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();
  let json: Record<string, unknown> = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (opts.expectStatus !== undefined && res.status !== opts.expectStatus) {
    throw new Error(
      `${method} ${path} expected ${opts.expectStatus}, got ${res.status}: ${text}`
    );
  }

  return { status: res.status, json, text };
}

async function main() {
  console.log(`\n=== Gate A: Local API verification ===`);
  console.log(`Target: ${base}\n`);

  // 1. Health
  {
    const { status, json } = await req("GET", "/api/health", { expectStatus: 200 });
    if (!json.ok) fail("health", "ok !== true");
    pass("GET /api/health", `status ${status}, db present`);
  }

  // 2. Reject bad login
  {
    const { status } = await req("POST", "/api/auth/login", {
      body: { email: "manpreet.singh@example.com", password: "wrong" },
      expectStatus: 401,
    });
    pass("POST /api/auth/login (bad password)", `status ${status}`);
  }

  // 3. Admin login
  let adminToken = "";
  let adminUid = "";
  {
    const { json } = await req("POST", "/api/auth/login", {
      body: { email: "manpreet.singh@example.com", password: "Password123" },
      expectStatus: 200,
    });
    const user = json.user as { name: string; role: string; uid: string };
    if (!json.token || user?.role !== "admin") fail("admin login", JSON.stringify(json));
    adminToken = json.token as string;
    adminUid = user.uid;
    pass("POST /api/auth/login (admin)", `${user.name} / ${user.role}`);
  }

  // 4. Alumni login
  let alumniToken = "";
  let alumniUid = "";
  {
    const { json } = await req("POST", "/api/auth/login", {
      body: { email: "arjun.sharma@example.com", password: "Password123" },
      expectStatus: 200,
    });
    const user = json.user as { name: string; role: string; uid: string };
    if (!json.token || user?.role !== "alumni") fail("alumni login", JSON.stringify(json));
    alumniToken = json.token as string;
    alumniUid = user.uid;
    pass("POST /api/auth/login (alumni)", `${user.name} / ${user.role}`);
  }

  // 5. Register new user
  const unique = Date.now();
  let newToken = "";
  let newUid = "";
  {
    const { json } = await req("POST", "/api/auth/register", {
      body: {
        name: `GateA Tester ${unique}`,
        email: `gatea.${unique}@example.com`,
        password: "Password123",
        batch: "2024",
        branch: "CSE",
        college: "Punjab Engineering College, Chandigarh",
        company: "Test Co",
        location: "Chandigarh, Punjab",
      },
      expectStatus: 201,
    });
    const user = json.user as { uid: string; email: string };
    if (!json.token || !user?.uid) fail("register", JSON.stringify(json));
    newToken = json.token as string;
    newUid = user.uid;
    pass("POST /api/auth/register", user.email);
  }

  // 6. /me
  {
    const { json } = await req("GET", "/api/auth/me", {
      token: newToken,
      expectStatus: 200,
    });
    const user = json.user as { uid: string };
    if (user?.uid !== newUid) fail("/me", "uid mismatch");
    pass("GET /api/auth/me", newUid.slice(0, 8) + "…");
  }

  // 7. Alumni list unauthorized
  {
    await req("GET", "/api/alumni", { expectStatus: 401 });
    pass("GET /api/alumni (no token → 401)");
  }

  // 8. Alumni list + filters
  {
    const { json } = await req("GET", "/api/alumni", {
      token: alumniToken,
      expectStatus: 200,
    });
    const list = json.alumni as unknown[];
    if (!list || list.length < 20) fail("alumni list", `got ${list?.length}`);
    pass("GET /api/alumni", `${list.length} profiles`);

    const filtered = await req("GET", "/api/alumni?branch=CSE&search=Arjun", {
      token: alumniToken,
      expectStatus: 200,
    });
    const fl = filtered.json.alumni as { name: string }[];
    if (!fl.some((a) => a.name.includes("Arjun"))) fail("alumni filter", JSON.stringify(fl));
    pass("GET /api/alumni?branch=CSE&search=Arjun", `${fl.length} match(es)`);
  }

  // 9. Alumni by id
  {
    const { json } = await req("GET", `/api/alumni/${alumniUid}`, {
      token: alumniToken,
      expectStatus: 200,
    });
    const alumni = json.alumni as { uid: string; name: string };
    if (alumni?.uid !== alumniUid) fail("alumni by id", JSON.stringify(json));
    pass("GET /api/alumni/:id", alumni.name);
  }

  // 10. Patch own profile
  {
    const { json } = await req("PATCH", `/api/alumni/${alumniUid}`, {
      token: alumniToken,
      body: { company: "Infosys (GateA Updated)", location: "Bangalore, Karnataka" },
      expectStatus: 200,
    });
    const alumni = json.alumni as { company: string };
    if (!alumni.company.includes("GateA")) fail("patch own", alumni.company);
    pass("PATCH /api/alumni/:id (owner)", alumni.company);
  }

  // 11. Patch someone else as alumni → 403
  {
    await req("PATCH", `/api/alumni/${adminUid}`, {
      token: alumniToken,
      body: { company: "Hacked" },
      expectStatus: 403,
    });
    pass("PATCH /api/alumni/:id (non-owner → 403)");
  }

  // 12. Feed list
  {
    const { json } = await req("GET", "/api/feed", {
      token: alumniToken,
      expectStatus: 200,
    });
    const posts = json.posts as unknown[];
    if (!posts?.length) fail("feed list", "empty");
    pass("GET /api/feed", `${posts.length} posts`);
  }

  // 13. Alumni cannot create feed post
  {
    await req("POST", "/api/feed", {
      token: alumniToken,
      body: {
        type: "announcement",
        content: "This should be rejected because I am not an admin user.",
      },
      expectStatus: 403,
    });
    pass("POST /api/feed (alumni → 403)");
  }

  // 14. Admin creates feed post
  {
    const { json } = await req("POST", "/api/feed", {
      token: adminToken,
      body: {
        type: "announcement",
        content: "Gate A verification post — Express API is healthy and admin create works.",
        link: "https://example.com",
      },
      expectStatus: 201,
    });
    const post = json.post as { id: string; type: string };
    if (!post?.id) fail("admin feed create", JSON.stringify(json));
    pass("POST /api/feed (admin)", post.type);
  }

  // 15. College request (public/optional auth)
  let requestId = "";
  {
    const { json } = await req("POST", "/api/colleges/requests", {
      body: {
        collegeName: "Gate A Engineering College",
        affiliation: "IKGPTU",
        district: "Ludhiana",
        address: "Gate A Road",
        authorityName: "Dr. Gate A",
        authorityDesignation: "Principal",
        authorityEmail: `gatea.${Date.now()}@college.edu`,
        authorityPhone: "9800000000",
      },
      expectStatus: 201,
    });
    const request = json.request as { id: string; status: string };
    if (!request?.id || request.status !== "pending") fail("college create", JSON.stringify(json));
    requestId = request.id;
    pass("POST /api/colleges/requests", request.status);
  }

  // 16. Alumni cannot list college requests
  {
    await req("GET", "/api/colleges/requests", {
      token: alumniToken,
      expectStatus: 403,
    });
    pass("GET /api/colleges/requests (alumni → 403)");
  }

  // 17. Admin lists + updates status
  {
    const { json } = await req("GET", "/api/colleges/requests", {
      token: adminToken,
      expectStatus: 200,
    });
    const requests = json.requests as unknown[];
    if (!requests?.length) fail("college list", "empty");
    pass("GET /api/colleges/requests (admin)", `${requests.length} request(s)`);

    const updated = await req("PATCH", `/api/colleges/requests/${requestId}`, {
      token: adminToken,
      body: { status: "approved" },
      expectStatus: 200,
    });
    const request = updated.json.request as { status: string };
    if (request?.status !== "approved") fail("college approve", JSON.stringify(updated.json));
    pass("PATCH /api/colleges/requests/:id", request.status);
  }

  // Summary
  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== Gate A summary: ${results.length - failed.length}/${results.length} passed ===\n`);

  if (failed.length) {
    process.exit(1);
  }

  console.log("GATE A PASSED — Express API is verified locally.");
  console.log("GitHub Next.js app was NOT modified.");
  console.log("Ready for Phase 3 (integrate into Sankalp75/alumini) when you say so.\n");
}

main().catch((err) => {
  console.error("\nGATE A FAILED:", err instanceof Error ? err.message : err);
  process.exit(1);
});
