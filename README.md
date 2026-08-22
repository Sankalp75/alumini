# Alumni Connect

> **Centralized Alumni Data Management & Engagement Platform**  
> Built for **Smart India Hackathon 2026 — Practice Round** · PS ID: **SIH25019** · Government of Punjab · Theme: Smart Education

Alumni Connect replaces scattered institutional spreadsheets with a live, searchable alumni directory and engagement feed — owned by the institution, kept current by alumni themselves.

---

## Features

- **Authentication** — email/password sign-up and sign-in with JWT (alumni → directory, admin → dashboard)
- **Profile Management** — batch, branch, college, company, location, contact, LinkedIn
- **Searchable Directory** — search plus batch and branch filters
- **Engagement Feed** — announcements, jobs, and events posted by admins
- **Admin Dashboard** — alumni table, CSV export, college registration approve/reject
- **College Pages** — institutional overview and college registration requests

### Roadmap

- Alumni verification queue (pending → admin approve)
- Public/open college datasets for richer institution lists
- Mentorship, job applications, event RSVPs, deeper analytics

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui |
| **Backend (only)** | **Node.js + Express** |
| Database | SQLite via Node built-in `node:sqlite` |
| Auth | JWT + bcrypt |
| Forms | React Hook Form + Zod |

Firebase has been removed. Express is the sole backend.

---

## Getting Started

### Prerequisites

- Node.js 20+

### Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/Sankalp75/alumini.git
   cd alumini
   npm install
   ```

2. **Environment**

   ```bash
   cp .env.example .env
   cp .env.local.example .env.local
   ```

   Edit secrets if needed (`JWT_SECRET`). Defaults work for local demo.

3. **Start API + frontend** (two terminals)

   ```bash
   npm run server    # Express → http://localhost:4000
   npm run dev       # Next.js → http://localhost:3000
   ```

4. **Seed** (auto-runs on first API start if DB empty; or force)

   ```bash
   npm run seed -- --force
   ```

5. **API smoke test** (API must be running)

   ```bash
   npm run test:api
   ```

   Live test UI: http://localhost:4000/demo

### Demo accounts

Password for all seeded users: `Password123`

| Role | Email |
|---|---|
| Admin | `manpreet.singh@example.com` |
| Alumni | `arjun.sharma@example.com` |

Admin unlocks `/admin`, feed composer, and college request approval.

---

## Project Structure

```
alumni-connect/
├── app/                 # Next.js pages (login, directory, feed, admin, colleges)
├── components/          # UI
├── hooks/
├── lib/                 # api.ts, auth.ts, firestore.ts (Express client helpers), validators
├── server/              # Express API + SQLite schema + seed
│   ├── index.ts
│   ├── routes/
│   ├── middleware/
│   └── data/            # alumniconnect.db (gitignored)
├── types/
└── LOCAL_TESTING.md
```

---

## API (Express)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | Liveness |
| POST | `/api/auth/register` | Create user + profile |
| POST | `/api/auth/login` | JWT |
| GET | `/api/auth/me` | Current profile |
| GET/PATCH | `/api/alumni`, `/api/alumni/:id` | Directory / profile |
| GET/POST | `/api/feed` | List / admin create |
| POST/GET/PATCH | `/api/colleges/requests` | Public create; admin list/update |

---

## Data model

- **Alumni & feed posts** — stored in your Express SQLite DB (user-generated / seeded). Not from public personal-data APIs.
- **College list** — curated Punjab list in `lib/colleges.ts` + authority registration requests verified by admins.
- Future: enrich colleges from open government / AICTE-style open datasets.

---

## Deploy notes

- Frontend and API are separate processes. Set `NEXT_PUBLIC_API_URL` to your public API URL.
- Prefer Postgres for multi-instance production; SQLite is fine for SIH local/demo on one server.
- This does **not** update https://alumniconnect-1.ai.studio/ (separate AI Studio mockup).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Next.js on :3000 |
| `npm run server` | Express on :4000 |
| `npm run seed` | Seed SQLite |
| `npm run test:api` | Gate A API checks |
| `npm run build` | Production Next build |
| `npm run lint` | ESLint |

---

## Team

| Name | Role |
|---|---|
| _Add name_ | Team Lead |
| _Add name_ | Frontend |
| _Add name_ | Backend / Express |
| _Add name_ | UI/UX Design |
| _Add name_ | Testing & Presentation |

---

## License

Built for educational/hackathon purposes as part of Smart India Hackathon 2026.
