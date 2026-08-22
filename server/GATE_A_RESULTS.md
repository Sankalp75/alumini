# Phase 2 — Gate A results

**Date:** 2026-08-22  
**Target:** `http://localhost:4000` (local Express only)  
**GitHub app:** not modified  

## How to re-run

```bash
npm run server      # terminal 1
npm run test:api    # terminal 2
```

## Result: **19/19 PASSED**

| # | Check | Result |
|---|---|---|
| 1 | `GET /api/health` | PASS |
| 2 | Login with bad password → 401 | PASS |
| 3 | Admin login (`manpreet.singh@example.com`) | PASS |
| 4 | Alumni login (`arjun.sharma@example.com`) | PASS |
| 5 | Register new user | PASS |
| 6 | `GET /api/auth/me` | PASS |
| 7 | Alumni list without token → 401 | PASS |
| 8 | Alumni list (20+ profiles) | PASS |
| 9 | Alumni filter `branch=CSE&search=Arjun` | PASS |
| 10 | Get alumni by id | PASS |
| 11 | Owner can patch own profile | PASS |
| 12 | Non-owner patch → 403 | PASS |
| 13 | Feed list | PASS |
| 14 | Alumni cannot create feed → 403 | PASS |
| 15 | Admin can create feed | PASS |
| 16 | Create college request | PASS |
| 17 | Alumni cannot list college requests → 403 | PASS |
| 18 | Admin lists college requests | PASS |
| 19 | Admin approves college request | PASS |

## Gate B (optional)

Skipped for now. Vite mockup dry-run is optional and not required to proceed to Phase 3.

## Meaning

The Express + SQLite backend that replaces Firebase Auth/Firestore behavior is **proven working on this machine**. Safe to proceed to Phase 3: clone/wire [Sankalp75/alumini](https://github.com/Sankalp75/alumini), remove Firebase, point Next.js at this API — still local until you ask to push.
