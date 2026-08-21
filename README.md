# Alumni Connect

> **Centralized Alumni Data Management & Engagement Platform**
> Built for **Smart India Hackathon 2026 — Practice Round** · PS ID: **SIH25019** · Government of Punjab · Theme: Smart Education

Alumni Connect replaces scattered institutional spreadsheets with a live, searchable alumni directory and engagement feed — owned by the institution, kept current by alumni themselves.

---

## ✨ Features

- 🔐 **Authentication** — secure email/password sign-up and sign-in with role-based routing (alumni → directory, admin → dashboard)
- 👤 **Profile Management** — alumni create and update their details: batch, branch, company, location, contact, LinkedIn
- 🔍 **Searchable Directory** — instant search plus batch and branch filters across the alumni card grid
- 📢 **Engagement Feed** — announcements, job postings, and events posted by admins, newest first
- 🛠️ **Admin Dashboard** — full alumni table with search, sorting, pagination, role badges, and CSV export
- 🏛️ **College Pages** — institutional overview and college registration requests

### Roadmap

- 🤝 Mentorship matching between alumni and students
- 💼 Job board with application tracking
- 📅 Event RSVPs and reunion management
- 📊 Institution analytics (batch-wise placement stats, engagement metrics)

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS v3 + [shadcn/ui](https://ui.shadcn.com/) |
| Backend | Firebase — Authentication (Email/Password) + Firestore |
| Forms | React Hook Form + Zod validation |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Firebase](https://firebase.google.com/) project

### Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/<your-username>/alumni-connect.git
   cd alumni-connect
   npm install
   ```

2. **Configure Firebase**

   - Create a project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication → Email/Password**
   - Enable **Firestore Database** and deploy the rules from [`firestore.rules`](./firestore.rules)

3. **Add environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Firebase web app config:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

4. **Seed demo data** (20 dummy alumni records for demos/testing)

   ```bash
   npm run seed
   ```

5. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

> **Making an admin:** register normally, then set `role: "admin"` on that user's document in `alumni_profiles/{uid}` via the Firestore console. The feed composer and `/admin` route unlock for that account.

---

## 📂 Project Structure

```
alumni-connect/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page (/)
│   ├── (auth)/             # /login, /register
│   ├── directory/          # Searchable alumni directory
│   ├── profile/[id]/       # Profile view/edit
│   ├── feed/               # Engagement feed (+ admin composer)
│   ├── admin/              # Admin dashboard (admin-only)
│   └── colleges/           # College pages + registration request
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Navbar, footer, auth provider
│   ├── alumni/             # Cards, grid, filters, forms
│   ├── feed/               # Post cards, composer, list
│   └── admin/              # Table, CSV export
├── lib/                    # Firebase init, Firestore helpers, validators, seed
├── hooks/                  # Auth hooks, debounce
├── types/                  # Shared TypeScript types
└── firestore.rules         # Security rules
```

---

## 🔒 Data Model & Security

Two Firestore collections:

| Collection | Doc ID | Access |
|---|---|---|
| `alumni_profiles` | Auth UID (one-to-one) | Signed-in read; owner writes own doc (role immutable); admin writes any |
| `feed_posts` | Auto-ID | Signed-in read; **admin-only create** |

Rules enforce all of this server-side — see [`firestore.rules`](./firestore.rules). Users cannot self-elevate to admin; the role is set manually per institution.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint check |
| `npm run seed` | Seed 20 demo alumni records into Firestore |

---

## 🖼️ Screenshots

_Add screenshots of the working prototype here before submission._

---

## 👥 Team

| Name | Role |
|---|---|
| _Add name_ | Team Lead |
| _Add name_ | Frontend |
| _Add name_ | Backend / Firebase |
| _Add name_ | UI/UX Design |
| _Add name_ | Testing & Presentation |

---

## 📄 License

Built for educational/hackathon purposes as part of Smart India Hackathon 2026.
