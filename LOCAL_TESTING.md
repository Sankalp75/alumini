# Local testing (Phase 3 partial — no push yet)

## Running now

| Service | URL |
|---|---|
| **Website (Next.js)** | http://localhost:3000 |
| **API (Express)** | http://localhost:4000 |
| API health | http://localhost:4000/api/health |
| API demo | http://localhost:4000/demo |

## Demo accounts

Password for all seeded users: `Password123`

| Role | Email | Where to go after login |
|---|---|---|
| **Admin** | `manpreet.singh@example.com` | `/admin` — approve college requests, export CSV, post to feed |
| **Alumni** | `arjun.sharma@example.com` | `/directory` — browse alumni |

## What you should click-test

1. **Home** — http://localhost:3000  
2. **Colleges** — http://localhost:3000/colleges  
3. **Register a college** — http://localhost:3000/colleges/request  
   - Fill the form (college name, affiliation, district, address, authority details)  
   - Submit → should show “Request received”  
4. **Login as admin** — approve that request on http://localhost:3000/admin  
5. **Directory** — search/filter alumni (needs login)  
6. **Feed** — read posts; as admin, compose a new post  
7. **Register** — create a new alumni account and confirm it appears in directory  
8. **Profile** — view/edit your profile  

## Not pushed yet

This is a **local clone** at `C:\Users\eshat\Downloads\alumini-sih`.  
Firebase was removed locally and replaced with Express + SQLite.  
**Do not push** until you finish testing and explicitly ask to integrate/push.
