# AGENTS.md — Alumni Connect

> **For:** Muse Spark 1.2 on OpenCode | **Project:** Alumni Connect (SIH25019, Govt. of Punjab)
> **Stack:** Next.js 14 App Router + TypeScript + Tailwind v3 + shadcn/ui + Firebase v10 + Lucide
> **Tone:** Credible, Warm, Modern — Gov.uk authority meets LinkedIn institutional warmth
> **Rule:** No aesthetic or architectural decisions left to the model. Every value below is law. If a choice is not specified, you are blocked — do not invent.

---

## 1 — PROJECT OVERVIEW

### Product in One Sentence
Alumni Connect is a centralized, self-service alumni database and engagement platform that replaces scattered institutional spreadsheets with a live, searchable directory and announcement feed — owned by the institution, kept current by alumni themselves.

### Users

| User Type | Who They Are | What They Need | Success Looks Like |
|---|---|---|---|
| **Alumni** | Graduates of any batch/branch; age 21–60; varying digital literacy; accessing from phone or desktop | Register in <90s, keep profile current without contacting admin, find batchmates by name/batch/branch, see relevant announcements/jobs | Profile created and discoverable in directory; successfully finds a peer via search; reads a feed post |
| **Institution Admin** | Registrar / alumni-cell staff designated by the institution; one or two accounts per institution; desktop-primary | See every alumni record in one table, search/sort/filter instantly, post announcements/jobs that all alumni see, trust the data is validated and centralized | Logs in and sees full alumni table seeded with 20+ records; creates a feed post visible to alumni in <30s |
| **Visitor / Prospective Alumni** | Unauthenticated public — prospective students, parents, guests, judges | Understand what the platform is and why it matters in <10 seconds; see credible institutional authority; find a clear CTA | Scrolls landing hero and understands the value prop without scrolling past the fold; clicks Register or Directory |

### The Single Emotion the Landing Page Must Create
**Trust + Belonging:** "My institution still values me, and this is a professional, permanent home for our network — not a temporary student project." Every visual decision must reinforce permanence, care, and institutional credibility. Warmth prevents it from feeling bureaucratic.

### Success Metric Per Page

| Page | Route | Success Metric (user does this) |
|---|---|---|
| Landing | `/` | Visitor understands the problem + clicks `Join the Network` or `Explore Directory` within 10s |
| Register | `/register` | Alumni completes form and sees "Profile created" with redirect to directory in <90s |
| Login | `/login` | Returning alumni/admin logs in and lands on correct destination (alumni → directory, admin → /admin) in <15s |
| Directory | `/directory` | Alumni types in search and sees filtered card grid update on first keystroke; applies batch+branch filters |
| Profile | `/profile/[id]` | Alumni views own profile, toggles Edit, saves and sees persisted change reflected in Firestore + directory |
| Feed | `/feed` | Alumni reads posts newest-first; admin creates a post that appears at top without refresh for self |
| Admin | `/admin` | Admin searches/sorts the alumni table and identifies a record in <5s; sees role badges correctly |

### Tone — Expanded into Design Principles

| Word | Principle | In Practice |
|---|---|---|
| **Credible** | *Institutional authority over cleverness.* Every element signals that a government institution stands behind this data. | Use restrained palette (navy + stone), generous whitespace, consistent alignment, real copy never lorem ipsum, visible data validation, no playful gradients or neon accents. Tables look like official records, not dashboards. |
| **Warm** | *Belonging over bureaucracy.* Cold authority alienates alumni; warmth signals "you are still part of us." | Warm off-white page background, brass accent for highlights, rounded corners (8–16px), human photography not illustrations, microcopy in second person ("Welcome back," "Keep your profile current"), soft shadows not hard borders. |
| **Modern** | *Current without chasing trends.* No glassmorphism, no brutalism, no over-animation — just clean, contemporary SaaS craft that judges recognize as professional. | Tight type scale with Fraunces + Inter, subtle motion (150–250ms), card-based layouts, Lucide icons with 1.75px stroke, mobile-first responsiveness, shadcn/ui primitives composed cleanly. |

---

## 2 — TECH STACK (Complete, No Gaps)

### Framework + Router + TypeScript Config

```ts
// Chosen because: Next.js 14 App Router is locked in brief; this config enforces credibility via strictness
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ hostname: "lh3.googleusercontent.com" }, { hostname: "firebasestorage.googleapis.com" }] },
};
module.exports = nextConfig;

// tsconfig.json — strict, no any
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] },
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- Framework: `next@14.2.5` with App Router (folder-based routing, `app/` directory, server + client components)
- React: `react@18.3.1` + `react-dom@18.3.1`
- TypeScript: `typescript@5.5`

### Tailwind Config — Custom Theme Extension Keys

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // Brand aliases — use these in code
        brand: { DEFAULT: "#1B3A5C", hover: "#14304E", muted: "#E8EDF3" },
        brass: { DEFAULT: "#C9A86A", hover: "#B8975A", muted: "#FDF6E3" },
        teal: { DEFAULT: "#2E7D6F", hover: "#256A5E", muted: "#E6F2EF" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: { heading: ["var(--font-fraunces)", "serif"], body: ["var(--font-inter)", "sans-serif"] },
      boxShadow: { /* see Section 3 shadows */ },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "shake": { "0%,100%": { transform: "translateX(0)" }, "20%,60%": { transform: "translateX(-4px)" }, "40%,80%": { transform: "translateX(4px)" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.45s cubic-bezier(0.16,1,0.3,1)",
        "shake": "shake 0.4s ease-in-out",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

```css
/* app/globals.css — tokens as CSS variables (see Section 3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  :root {
    --background: 36 33% 97%; /* #F8F7F5 */
    --foreground: 218 32% 15%; /* #1A2332 */
    --card: 0 0% 100%; /* #FFFFFF */
    --card-foreground: 218 32% 15%;
    --primary: 212 54% 23%; /* #1B3A5C */
    --primary-foreground: 0 0% 100%;
    --secondary: 36 33% 94%; /* #F1EFEA */
    --secondary-foreground: 218 32% 15%;
    --muted: 35 18% 92%; /* #EDE9E3 */
    --muted-foreground: 218 12% 48%; /* #6B7280-ish muted */
    --accent: 168 46% 34%; /* #2E7D6F */
    --accent-foreground: 0 0% 100%;
    --border: 34 14% 87%; /* #E2DDD6 */
    --input: 34 14% 87%;
    --ring: 168 46% 34%; /* #2E7D6F */
    --radius: 0.75rem; /* 12px */
  }
}
@layer base { * { @apply border-border; } body { @apply bg-background text-foreground font-body antialiased; } h1,h2,h3,h4 { @apply font-heading; } }
```

### shadcn/ui — Components to Install

Install exactly these (no extra without justification):

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea label card badge avatar table dialog dropdown-menu select tabs separator skeleton toast toaster alert form scroll-area
```

| Component | Usage |
|---|---|
| `button` | All CTAs, form submits, table actions |
| `input` + `textarea` + `label` | Register, login, profile edit, feed post, directory search |
| `card` | Alumni profile cards, feed post cards, stat cards, form wrappers |
| `badge` | Batch year, branch, role (Alumni/Admin) |
| `avatar` | Directory cards, profile header, feed post author, nav user menu |
| `table` | Admin dashboard alumni table |
| `dialog` | Edit profile modal (mobile), confirm dialogs |
| `dropdown-menu` | Nav user menu, mobile nav, table row actions |
| `select` | Batch, branch filters and form selects |
| `tabs` | Profile view/edit toggle, admin sub-views if needed |
| `separator` | Section dividers |
| `skeleton` | Loading states for directory, feed, admin, profile |
| `toast` + `toaster` | Success/error feedback for all mutations |
| `alert` | Inline form errors, empty states |
| `form` | React Hook Form wrapper (with zodResolver) |
| `scroll-area` | Feed list, table overflow |

### Firebase — Features + SDK Methods

| Feature | SDK | Methods Used |
|---|---|---|
| Auth (Email/Password) | `firebase/auth` | `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`, `sendPasswordResetEmail` (optional) |
| Firestore | `firebase/firestore` | `collection`, `doc`, `getDoc`, `getDocs`, `setDoc`, `updateDoc`, `addDoc`, `query`, `where`, `orderBy`, `limit`, `serverTimestamp`, `Timestamp` |
| Hosting (deploy only) | Firebase CLI | `firebase deploy` — not in app code |

Do NOT use Firebase Storage, Analytics, or Cloud Functions in MVP.

### All npm Packages (Exact Names)

```json
{
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "firebase": "10.13.0",
    "react-hook-form": "7.52.1",
    "zod": "3.23.8",
    "@hookform/resolvers": "3.6.0",
    "lucide-react": "0.408.0",
    "clsx": "2.1.1",
    "tailwind-merge": "2.4.0",
    "class-variance-authority": "0.7.0",
    "tailwindcss-animate": "1.0.7"
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "@types/node": "20.14.10",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "tailwindcss": "3.4.7",
    "postcss": "8.4.39",
    "autoprefixer": "10.4.19",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5"
  }
}
```

No other dependencies. No date-fns, no framer-motion, no extra UI libs — Tailwind + CSS handles motion.

### Font Import URLs (Google Fonts)

```ts
// app/layout.tsx — use next/font/google (preferred, no external URL needed)
// Chosen because: Fraunces = authoritative serif with warmth (Gov.uk institutional meets editorial); Inter = highest legibility at 14–16px, proven in government SaaS
import { Fraunces, Inter } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

// Alternative direct URL (if not using next/font):
// https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap
```

### Environment Variables (Names Only)

```bash
# .env.local — never commit values
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
# Optional
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

All Firebase values are `NEXT_PUBLIC_` because Auth/Firestore run client-side. No server secrets in MVP.

---

## 3 — DESIGN TOKENS

### Colors — The Law

| Token | Hex | Usage |
|---|---|---|
| **Background** | | |
| `bg-page` | `#F8F7F5` | Page background — warm off-white paper, not stark #fff |
| `bg-card` | `#FFFFFF` | Card / surface / form panel |
| `bg-muted` | `#F1EFEA` | Subtle section background (alternate sections, filter panel) |
| `bg-subtle` | `#EDE9E3` | Hover for muted, skeleton base |
| **Text** | | |
| `text-primary` | `#1A2332` | Headings, primary body — deep navy-charcoal |
| `text-secondary` | `#4B5563` | Secondary body, descriptions |
| `text-muted` | `#8B95A5` | Caption, placeholder, helper text |
| `text-inverse` | `#FFFFFF` | Text on brand / dark backgrounds |
| **Brand** | | |
| `brand-primary` | `#1B3A5C` | Primary CTA, nav, active states — institutional navy |
| `brand-primary-hover` | `#14304E` | Hover for primary |
| `brand-primary-pressed` | `#0F243C` | Active/pressed |
| `brand-secondary` | `#C9A86A` | Accent highlights, gold divider, selected filter chip — warm brass |
| `brand-accent` | `#2E7D6F` | Links, focus rings, success-adjacent actions — institutional teal |
| `brand-accent-hover` | `#256A5E` | |
| **State** | | |
| `state-success` | `#1F7A4A` | Success toast, verified badge |
| `state-success-bg` | `#E6F4EA` | |
| `state-warning` | `#B7791F` | Warning alert |
| `state-warning-bg` | `#FEF3C7` | |
| `state-error` | `#C0392B` | Error text, destructive button, validation |
| `state-error-bg` | `#FDECEA` | |
| `state-info` | `#2B6CB0` | Info alert |
| `state-info-bg` | `#EBF4FF` | |
| **Border** | | |
| `border-default` | `#E2DDD6` | Card border, input border, table border |
| `border-strong` | `#C9C4BC` | Strong divider, table header border |
| `border-focus` | `#2E7D6F` | Focus ring (2px) |
| **Government Accent** | `#1B3A5C` | **Why this color:** Deep institutional navy — the same hue family as Gov.uk (#0B0C0C) and Punjab Government crest. Navy signals permanence, trust, and state authority without political connotation (avoids saffron/green partisan reading). Paired with warm brass (#C9A86A) to prevent coldness — navy holds authority, brass adds human warmth. Never use bright blue (#3B82F6) — it reads as generic Tailwind. |

**CSS Variables (for Tailwind):**
```css
:root {
  --page: #F8F7F5;
  --card: #FFFFFF;
  --muted: #F1EFEA;
  --subtle: #EDE9E3;
  --text-primary: #1A2332;
  --text-secondary: #4B5563;
  --text-muted: #8B95A5;
  --brand: #1B3A5C;
  --brand-hover: #14304E;
  --brass: #C9A86A;
  --teal: #2E7D6F;
  --border: #E2DDD6;
  --success: #1F7A4A;
  --error: #C0392B;
}
```

### Gradients — Complete CSS Strings

```css
/* Hero background — subtle, institutional. Never vibrant. Use at 100% width hero only. */
--gradient-hero: linear-gradient(168deg, #1B3A5C 0%, #234368 45%, #2E5A52 100%);
/* Alternate hero overlay (if image behind) */
--gradient-hero-overlay: linear-gradient(180deg, rgba(27,58,92,0.92) 0%, rgba(27,58,92,0.78) 50%, rgba(27,58,92,0.92) 100%);
/* Card subtle lift — used as 1px top border highlight on cards */
--gradient-card-top: linear-gradient(90deg, #C9A86A 0%, #E8D5B5 50%, transparent 100%);
/* CTA glow — soft shadow, not visible gradient shape */
--gradient-cta-shine: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%);
/* Section divider — 1px line between alternate bg sections */
--gradient-divider: linear-gradient(90deg, transparent 0%, #E2DDD6 50%, transparent 100%);
```

Rule: No rainbow, no purple, no pink gradients anywhere. Only navy→teal or brass→transparent.

### Typography

**Heading Font:** `Fraunces` — // Chosen because: Warm, authoritative serif with distinctive character; reads as editorial/institutional (Gov.uk serif heritage) but modern. High contrast at large sizes creates immediate credibility. Not geometric sanss which would feel corporate-cold.
**Body Font:** `Inter` — // Chosen because: Highest legibility at 14–16px on screens; neutral, warm, proven in government SaaS; excellent tabular numbers for admin table.

| Name | Size | Line-Height | Letter-Spacing | Weight | Usage |
|---|---|---|---|---|---|
| `display` | 56px / 3.5rem | 1.05 (58.8px) | -0.03em | 800 (Fraunces) | Hero headline only (landing) |
| `h1` | 40px / 2.5rem | 1.1 (44px) | -0.025em | 700 (Fraunces) | Page titles |
| `h2` | 30px / 1.875rem | 1.2 (36px) | -0.02em | 700 (Fraunces) | Section headings |
| `h3` | 22px / 1.375rem | 1.3 (28.6px) | -0.015em | 600 (Fraunces 600 or Inter 600) | Card titles, feed post titles |
| `h4` | 18px / 1.125rem | 1.4 (25.2px) | -0.01em | 600 (Inter) | Subsection, table title |
| `body-lg` | 18px / 1.125rem | 1.6 (28.8px) | -0.01em | 400 (Inter) | Hero subhead, lead paragraph |
| `body` | 16px / 1rem | 1.6 (25.6px) | -0.011em | 400 (Inter) | Default body |
| `body-sm` | 14px / 0.875rem | 1.55 (21.7px) | -0.006em | 400 (Inter) | Secondary text, card descriptions, table cells |
| `caption` | 13px / 0.8125rem | 1.5 (19.5px) | 0.01em | 400 (Inter) | Captions, timestamps, helper text |
| `label` | 13px / 0.8125rem | 1.4 (18.2px) | 0.04em | 600 (Inter) UPPERCASE | Form labels, overlines, badge text (letter-spacing 0.04em, uppercase) |
| `small` | 12px / 0.75rem | 1.4 (16.8px) | 0.02em | 500 (Inter) | Fine print, footer |

Responsive: `display` scales to 40px at <768px, 32px at <640px. `h1` scales to 32px at <768px. `body-lg` scales to 16px at <640px.

### Spacing — Full Scale (px)

| Token | px | rem | Usage |
|---|---|---|---|
| `0` | 0 | 0 | |
| `1` | 4 | 0.25 | Tight inline (icon gap) |
| `2` | 8 | 0.5 | XS |
| `3` | 12 | 0.75 | SM |
| `4` | 16 | 1 | MD — base unit |
| `5` | 20 | 1.25 | |
| `6` | 24 | 1.5 | LG |
| `8` | 32 | 2 | XL |
| `10` | 40 | 2.5 | 2XL |
| `12` | 48 | 3 | 3XL |
| `16` | 64 | 4 | 4XL — section gap |
| `20` | 80 | 5 | |
| `24` | 96 | 6 | Section vertical on desktop |
| `32` | 128 | 8 | Hero vertical, large section |

Base unit: 4px. Never use 1px/2px/6px arbitrary values.

### Container

| Breakpoint | max-width | Horizontal Padding |
|---|---|---|
| <640 (base) | 100% | 16px |
| sm 640 | 640 | 24px |
| md 768 | 768 | 24px |
| lg 1024 | 1024 | 32px |
| xl 1280 | 1280 | 32px |
| 2xl 1536 | 1280 (capped) | 32px |

Content max-width is capped at 1280px (`max-w-7xl` effectively). Text-heavy sections (hero copy) capped at 672px (`max-w-2xl`).

### Section Padding

| Breakpoint | Vertical (py) | Horizontal (px) — via container |
|---|---|---|
| Base (<640) | 48px (py-12) | 16px |
| sm (640) | 64px (py-16) | 24px |
| lg (1024) | 96px (py-24) | 32px |

Hero vertical: 96px mobile, 128px desktop (pt-24 pb-20 lg:py-32).

### Borders & Radius

| Element | Radius | Border Width | Border Color |
|---|---|---|---|
| Page cards (form panels, feed cards) | 16px (`rounded-2xl`) | 1px | `#E2DDD6` |
| Profile / alumni cards | 16px (`rounded-2xl`) | 1px | `#E2DDD6` |
| Buttons | 10px (`rounded-[10px]`) | 1px where needed | per variant |
| Inputs / textarea / select | 10px (`rounded-[10px]`) | 1px | `#E2DDD6` |
| Modals / dialogs | 16px (`rounded-2xl`) | 1px | `#E2DDD6` |
| Badges | 9999px (`rounded-full`) | 1px or 0 | per variant |
| Avatars | 9999px (`rounded-full`) | 2px (white ring) + 1px subtle | `#FFFFFF` outer, `#E2DDD6` fallback |
| Images inside cards | 12px (`rounded-xl`) | 0 | — |
| Table wrapper | 12px (`rounded-xl`) | 1px | `#E2DDD6` |

Never use radius below 6px anywhere (hard constraint). Inputs at 10px feel modern-civic.

### Shadows — Exact CSS

```css
--shadow-sm:  0 1px 2px rgba(26,35,50,0.05);
--shadow:     0 1px 3px rgba(26,35,50,0.07), 0 1px 2px rgba(26,35,50,0.06);
--shadow-md:  0 4px 6px rgba(26,35,50,0.07), 0 2px 4px rgba(26,35,50,0.06);
--shadow-lg:  0 10px 15px rgba(26,35,50,0.08), 0 4px 6px rgba(26,35,50,0.06);
--shadow-xl:  0 20px 25px rgba(26,35,50,0.10), 0 10px 10px rgba(26,35,50,0.04);
--shadow-2xl: 0 25px 50px rgba(26,35,50,0.15);

/* Colored shadow for primary CTA (brand glow) — subtle, not neon */
--shadow-brand: 0 4px 14px rgba(27,58,92,0.32), 0 2px 6px rgba(27,58,92,0.20);
--shadow-brand-hover: 0 8px 20px rgba(27,58,92,0.38), 0 4px 10px rgba(27,58,92,0.24);
```

Usage: Cards default `shadow-sm`, profile cards hover `shadow-md`, modals `shadow-xl`, primary CTA `shadow-brand`.

---

## 4 — COMPONENT CONVENTIONS

### Button — All Variants (Exact Values)

Base: `font-family: Inter, sans-serif; font-weight: 600; border-radius: 10px; transition: all 150ms cubic-bezier(0.4,0,0.2,1); display: inline-flex; align-items:center; justify-content:center; gap: 8px;`

| Variant | bg | text | border | hover bg | active bg | disabled | focus-ring |
|---|---|---|---|---|---|---|---|
| **primary** | `#1B3A5C` | `#FFFFFF` | none | `#14304E` + `shadow-brand-hover` | `#0F243C` | bg `#E2DDD6` text `#8B95A5` cursor not-allowed opacity 100% | `0 0 0 2px #FFFFFF, 0 0 0 4px #2E7D6F` |
| **secondary** | `#FFFFFF` | `#1B3A5C` | `1px solid #E2DDD6` | `#F8F7F5` border `#C9C4BC` | `#F1EFEA` | bg `#FFFFFF` text `#8B95A5` border `#E2DDD6` | same |
| **ghost** | `transparent` | `#4B5563` | none | `#F1EFEA` text `#1A2332` | `#EDE9E3` | text `#8B95A5` | same |
| **destructive** | `#C0392B` | `#FFFFFF` | none | `#A93226` | `#922B21` | bg `#E2DDD6` text `#8B95A5` | `0 0 0 2px #FFFFFF, 0 0 0 4px #C0392B` |
| **link** | `transparent` | `#2E7D6F` | none (underline on hover) | underline, text `#256A5E` | text `#1F5D52` | text `#8B95A5` no-underline | `0 0 0 2px #E6F2EF` |

**Size Variants:**

| Size | Padding | Font Size | Height | Icon Size |
|---|---|---|---|---|
| `sm` | `8px 14px` (py-2 px-3.5) | 13px | 32px (h-8) | 14px |
| `md` (default) | `10px 20px` (py-2.5 px-5) | 14px | 40px (h-10) | 16px |
| `lg` | `14px 28px` (py-3.5 px-7) | 16px | 48px (h-12) | 18px |
| `icon` | `8px` (p-2) | — | 40px (h-10 w-10) | 18px |

Primary `lg` always has `shadow-brand`. Add `gap-2` between icon and label.

Transition: `150ms cubic-bezier(0.4,0,0.2,1)` for bg/border/shadow/transform. Active: `transform: scale(0.98)` for tactile feedback.

### Input / Textarea / Select

| State | Background | Border | Text | Placeholder | Radius | Padding | Font |
|---|---|---|---|---|---|---|---|
| **default** | `#FFFFFF` | `1px solid #E2DDD6` | `#1A2332` | `#8B95A5` | 10px | `10px 14px` (input: h-10, textarea: p-3 min-h-[96px]) | Inter 14px/400 |
| **focus** | `#FFFFFF` | `1px solid #2E7D6F` | `#1A2332` | — | 10px | same | same |
| **error** | `#FDECEA` | `1px solid #C0392B` | `#1A2332` | — | 10px | same | same |
| **disabled** | `#F1EFEA` | `1px solid #E2DDD6` | `#8B95A5` | `#8B95A5` | 10px | same | same |

Focus ring: `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #2E7D6F` (outer teal, inner white offset). Also `outline: none`. No ring on error — border color is the signal; ring on error would be `0 0 0 3px rgba(192,57,43,0.15)`.

Label: `Inter 13px 600 UPPERCASE letter-spacing 0.04em color #4B5563` placed **above** input with `margin-bottom: 6px`. Required indicator: `*` in `#C0392B`.

Helper text: `Inter 13px 400 color #8B95A5` below input `margin-top: 6px`.

Error message: `Inter 13px 500 color #C0392B` + Lucide `AlertCircle` 14px icon + flex gap 6px, `margin-top: 6px`.

Field spacing within forms: `gap: 20px` (space-y-5) between fields; group related fields (e.g., batch+branch) in `grid grid-cols-2 gap-4`.

### Card

| Type | Background | Border | Radius | Shadow | Padding | Hover |
|---|---|---|---|---|---|---|
| **standard** (form wrapper, stat card, feed card) | `#FFFFFF` | `1px solid #E2DDD6` | 16px | `shadow-sm` | 24px (p-6) — 32px (p-8) on desktop for form panels | none |
| **profile card** (directory grid) | `#FFFFFF` | `1px solid #E2DDD6` | 16px | `shadow-sm` | 20px (p-5) | `shadow-md` + `border-color: #C9C4BC` + `transform: translateY(-2px)` transition 200ms ease-out |
| **stat card** (landing stats, admin KPIs) | `#FFFFFF` | `1px solid #E2DDD6` | 16px | `shadow-sm` | 24px (p-6) | none; number in Fraunces 32px/700 color #1B3A5C |

Profile card inner: Avatar top, name `Inter 16px 600 #1A2332`, meta line `13px 400 #8B95A5` (Batch • Branch), company `14px 500 #4B5563`, location `13px 400 #8B95A5` with `MapPin` 12px icon, bottom row: LinkedIn icon link (teal) + `View Profile` link.

### Badge

| Semantic | bg | text | border | Usage |
|---|---|---|---|---|
| **batch year** | `#E8EDF3` | `#1B3A5C` | `1px solid #D1D9E6` | e.g., "2021" |
| **branch — CSE** | `#E6F2EF` | `#2E7D6F` | `1px solid #BFE0D8` | |
| **branch — ECE** | `#FDF6E3` | `#8A6D1B` | `1px solid #F5E6B8` | |
| **branch — ME/CE/EE** | `#F1EFEA` | `#4B5563` | `1px solid #E2DDD6` | fallback |
| **status — Alumni** | `#E6F4EA` | `#1F7A4A` | `1px solid #B7E0C5` | role badge |
| **status — Admin** | `#E8EDF3` | `#1B3A5C` | `1px solid #B9C9E0` | admin badge |
| **status — Verified** | `#E6F4EA` | `#1F7A4A` | none | optional check |

All badges: `padding: 4px 10px` (py-1 px-2.5), `radius: 9999px`, `font: Inter 12px 600 letter-spacing 0.02em`, `display: inline-flex align-items:center gap-4px`. Dot indicator (4px) optional for status.

### Avatar

| Size | Dimensions | Font (initials) | Border | Usage |
|---|---|---|---|---|
| `sm` | 32px (h-8 w-8) | Inter 12px 600 | 1px `#E2DDD6` + 2px white ring | Table rows, feed post author small, nav |
| `md` | 48px (h-12 w-12) | Inter 14px 600 | 2px `#FFFFFF` + 1px `#E2DDD6` + shadow-sm | Directory cards |
| `lg` | 80px (h-20 w-20) | Inter 20px 700 | 3px `#FFFFFF` + shadow-md | Profile header desktop |
| `xl` | 120px (h-30 w-30) | Inter 28px 700 | 4px `#FFFFFF` + shadow-lg | Profile header large (optional) |

Fallback: initials — take first letter of first name + first letter of last name, uppercase. If single word, first two letters. Background: deterministic from name hash — pick from `[#E8EDF3, #E6F2EF, #FDF6E3, #FDECEA, #EDE9E3, #E6F4EA]` (muted tints, never saturated). Text color matching: `[#1B3A5C, #2E7D6F, #8A6D1B, #922B21, #4B5563, #1F7A4A]`. Always `object-cover` for images, `rounded-full overflow-hidden`.

### Navigation (Desktop + Mobile)

**Desktop:**
- Height: 64px (h-16) — 72px on ≥lg if more breathing room
- Background: `rgba(248,247,245,0.8)` with `backdrop-blur(12px)` at top + transparent border; on scroll >16px → `#FFFFFF` solid + `border-b: 1px solid #E2DDD6` + `shadow-sm`
- Layout: `container` flex `justify-between items-center`. Left: logo (Fraunces 18px 700 #1B3A5C + brass dot) + nav links. Right: CTA or user menu.
- Link style: `Inter 14px 500 #4B5563` — hover `#1A2332` — active `#1B3A5C` with underline indicator: `2px solid #C9A86A` bottom border (or `h-0.5 w-full bg-brass absolute -bottom-1`). Active also font-weight 600.
- Link gap: 28px (gap-7)
- CTA placement: Right side. Logged OUT: `Login` (ghost sm) + `Join the Network` (primary sm). Logged IN: `Directory` `Feed` links + avatar dropdown + `Admin` link if admin.

**Mobile:**
- Breakpoint: `<1024px` (`lg`) shows hamburger; `≥1024px` shows desktop links. // Chosen because: Directory filters need lg width.
- Hamburger: 40×40 button, `Menu` / `X` Lucide 20px, `hover:bg-muted`
- Drawer: Right overlay — not push. Spec: `fixed inset-0 z-50 flex justify-end`
  - Backdrop: `bg-[#1A2332]/40 backdrop-blur-sm` — click to close
  - Panel: `w-[320px] max-w-[85vw] h-full bg-white shadow-xl` slide from right
  - Animation: `transform translateX(100%) → translateX(0)` duration 250ms `cubic-bezier(0.16,1,0.3,1)` (easeOutExpo), backdrop fade 200ms
  - Content: top: logo + close X; links `Inter 16px 500` py-3 border-b `#F1EFEA`; bottom: CTA full-width primary lg
  - Focus trap + Esc to close
- No drawer on desktop.

**Scroll Behavior:**
- Transparent → solid transition: `transition: background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease`
- Trigger: `window.scrollY > 16`
- At top (scrollY ≤16): `bg-transparent border-transparent` over hero (hero text must be white for contrast — hero bg is dark navy)
- Scrolled: `bg-white/95 backdrop-blur border-b shadow-sm`

**Auth State:**

| State | Nav Shows |
|---|---|
| Logged OUT | Logo + `Home` `Directory` (optional preview) `Feed` (optional) + `Login` ghost + `Join the Network` primary |
| Logged IN (Alumni) | Logo + `Directory` `Feed` `Profile` + avatar dropdown (name, email, View Profile, Sign out) |
| Logged IN (Admin) | Alumni links + `Admin` (with badge dot) in nav |

Auth state determined by `onAuthStateChanged` + Firestore profile `role` field. Nav renders skeleton (h-8 w-24) while auth resolves — never flash OUT state.

### Table (Admin Dashboard)

Wrap: `rounded-xl border border-[#E2DDD6] overflow-hidden bg-white shadow-sm` + `overflow-x-auto`.

| Part | Style |
|---|---|
| **Header** | bg `#F8F7F5`, text `Inter 12px 600 UPPERCASE tracking-widest 0.06em #4B5563`, border-b `1px solid #E2DDD6`, padding `12px 16px`, `text-left` |
| **Row — default** | bg `#FFFFFF`, border-b `1px solid #F1EFEA`, text `Inter 14px 400 #1A2332` (name 500), padding `14px 16px`, height 56px |
| **Row — hover** | bg `#F8F7F5` |
| **Row — selected** | bg `#E8EDF3` border-l `3px solid #1B3A5C` (if selectable) |
| **Cell — name** | flex gap-3 avatar sm + name 500 + email 13px #8B95A5 below |
| **Cell — badge** | badge component |
| **Cell — actions** | ghost icon buttons (MoreHorizontal) |

**Pagination:** Below table `flex justify-between items-center py-4 px-4 border-t`. Left: `Showing 1–10 of 42` (caption). Right: `Prev`/`Next` secondary sm buttons + page numbers (active: primary sm 32px square, inactive: ghost). Disabled opacity 50%.

**Sorting:** Header cells with `ArrowUpDown` 14px icon, click cycles asc/desc. Active header text `#1B3A5C`.

### Form Layout

- **Label:** Position: above input. Style: `Inter 13px 600 UPPERCASE tracking 0.04em #4B5563` + `mb-1.5`. Required star `* #C0392B ml-1`.
- **Helper text:** `Inter 13px 400 #8B95A5` + `mt-1.5`. Appears below input.
- **Error message:** `Inter 13px 500 #C0392B` + `AlertCircle 14px` icon + `flex gap-1.5 mt-1.5`. Input border already red. `animate-shake` on error appear.
- **Field spacing:** `space-y-5` (20px) vertically. Pair fields (e.g., Batch + Branch) in `grid grid-cols-1 sm:grid-cols-2 gap-4`.
- **Form wrapper:** `bg-white rounded-2xl border border-[#E2DDD6] shadow-sm p-6 sm:p-8`. Max width `max-w-lg` centered for auth forms.
- **Submit button:** Full-width on mobile (`w-full`), auto on desktop; `primary lg` with loading spinner (Lucide `Loader2` animate-spin) when `isSubmitting`.
- **Footer link:** Below form `text-sm text-center text-muted` with `link` variant for "Already have an account? Log in"

### Modal / Dialog

- **Backdrop:** `bg-[#1A2332]/50 backdrop-blur-[4px]` — `opacity 0 → 1` 200ms
- **Panel:** Width `max-w-lg` (512px) on desktop, `max-w-[92vw]` mobile, `bg-white rounded-2xl shadow-xl border border-[#E2DDD6]` padding `24px` (p-6) — header `pb-4 border-b mb-4`, content, footer `pt-4 border-t mt-6 flex justify-end gap-3`
- **Entry Animation:** Backdrop fade `opacity 0→1 200ms ease-out` + Panel `opacity 0→1 + translateY(8px)→0 + scale(0.98)→1` duration 250ms `cubic-bezier(0.16,1,0.3,1)` (spring-like). Exit reverse 150ms ease-in.
- **Close:** X top-right ghost icon button, click backdrop, Esc.

### Toast / Alert

**Toast:**
- Variants:

| Variant | bg | border | icon | icon bg |
|---|---|---|---|---|
| `success` | `#FFFFFF` | `1px solid #B7E0C5` + left `4px solid #1F7A4A` | `CheckCircle #1F7A4A` | `#E6F4EA` |
| `error` | `#FFFFFF` | `1px solid #F0B8B0` + left `4px solid #C0392B` | `AlertCircle #C0392B` | `#FDECEA` |
| `warning` | `#FFFFFF` | `1px solid #F5E6B8` + left `4px solid #B7791F` | `AlertTriangle #B7791F` | `#FEF3C7` |
| `info` | `#FFFFFF` | `1px solid #B9C9E0` + left `4px solid #2B6CB0` | `Info #2B6CB0` | `#EBF4FF` |

- Layout: `rounded-xl shadow-lg p-4 flex gap-3 items-start min-w-[320px] max-w-[420px] bg-white`
- Text: title `Inter 14px 600 #1A2332`, description `13px 400 #4B5563`
- Position: `fixed bottom-4 right-4` (desktop), `bottom-4 left-4 right-4` (mobile) — `z-50`
- Animation: enter `translateY(8px) opacity 0 → 0 1` 250ms `cubic-bezier(0.16,1,0.3,1)`, exit `opacity 1→0 + translateY(-4px)` 150ms
- Auto-dismiss: success/info 4000ms, warning 5000ms, error 6000ms (or sticky if form error). Pause on hover. Close X ghost button.

**Alert (inline):**
- Same color mapping, `rounded-xl p-4 flex gap-3` with icon + title + description, no dismiss unless needed.

---

## 5 — PAGE BREAKDOWN

### 5.1 Landing (/) — Public, No Auth Required

**Route:** `/` | **Auth:** Public | **Firebase Reads:** `getDocs(query(alumni_profiles, limit(6)))` for "featured alumni" (optional), `getDocs(query(feed_posts, orderBy(createdAt, desc), limit(3)))` for preview. Writes: none.

#### Section 1 — Navigation (global)
- Layout: sticky top-0 z-40, as per Nav spec. Over hero transparent then solid on scroll.
- Content: Logo "Alumni Connect" (Fraunces 700) + brass dot + nav links + CTA
- Mobile: hamburger drawer

#### Section 2 — Hero
- Layout: `relative overflow-hidden` full-width `bg-[#1B3A5C]` with `gradient-hero` + subtle grid pattern (`opacity 0.04` svg grid). Container `grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-32`. Left: copy. Right: visual (alumni card stack mockup OR institutional photo — use Unsplash campus image with `rounded-2xl shadow-2xl`).
- Content (real copy):
  - Overline: `label` style `text-[#C9A86A] tracking-widest` → "GOVERNMENT OF PUNJAB • SMART EDUCATION"
  - Headline (`display` 56px/40px mobile, text-white): "Your institution, <span style='color:#C9A86A'>still your home.</span>"
  - Subhead (`body-lg` text-white/80): "A permanent, trusted home for every graduate — find batchmates, stay current, and never lose touch with the place that shaped you."
  - CTAs: Primary lg `Join the Network →` (to /register) + Secondary (white ghost on dark) `Explore Directory` (to /directory). Gap 12px, stack on mobile.
  - Trust bar below CTAs: `caption text-white/60` → "Trusted by 2,000+ alumni • Secure • Self-service • Always current" with dot separators.
- Data: none — static.
- Mobile: Single col, headline 32px, CTAs full-width stacked, image below copy (order-2).

#### Section 3 — Value Props (3 columns)
- Layout: `bg-[#F8F7F5] py-16 lg:py-24`. Container heading centered, then `grid md:grid-cols-3 gap-6 lg:gap-8`.
- Content:
  - Section overline: `label centered text-brand` → "WHY ALUMNI CONNECT"
  - H2 centered: "From scattered sheets to living network"
  - Cards (3) — each `bg-white rounded-2xl p-6 border shadow-sm` with icon (48×48 rounded-xl bg-muted + Lucide icon 24px in #1B3A5C):
    1. Icon `Users` — Title `Stay Discoverable` — Body `Update your profile once and your institution always knows where you are — no emails lost, no records stale.`
    2. Icon `Search` — Title `Find Anyone, Instantly` — Body `Search by name, batch, or branch. Reconnect with a batchmate in seconds, not weeks.`
    3. Icon `Megaphone` — Title `Never Miss What Matters` — Body `Jobs, announcements, reunions — one feed, verified by your institution.`
- Mobile: single col stacked, heading left-aligned.

#### Section 4 — How It Works (3 steps)
- Layout: `bg-white py-16 lg:py-24` + top divider `gradient-divider`. Container `max-w-3xl mx-auto` centered heading + `grid md:grid-cols-3 gap-8` with connecting line (desktop: horizontal line via `border-t` between numbers).
- Content:
  - H2: "Three steps. Two minutes."
  - Step 1: Number `01` (Fraunces 40px #C9A86A / muted) + Title `Register` + Body `Create your profile with batch, branch, and current role.`
  - Step 2: `02` + `Get Discovered` + `Your profile appears in the searchable directory for peers and institution.`
  - Step 3: `03` + `Stay Engaged` + `Follow the feed for jobs, events, and institutional updates.`
- Mobile: vertical steps with left border line.

#### Section 5 — Featured Stats (institutional credibility)
- Layout: `bg-[#1B3A5C] py-16 lg:py-20` (dark band).
- Content: `grid grid-cols-2 lg:grid-cols-4 gap-8 text-center`
  - Stat 1: `2,000+` (Fraunces 40px text-white) + `Alumni Records` (Inter 13px uppercase tracking text-white/60)
  - Stat 2: `30+` + `Batches Connected`
  - Stat 3: `6` + `Branches Represented`
  - Stat 4: `100%` + `Verified Profiles`
  - Footnote caption center `text-white/50 mt-8`: "Figures from live database — updated as alumni join. Seed data shown for demonstration."
  - // Note: Stats read from Firestore count where possible; fallback to hardcoded above for demo if empty.
- Mobile: 2×2 grid.

#### Section 6 — CTA Section (closing)
- Layout: `bg-[#F8F7F5] py-16 lg:py-24`. Centered card `bg-white rounded-2xl border shadow-sm p-8 lg:p-12 text-center max-w-3xl mx-auto`.
- Content:
  - H2: "Ready to reconnect?"
  - Body: "Your profile is the first step. Join hundreds of alumni who've already made themselves discoverable."
  - CTA: `primary lg` → "Create Your Profile" (to /register) + secondary link below: "Already registered? Log in →"
- Mobile: card full-width with px-6.

#### Section 7 — Footer
- Layout: `bg-[#1A2332] text-white/70 py-12`. Container `grid md:grid-cols-4 gap-8` + bottom bar `border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4`.
- Content:
  - Col 1: Logo "Alumni Connect" text-white + tagline `caption text-white/50` "Centralized alumni data management for Government of Punjab — SIH25019."
  - Col 2: "Platform" links: Home, Directory, Feed
  - Col 3: "Account" links: Register, Login
  - Col 4: "Institution" address placeholder: "Directorate of Technical Education, Punjab" + SIH badge
  - Bottom bar: `© 2026 Alumni Connect. Built for Smart India Hackathon — Practice Round.` left + `Govt. of Punjab` right.
- All footer links `Inter 14px 400 text-white/70 hover:text-white`.

---

### 5.2 Register (/register) — Public, Redirect if Already Authenticated

**Route:** `/register` | **Auth:** Public (if authenticated, redirect to `/directory` or `/admin`) | **Firebase Reads:** none initial. Writes: `createUserWithEmailAndPassword` → `setDoc(doc(alumni_profiles, uid), profile)`.

#### Layout
`min-h-screen bg-[#F8F7F5] flex items-center justify-center py-12 px-4` — centered card. Optionally split-screen on ≥lg: left `bg-[#1B3A5C]` panel with headline + right form. For MVP: centered single card is acceptable and faster. Spec below for centered card (switch to split if time allows).

#### Sections

**Section 1 — Form Panel**
- Layout: `w-full max-w-[520px] bg-white rounded-2xl border shadow-sm p-6 sm:p-8`.
- Content:
  - Header: H2 "Create your alumni profile" + body-sm muted "Join the verified directory in under two minutes."
  - Form (react-hook-form + zodResolver):
    | Field | Type | Required | Validation | Firestore Field |
    |---|---|---|---|---|
    | Full Name | input text | yes | min 2 chars, max 60 | `name` |
    | Email | input email | yes | valid email | `email` (also Auth) |
    | Password | input password | yes | min 8, at least 1 letter + 1 number | Auth only |
    | Confirm Password | input password | yes | must match password | — |
    | Batch Year | select | yes | 1960–2026 (dropdown) | `batch` (string e.g. "2021") |
    | Branch | select | yes | CSE, ECE, ME, CE, EE, IT, Other | `branch` |
    | Current Company | input text | no | max 60 | `company` |
    | Location | input text | no | max 60 | `location` (City, State) |
    | Contact (Phone) | input tel | no | 10 digits if provided | `contact` (string) |
    | LinkedIn URL | input url | no | valid URL containing linkedin.com if provided | `linkedinUrl` |
    | Agree to Terms | checkbox | yes | must be true | — |
  - Buttons: `Create Profile` primary lg w-full (loading spinner when submitting) + divider `or` + `Sign up with Google` secondary w-full (optional, not required for MVP — skip if short on time)
  - Footer: `Already have an account? Log in` link to /login
  - Error handling: Firebase `auth/email-already-in-use` → inline alert `Email already registered. Try logging in.` + link. Other errors → toast error.

**Interactive Behavior:**
- On submit: validate zod → `createUserWithEmailAndPassword(auth, email, password)` → on success `setDoc(doc(db, "alumni_profiles", uid), { uid, name, email, batch, branch, company: company||"", location: location||"", contact: contact||"", linkedinUrl: linkedinUrl||"", photoURL: "", role: "alumni", createdAt: serverTimestamp(), updatedAt: serverTimestamp() })` → toast success → redirect `/directory`.
- Show password toggle (Eye/EyeOff 16px) inside input.
- All fields have helper/error states as per Input spec.

**Mobile:** Card becomes full-width with `rounded-2xl` retained, p-6, single col, batch+branch stacked vertically.

---

### 5.3 Login (/login) — Public, Redirect if Already Authenticated

**Route:** `/login` | **Auth:** Public | **Reads:** after auth `getDoc(doc(alumni_profiles, uid))` to read `role`. Writes: none (except auth session).

#### Layout
Same centered card as Register: `min-h-screen bg-[#F8F7F5] flex items-center justify-center py-12 px-4`.

#### Sections

**Section 1 — Form Panel**
- Layout: `w-full max-w-[440px] bg-white rounded-2xl border shadow-sm p-6 sm:p-8`.
- Content:
  - Header: H2 "Welcome back" + body-sm muted "Sign in to access the directory and feed."
  - Fields:
    | Field | Type | Validation |
    |---|---|---|
    | Email | input email | required, valid email |
    | Password | input password | required |
    | Remember me | checkbox | optional (Firebase persists via local) |
  - Links: `Forgot password?` (link variant, sm) aligned right below password — triggers `sendPasswordResetEmail` with toast feedback.
  - Button: `Sign In` primary lg w-full
  - Footer: `Don't have an account? Create one` → /register

**Behavior / Redirect Logic:**
```
onSubmit:
  signInWithEmailAndPassword(auth, email, password)
  → getDoc(doc(db, "alumni_profiles", user.uid))
  → if doc.data().role === "admin" → redirect /admin
  → else → redirect /directory
  → on error: auth/user-not-found, wrong-password → inline error "Invalid email or password." (do not reveal which)
```

Session: Firebase Auth persists via `browserLocalPersistence` (default). In Next.js App Router, protect routes client-side via `onAuthStateChanged` + server-aware wrapper; see Section 6.

---

### 5.4 Directory (/directory) — Alumni (Authenticated) or Public-Read Optional

**Route:** `/directory` | **Auth:** Protected — alumni or admin (redirect to /login if not authed). // Chosen: protect directory to ensure data credibility and prevent scraping; but allow design to show empty state with CTA if public.
**Reads:** `getDocs(collection(alumni_profiles))` or `query` with `where` for branch/batch, `orderBy(name)`. For realtime MVP, fetch all and filter client-side if <200 records; switch to Firestore queries when >200.
**Writes:** none.

#### Sections

**Section 1 — Header**
- Layout: `bg-white border-b py-6`. Container.
- Content: H1 "Alumni Directory" + body-sm muted "Search and reconnect with your peers" + count badge `Showing 24 alumni` (dynamic).
- Right: `View` toggle if needed (grid only for MVP).

**Section 2 — Search + Filter Panel**
- Layout: `bg-[#F8F7F5] border-b py-4 sticky top-16 z-30` (sticks below nav). Container `flex flex-col lg:flex-row gap-4 items-start lg:items-center`.
- Elements:
  - Search bar: `w-full lg:max-w-[360px]` input with `Search` icon left (Lucide Search 16px #8B95A5), placeholder "Search by name or company…", `onChange` debounced 200ms, filters cards immediately (client) or via Firestore query.
  - Filters: two `Select` dropdowns:
    - Batch: All Batches + 2018…2026 (or dynamic from data)
    - Branch: All Branches + CSE, ECE, ME, CE, EE, IT
  - Active filter chips: when filter applied, show `badge` with X to clear.
  - `Clear all` link (ghost sm) when any filter active.
  - Results count: `14 results` caption right-aligned.

**Section 3 — Alumni Card Grid**
- Layout: `py-8 bg-[#F8F7F5] min-h-[400px]`. Container `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`.
- Card spec: as per Profile Card in Section 4. Each card:
  - Avatar md (top left or centered)
  - Name H3 (16px 600) + Batch badge + Branch badge (flex gap-2)
  - Company `14px 500 #4B5563` + `MapPin 12px + location 13px #8B95A5`
  - Divider `border-t mt-4 pt-4 flex justify-between items-center`
  - Left: LinkedIn icon link (if linkedinUrl) — teal
  - Right: `View Profile` link (to /profile/[uid])
- Behavior: Card click anywhere navigates to profile. Hover: lift + border.

**Loading State:**
- Skeleton grid: 8 skeleton cards `bg-white rounded-2xl p-5` with `skeleton` avatar 48px + 3 lines.

**Empty State:**
- Centered `py-16 text-center max-w-md mx-auto`
- Icon: `Users` 48px in muted circle
- H3: "No alumni found"
- Body: "Try adjusting your search or filters. No one matches 'Arjun' in CSE 2021."
- CTA: `Clear filters` primary sm

**Mobile:** Single col cards, filters stack vertically, search full-width, sticky filter panel retains.

---

### 5.5 Profile (/profile/[id]) — Authenticated

**Route:** `/profile/[id]` where `[id]` is Firestore `uid`. Also `/profile` (without id) redirects to `/profile/{currentUser.uid}` for convenience.
**Auth:** Protected — must be logged in.
**Reads:** `getDoc(doc(alumni_profiles, id))`.
**Writes:** `updateDoc(doc(alumni_profiles, uid), { ...fields, updatedAt: serverTimestamp() })` — only if `auth.uid === id`.

#### Sections

**Section 1 — Profile Header**
- Layout: `bg-white border-b`. Container `py-8`. Top: back link `← Back to Directory`. Below: `flex flex-col sm:flex-row gap-6 items-start`.
- Content:
  - Avatar `lg` (80px) left
  - Right: Name H1 + badges (batch, branch, role) row + company `body 500` + location with icon + contact + LinkedIn link row (icons 14px).
  - Far right (desktop): if `isOwnProfile` → `Edit Profile` primary sm button. Else `Connect on LinkedIn` secondary sm (if URL).
- Data fields displayed: `name, batch, branch, company, location, contact (partially masked if not own? show full per MVP), linkedinUrl, email (only own or admin)`.

**Section 2 — View Mode vs Edit Mode**

| Mode | Layout | Content |
|---|---|---|
| **View** (default) | 2-col grid `grid md:grid-cols-3 gap-6 py-8`. Left 1-col: About card. Right 2-col span: Details. | About card: `card p-6` with label + bio placeholder ("No bio yet" if empty). Details card: `card p-6` with `dl` list: Batch, Branch, Company, Location, Contact, LinkedIn (linked). Timestamp `Member since Mar 2024` caption. |
| **Edit** (own profile only) | Same grid but form replaces details. Toggle via state, no route change. | Form pre-filled from Firestore. Fields same as Register (minus email/password). Email read-only. Save `primary` + Cancel `ghost`. Validation zod. On save `updateDoc` + toast success + exit edit mode. Optimistic update. |

**Behavior:**
- `isOwnProfile = auth.currentUser.uid === params.id`
- If not own, never show Edit button or form.
- Inline validation as per Input spec.
- After save, directory card must reflect change on next load.

**Loading:** Skeleton: avatar lg + 3 line skeletons.
**Not Found:** "Profile not found" alert with link to directory.

**Mobile:** Avatar centered, details stack single col, Edit button full-width, form single col.

---

### 5.6 Feed (/feed) — Authenticated

**Route:** `/feed` | **Auth:** Protected — alumni (and admin for creation).
**Reads:** `getDocs(query(collection(feed_posts), orderBy(createdAt, desc), limit(20)))` — realtime via `onSnapshot` optional for MVP.
**Writes:** `addDoc(collection(feed_posts), post)` — admin only.

#### Sections

**Section 1 — Header**
- Layout: `bg-white border-b py-6`. Container.
- Content: H1 "Engagement Feed" + body-sm muted "Announcements, jobs, and events — verified by your institution." + count.

**Section 2 — Composer (Admin Only)**
- Layout: `py-6`. Container `max-w-2xl mx-auto`. Card `bg-white rounded-2xl border shadow-sm p-5`.
- Conditional: `if profile.role === "admin"` render, else hide.
- Content:
  - Header: avatar sm + "Create a post" label
  - Form: `textarea` placeholder "Share an announcement, job opening, or event…" (min 10 chars) + `select` for post type: `Announcement | Job | Event` + `input` for optional link
  - Button: `Post` primary sm (disabled if empty) with `Send 16px` icon. `pending` spinner.
  - On submit: `addDoc(feed_posts, { authorId: uid, authorName: profile.name, type, content, link: link||"", createdAt: serverTimestamp() })` → toast → clear form → new post appears at top.

**Section 3 — Post List (Newest First)**
- Layout: `py-6 bg-[#F8F7F5] min-h-[400px]`. Container `max-w-2xl mx-auto space-y-4`.
- Post Card: `bg-white rounded-2xl border shadow-sm p-5`
  - Top row: Avatar sm + authorName `14px 600` + `• 2 hours ago` caption + `Badge` for type (Announcement=blue, Job=teal, Event=brass) top-right
  - Content: `body 14px #1A2332` with preserved line breaks
  - Link: if `link` present → `secondary sm` button `View Details →` below content
  - Timestamp: `Caption` 12px muted bottom
  - // Future: likes/comments are post-MVP — do not build
- Order: `orderBy(createdAt, desc)` — newest top.

**Loading:** 3 skeleton post cards (avatar + 3 lines).
**Empty:** Icon `Megaphone` + H3 "No posts yet" + body "Your institution hasn't posted anything. Check back soon." + if admin, CTA to create first post.

**Mobile:** Full-width cards with p-4, composer stacked.

---

### 5.7 Admin (/admin) — Admin Only

**Route:** `/admin` | **Auth:** Protected + Admin role required. If not admin → redirect `/directory` + toast "Access denied."
**Reads:** `getDocs(collection(alumni_profiles))` — optionally `query(orderBy(name))` for sorting client-side.
**Writes:** none in MVP (future: role updates). Read-only table.

#### Sections

**Section 1 — Header**
- Layout: `bg-white border-b py-6`. Container `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`.
- Content: H1 "Admin Dashboard" + body-sm muted "All alumni records — searchable and export-ready." + badge `Admin Access` (navy).
- Right: `Export hint` — button `Download CSV` secondary sm (if implemented: client-side CSV generation from fetched data; else badge "Export coming soon" brass). For SIH demo, implement basic CSV export via `Blob`.

**Section 2 — KPIs (optional 3-card row)**
- Layout: `py-6 bg-[#F8F7F5]`. Container `grid grid-cols-1 sm:grid-cols-3 gap-4`.
- Cards: stat card spec — `Total Alumni` (count), `Batches` (distinct batch count), `Branches` (distinct). Number `Fraunces 28px 700 #1B3A5C`.

**Section 3 — Table Controls**
- Layout: Container `flex flex-col sm:flex-row gap-4 py-4`.
- Elements:
  - Search input `max-w-sm` placeholder "Search by name, email, company…"
  - Select filter: Branch, Batch (same as directory) — optional for admin
  - Right: column sort indicator + pagination info.

**Section 4 — Alumni Data Table**
- Layout: Container table wrapper as spec. `overflow-x-auto`.
- Columns:

| Column | Field | Sortable | Cell Render |
|---|---|---|---|
| Alumni | `name` + `email` | yes (name) | Avatar sm + name 500 + email caption below |
| Batch | `batch` | yes | badge batch year |
| Branch | `branch` | yes | badge branch |
| Company | `company` | yes | text 14px |
| Location | `location` | no | MapPin + text 13px |
| Role | `role` | no | badge Alumni/Admin |
| Joined | `createdAt` | yes | formatted date caption e.g. "Mar 12, 2024" |
| Actions | — | no | `View` link to /profile/[uid] |

- Row hover + selection spec per Table.
- Sorting: click header toggles asc/desc, visual arrow.
- Pagination: 10 per page default, controls below table.

**Loading:** Table skeleton (8 rows with skeleton cells).
**Empty:** "No alumni records yet."
**Unauthorized:** Full-page `Alert` + redirect.

**Mobile (Table → Card View):**
- At `<768px`, hide table, show `grid grid-cols-1 gap-4` card list. Each card: `bg-white rounded-xl border p-4` with avatar + name + badges row + company/location + view link. Same data, card layout. Toggle via `hidden md:block` (table) vs `md:hidden` (cards).

---

## 6 — FIREBASE ARCHITECTURE

### Firestore Collections + Document Schemas

#### `alumni_profiles/{uid}`

Document ID is Firebase Auth `uid` (one-to-one).

| Field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| `uid` | string | yes | == doc id | Auth UID |
| `name` | string | yes | 2–60 chars | Display name |
| `email` | string | yes | valid email, lowercase | Denormalized from Auth; unique |
| `batch` | string | yes | 4-digit year e.g. "2021" | Stored as string for query simplicity |
| `branch` | string | yes | enum: CSE, ECE, ME, CE, EE, IT, Other | Uppercase |
| `company` | string | no | max 60 chars | "" if not provided |
| `location` | string | no | max 60 | "City, State" |
| `contact` | string | no | 10–15 chars if present | Phone; store as string, never as number |
| `linkedinUrl` | string | no | valid URL || "" | Must contain linkedin.com if non-empty (zod) |
| `photoURL` | string | no | URL || "" | Future: upload; currently "" or Auth photo |
| `role` | string | yes | enum: "alumni" \| "admin" | Default "alumni" on register; admin set manually |
| `createdAt` | Timestamp | yes | serverTimestamp on create | Firestore Timestamp |
| `updatedAt` | Timestamp | yes | serverTimestamp on update | Firestore Timestamp |

```ts
// types/alumni.ts
export type Branch = "CSE" | "ECE" | "ME" | "CE" | "EE" | "IT" | "Other";
export type AlumniRole = "alumni" | "admin";
export interface AlumniProfile {
  uid: string;
  name: string;
  email: string;
  batch: string;
  branch: Branch;
  company: string;
  location: string;
  contact: string;
  linkedinUrl: string;
  photoURL: string;
  role: AlumniRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Zod schema for create/update (used before every write):

```ts
// lib/validators.ts
import { z } from "zod";
export const alumniProfileSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().toLowerCase(),
  batch: z.string().regex(/^\d{4}$/),
  branch: z.enum(["CSE","ECE","ME","CE","EE","IT","Other"]),
  company: z.string().max(60).optional().default(""),
  location: z.string().max(60).optional().default(""),
  contact: z.string().regex(/^\d{10,15}$/).optional().or(z.literal("")),
  linkedinUrl: z.string().url().refine(v => v === "" || v.includes("linkedin.com"), "Must be a LinkedIn URL").optional().or(z.literal("")),
});
```

#### `feed_posts/{postId}`

Auto-ID via `addDoc`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes (doc id) | Auto-generated |
| `authorId` | string | yes | UID of admin who created |
| `authorName` | string | yes | Denormalized display name |
| `authorPhoto` | string | no | Optional avatar |
| `type` | string | yes | enum: "announcement" \| "job" \| "event" |
| `content` | string | yes | 10–2000 chars |
| `link` | string | no | Optional URL for Apply/More |
| `createdAt` | Timestamp | yes | serverTimestamp |
| `updatedAt` | Timestamp | no | serverTimestamp on edit (post-MVP) |

```ts
export type FeedPostType = "announcement" | "job" | "event";
export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  type: FeedPostType;
  content: string;
  link?: string;
  createdAt: Timestamp;
}
export const feedPostSchema = z.object({
  type: z.enum(["announcement","job","event"]),
  content: z.string().min(10).max(2000),
  link: z.string().url().optional().or(z.literal("")),
});
```

No other collections in MVP. Post-MVP collections documented as future scope only — do not create.

### Security Rules Summary

```js
// firestore.rules — summary (implement verbatim)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: is signed in
    function isSignedIn() { return request.auth != null; }
    // Helper: is admin — role stored in alumni_profiles/{uid}
    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/alumni_profiles/$(request.auth.uid)).data.role == "admin";
    }
    // Helper: owns document
    function isOwner(uid) { return isSignedIn() && request.auth.uid == uid; }

    match /alumni_profiles/{uid} {
      // Read: any signed-in user can read all profiles (directory needs it)
      // Public read is also acceptable for demo: allow read: if true; but prefer signed-in
      allow read: if isSignedIn();
      // Create: only the owner can create their own doc, and role must be alumni (not self-elevate to admin)
      allow create: if isOwner(uid) && request.resource.data.role == "alumni"
                    && request.resource.data.uid == uid;
      // Update: owner can update own doc (but cannot change role or uid), admin can update any
      allow update: if (isOwner(uid) && request.resource.data.role == resource.data.role
                       && request.resource.data.uid == resource.data.uid)
                    || isAdmin();
      // Delete: admin only (or never)
      allow delete: if isAdmin();
    }

    match /feed_posts/{postId} {
      // Read: any signed-in user
      allow read: if isSignedIn();
      // Create: admin only
      allow create: if isAdmin()
                    && request.resource.data.authorId == request.auth.uid
                    && request.resource.data.content.size() >= 10;
      // Update/Delete: admin or author
      allow update, delete: if isAdmin() || (isSignedIn() && resource.data.authorId == request.auth.uid);
    }
  }
}
```

| Question | Answer |
|---|---|
| Who can read `alumni_profiles`? | Any signed-in user (`isSignedIn()`). For hackathon demo simplicity, `allow read: if true;` is also acceptable — but implement signed-in to show you considered privacy. |
| Who can write? | Only the owner for their own doc; cannot escalate `role`. Admin can write any. |
| Who can create `feed_posts`? | Admin only (`isAdmin()`). |
| How is admin role determined and enforced? | `alumni_profiles/{uid}.role == "admin"`. Set manually in Firestore console for 1–2 UIDs (seed script or console). Enforced in Security Rules via `get()` lookup + in UI via `profile.role`. Never allow client to self-set role to admin on create — rule checks `request.resource.data.role == "alumni"`. |

### Auth Flow — Exact Steps

**Registration:**
```
1. User fills /register form → zod validates client-side
2. onSubmit: setIsSubmitting(true)
3. createUserWithEmailAndPassword(auth, email, password)
   → on failure: show toast/error (email-already-in-use, weak-password, network)
4. On success: const uid = userCredential.user.uid
5. setDoc(doc(db, "alumni_profiles", uid), {
     uid, name, email: email.toLowerCase(), batch, branch,
     company: company||"", location: location||"", contact: contact||"",
     linkedinUrl: linkedinUrl||"", photoURL: "",
     role: "alumni",
     createdAt: serverTimestamp(), updatedAt: serverTimestamp()
   })
   → zod validates payload before setDoc (never write without zod)
6. toast.success("Profile created — welcome!")
7. router.push("/directory")
```

**Login:**
```
1. User fills /login → zod validates
2. signInWithEmailAndPassword(auth, email, password)
3. On success: const snap = await getDoc(doc(db, "alumni_profiles", user.uid))
4. const role = snap.data()?.role
5. if role === "admin" → router.push("/admin")
   else → router.push("/directory")
6. On failure: generic "Invalid email or password" (do not leak which field is wrong)
```

**Session Persistence:**
- Firebase `browserLocalPersistence` (default) — survives refresh and tabs.
- In Next.js App Router:
  - Client provider: `components/providers/auth-provider.tsx` wraps app, uses `onAuthStateChanged(auth, (user) => { if(user) fetch profile; setUser/setProfile; setLoading(false) })`
  - Protected routes: `hooks/useRequireAuth.ts` — if `!user && !loading` → `router.push("/login")`; if `role !== "admin"` for /admin → redirect.
  - No server session; all guards are client-side for MVP (acceptable for hackathon). Add `// ponytail: client-side auth guard only, add middleware + server session if compliance requires` comment.

**Admin Detection (how UI knows):**
```
const { user, profile, loading } = useAuth(); // from AuthContext
const isAdmin = profile?.role === "admin";
// Nav: {isAdmin && <Link href="/admin">Admin</Link>}
// Feed composer: {isAdmin && <Composer />}
// Route guard: if (!loading && !isAdmin) redirect
```

Admin role is seeded: after first registration, manually set `role: "admin"` for one UID in Firebase Console → that user sees admin UI on next login.

---

## 7 — ANIMATIONS & MOTION

### Global

- **Default transition for all interactive elements:** `150ms cubic-bezier(0.4,0,0.2,1)` (easeInOut) for color/border/shadow/transform/opacity.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` → all animations collapse to `0ms` or `opacity 0→1` only (no translate/scale/shake). Provide:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

### Per Animation

| Name | Trigger | Element | From | To | Duration | Easing | Notes |
|---|---|---|---|---|---|---|---|
| Page entry | Route change | `main` wrapper | `opacity 0, translateY(4px)` | `opacity 1, translateY(0)` | 250ms | `cubic-bezier(0.16,1,0.3,1)` | Framerless — CSS keyframes `fade-in` + `slide-up`. Applied to page container on mount. |
| Hero section load | Page load `/` | Hero headline, subhead, CTAs, image | `opacity 0, translateY(12px)` stagger 80ms per child (headline → subhead → CTAs → image) | `opacity 1, translateY(0)` | 500ms per item | `cubic-bezier(0.16,1,0.3,1)` | Stagger: headline 0ms, subhead 80ms, CTAs 160ms, image 240ms. Image also `scale 0.98→1`. |
| Alumni cards scroll-into-view | Card enters viewport | Each `.alumni-card` | `opacity 0, translateY(12px)` | `opacity 1, translateY(0)` | 400ms | `cubic-bezier(0.16,1,0.3,1)` | Staggered 60ms per card via `transition-delay: index*60ms`. Use IntersectionObserver (or CSS only if `animation-timeline` not supported — just fade without stagger). Once only. |
| Directory search results update | `search`/`filter` state change | Card grid | `opacity 0.6` (old grid fades) | `opacity 1` (new grid) | 150ms | `ease-out` | Do not remount entire grid; cross-fade. If client filter, no loading spinner — just filter. If Firestore query, show skeleton. |
| Profile edit mode toggle | Click Edit / Cancel | Form panel | View: `opacity 1` → `opacity 0` then Edit: `opacity 0, translateY(4px)` → `1, 0` | — | 200ms | `ease-out` | Content swap, not route change. Keep scroll position. |
| Feed post appear | New post `addDoc` success | New post card at top | `opacity 0, translateY(-8px), scale(0.98)` | `opacity 1, translateY(0), scale(1)` | 300ms | `cubic-bezier(0.16,1,0.3,1)` | Optional highlight ring `shadow-brand` for 1s then fade. |
| Admin table row hover | Hover `tr` | Row bg | `bg-white` | `bg-[#F8F7F5]` | 150ms | `ease-out` | Transition `background-color` only. |
| Button click feedback | `:active` | Any `button` | `scale(1)` + `shadow` | `scale(0.98)` + slightly darker bg | 100ms | `ease-out` | `transform: scale(0.98)` on active. Disabled never scales. |
| Form error shake | Validation failure | Input wrapper | `translateX(0)` | `translateX(-4px) → 4px → 0` (shake keyframes) | 400ms | `ease-in-out` | Add `animate-shake` class on error, remove after 400ms. |
| Toast enter | Toast created | Toast panel | `opacity 0, translateY(8px)` | `opacity 1, translateY(0)` | 250ms | `cubic-bezier(0.16,1,0.3,1)` | From bottom-right. |
| Toast exit | Auto-dismiss / close | Toast panel | `opacity 1, translateY(0)` | `opacity 0, translateY(-4px)` | 150ms | `ease-in` | Then unmount. |
| Modal open | Dialog open | Backdrop + Panel | Backdrop `opacity 0` Panel `opacity 0, translateY(8px) scale(0.98)` | `opacity 1` Panel `opacity 1, translateY(0) scale(1)` | 250ms backdrop 200ms panel | `cubic-bezier(0.16,1,0.3,1)` | Exit 150ms ease-in. |
| Nav scroll-to-solid | `scrollY > 16` | `nav` | `bg-transparent border-transparent` | `bg-white/95 backdrop-blur border-[#E2DDD6] shadow-sm` | 200ms | `ease-out` | Transition bg/border/shadow. |

Implement via Tailwind `transition-*` + custom `@keyframes` in `globals.css`. No framer-motion.

---

## 8 — RESPONSIVE BEHAVIOR

Breakpoints: `sm 640` `md 768` `lg 1024` `xl 1280` `2xl 1536` (Tailwind defaults).

| Breakpoint | Layout Changes | Nav | Typography | Card Grid | Table → Cards | Inputs | Hero Reflow |
|---|---|---|---|---|---|---|---|
| **Base (<640)** | Single col everywhere, `space-y-5`, container `px-4` (16px) | Hamburger drawer, CTA stacked | `display` 32px, `h1` 28px, `body-lg` 16px | 1 col | Table hidden, card list visible | Full-width, h-11 (44px touch target) | Single col, image below copy, CTAs full-width stacked |
| **sm (640)** | `sm:grid-cols-2` where applicable, `px-6` (24px) | Still drawer | `display` 40px | 2 cols for alumni cards | Still cards | Pair fields side-by-side optional | Same as base, but CTAs side-by-side if space |
| **md (768)** | Section `py-16`, 3-col value props becomes 3 col here | Still drawer | `h1` 40px restored | 2 cols | Table becomes visible (`hidden md:table`), cards hidden (`md:hidden`) | Grid 2-col for batch/branch | 2-col hero still stacked until lg |
| **lg (1024)** | `lg:grid-cols-3`/`4`, `px-8` (32px), section `py-24` | Desktop nav visible, hamburger hidden | All sizes full scale | 3 cols | Table | Full row forms | 2-col hero `grid-cols-2` side-by-side |
| **xl (1280)** | Max container 1280 capped, `gap-8` | Desktop | — | 4 cols | Table | — | Hero image larger |
| **2xl (1536)** | Container stays 1280 centered, no stretch | Desktop | — | 4 cols | Table | — | — |

**Specific Responsive Rules:**

- **Nav:** `<lg` hamburger; `≥lg` inline links. Drawer width `320px` on mobile, `380px` on sm.
- **Alumni card grid:** `grid-cols-1` base → `sm:grid-cols-2` → `lg:grid-cols-3` → `xl:grid-cols-4`
- **Admin table → cards:** Use `hidden md:block` wrapper for `<table>` and `md:hidden grid grid-cols-1 gap-4` for card fallback — same data, no duplication of fetch.
- **Form field groups:** Batch + Branch `grid-cols-1 sm:grid-cols-2`; single fields always `w-full`.
- **Profile header:** `flex-col sm:flex-row` — avatar centered on mobile, left on desktop. Edit button `w-full sm:w-auto`.
- **Hero:** `grid-cols-1 lg:grid-cols-2` — copy order-1, image order-2; on mobile image is below CTAs with `mt-8`.
- **Feed:** `max-w-2xl mx-auto` centered on all breakpoints; composer padding `p-4` mobile → `p-5` desktop.
- **Footer:** `grid-cols-1 md:grid-cols-4` — stacks to single col on mobile.
- **Touch targets:** All buttons/inputs minimum 40px height on mobile (h-10 → h-11).

---

## 9 — FILE STRUCTURE

Exact structure the agent must create. No deviation.

```
alumni-connect/
├── app/
│   ├── layout.tsx                 # Root layout: html lang, fonts, providers, nav, footer, toaster
│   ├── globals.css                # Tailwind base + tokens + keyframes + reduced-motion
│   ├── page.tsx                   # Landing (/)
│   ├── not-found.tsx              # 404 — friendly, link to /
│   ├── loading.tsx                # Global loading skeleton (optional)
│   ├── (auth)/
│   │   ├── layout.tsx             # Auth group layout: centered card shell (no nav? or minimal nav)
│   │   ├── login/
│   │   │   └── page.tsx           # /login
│   │   └── register/
│   │       └── page.tsx           # /register
│   ├── directory/
│   │   └── page.tsx               # /directory (protected)
│   ├── profile/
│   │   ├── page.tsx               # /profile → redirect to /profile/[id] for current user
│   │   └── [id]/
│   │       └── page.tsx           # /profile/[id] — view/edit
│   ├── feed/
│   │   └── page.tsx               # /feed (protected)
│   └── admin/
│       └── page.tsx               # /admin (admin-only)
├── components/
│   ├── ui/                        # shadcn primitives (generated)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── table.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── alert.tsx
│   │   ├── form.tsx
│   │   └── scroll-area.tsx
│   ├── layout/
│   │   ├── navbar.tsx             # Desktop+mobile nav, auth-aware, scroll behavior
│   │   ├── footer.tsx             # Footer (all pages)
│   │   └── auth-provider.tsx      # AuthContext + onAuthStateChanged wrapper
│   ├── alumni/
│   │   ├── alumni-card.tsx        # Profile card for directory grid
│   │   ├── alumni-grid.tsx        # Grid + empty/loading states
│   │   ├── filter-panel.tsx       # Search + batch/branch selects + chips
│   │   └── profile-form.tsx       # Reusable alumni fields form (register + edit)
│   ├── feed/
│   │   ├── post-card.tsx          # Single feed post
│   │   ├── post-list.tsx          # List + empty/loading
│   │   └── post-composer.tsx      # Admin-only create form
│   └── admin/
│       ├── alumni-table.tsx       # Desktop table
│       ├── alumni-cards-mobile.tsx# Mobile card fallback
│       └── export-button.tsx      # CSV export (client-side)
├── lib/
│   ├── firebase.ts                # initializeApp + getAuth + getFirestore + export
│   ├── auth.ts                    # Auth helpers: register, login, logout, resetPassword, useAuth hook re-export
│   ├── firestore.ts               # ALL Firestore helpers (see below) — only file that imports firestore SDK
│   ├── validators.ts              # Zod schemas (alumniProfileSchema, feedPostSchema, loginSchema)
│   ├── utils.ts                   # cn() (clsx+twMerge)
│   └── seed.ts                    # Seed 20 dummy alumni (dev-only, run via npm script)
├── hooks/
│   ├── use-auth.ts                # useAuth() + useRequireAuth() + useIsAdmin()
│   └── use-debounce.ts            # useDebounce(value, delay)
├── types/
│   ├── alumni.ts                  # AlumniProfile, Branch, AlumniRole
│   └── feed.ts                    # FeedPost, FeedPostType
├── public/
│   ├── favicon.ico
│   └── og-image.png               # Open Graph image for landing (1200×630, navy+brass)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .eslintrc.json
├── .env.local.example             # Env var names without values
├── .gitignore
└── README.md
```

**`lib/firestore.ts` must export these helpers (and no component may import `firebase/firestore` directly):**

```ts
// lib/firestore.ts
export async function createAlumniProfile(uid: string, data: AlumniProfileInput): Promise<void>
export async function getAlumniProfile(uid: string): Promise<AlumniProfile | null>
export async function getAllAlumniProfiles(): Promise<AlumniProfile[]>
export async function updateAlumniProfile(uid: string, data: Partial<AlumniProfileInput>): Promise<void>
export async function queryAlumniProfiles(filters: { batch?: string; branch?: string; search?: string }): Promise<AlumniProfile[]>

export async function createFeedPost(data: FeedPostInput, author: { uid: string; name: string }): Promise<string>
export async function getFeedPosts(limitCount?: number): Promise<FeedPost[]>
export function subscribeFeedPosts(callback: (posts: FeedPost[]) => void): Unsubscribe

export function formatTimestamp(ts: Timestamp | null): string
export function toCSV(profiles: AlumniProfile[]): string
```

---

## 10 — BUILD ORDER

Numbered sequence — do not start next step until previous is verified.

| Step | What to Create | Verify Before Next Step |
|---|---|---|
| **1** | `tailwind.config.ts` + `app/globals.css` + `lib/utils.ts` (all tokens, CSS variables, shadows, keyframes) | Run `npm run build` — no Tailwind errors; inspect a dummy `<div class="bg-brand">` renders correct hex; check `globals.css` variables match Section 3. |
| **2** | `lib/firebase.ts` + `lib/auth.ts` + `lib/validators.ts` + `types/*` | `lib/firebase.ts` initializes without error (console.log app name); validators unit-test: `alumniProfileSchema.parse(valid)` passes, invalid email fails. No component yet. |
| **3** | `lib/firestore.ts` (all DB helpers) + `lib/seed.ts` + Firestore rules file | Helpers handle try/catch with typed errors; `seed.ts` can create one doc in emulator or console; never call Firebase from components directly. |
| **4** | `components/layout/auth-provider.tsx` + `hooks/use-auth.ts` + `app/layout.tsx` (root layout with fonts, providers) | Wrap app, `onAuthStateChanged` fires, `useAuth()` returns user/profile/loading correctly; fonts load (check computed style Fraunces on h1). |
| **5** | `components/layout/navbar.tsx` + `components/layout/footer.tsx` | Nav shows correct state logged out vs in, scroll transparent→solid works, mobile drawer opens/closes, links navigate. Footer renders on all routes. |
| **6** | Install shadcn/ui primitives: `button input textarea label card badge avatar table dialog dropdown-menu select tabs separator skeleton toast toaster alert form scroll-area` — then override with tokens from Section 4 (check button primary is #1B3A5C, radius 10px) | Each component renders in isolation story: button variants correct, input focus ring teal, card shadow-sm. No default blue left. |
| **7** | `components/alumni/profile-form.tsx` + `app/(auth)/register/page.tsx` + `app/(auth)/login/page.tsx` | Register creates Auth user + Firestore doc + redirects; Login redirects by role; error states (email-already-in-use, wrong-password) show correctly; zod validation shows inline. |
| **8** | `components/alumni/alumni-card.tsx` + `components/alumni/filter-panel.tsx` + `components/alumni/alumni-grid.tsx` + `app/directory/page.tsx` | Seed 20 records, directory shows grid, search filters on keystroke, batch/branch filters work, loading skeleton shows, empty state shows. Measure: search responds <100ms. |
| **9** | `app/profile/[id]/page.tsx` (view + edit toggle) + `app/profile/page.tsx` redirect | Own profile shows Edit, others don't; edit saves and persists to Firestore; directory reflects update; validation + error states. |
| **10** | `components/feed/post-card.tsx` + `post-composer.tsx` + `post-list.tsx` + `app/feed/page.tsx` | Alumni sees posts newest-first, admin sees composer, posting adds to top, loading/empty states, toast feedback. |
| **11** | `components/admin/alumni-table.tsx` + `alumni-cards-mobile.tsx` + `export-button.tsx` + `app/admin/page.tsx` + admin guard | Admin route redirects non-admin; table shows all alumni, search/sort/pagination work; mobile shows cards; CSV export downloads. Seed ensures 20 rows for demo. |
| **12** | `app/page.tsx` (Landing — hero, value props, how-it-works, stats, CTA, footer) | Full landing renders, hero headline correct, stats show numbers, all CTAs navigate, responsive check (phone + desktop), reduced-motion check. |
| **13** | `app/not-found.tsx` + loading skeletons per route + toast polish + final responsive sweep (Section 8 checklist) | Every route has loading skeleton, no broken states, 404 works, toasts animate correctly, mobile drawer on all pages. |
| **14** | `lib/seed.ts` execution + Firestore rules deploy + Vercel env vars + production build verification | `npm run build` passes with no TypeScript `any`, `next lint` clean, `firebase deploy --only firestore:rules` succeeds, Vercel preview loads with real data. |

Do not build pages before steps 1–6 (tokens + Firebase + layout + shadcn) — pages depend on them.

---

## 11 — HARD CONSTRAINTS

Minimum 15 explicit prohibitions — violating any is a build failure.

### Design — 10 Constraints

1. **Never use default Tailwind blue (`#3B82F6`, `bg-blue-*`) or gray palette (`bg-gray-*`) for brand colors.** Brand is `#1B3A5C` navy, brass `#C9A86A`, teal `#2E7D6F` only. Grep for `blue-` or `gray-` in classes — must be zero.
2. **Never use `border-radius` below 6px anywhere.** Minimum is `10px` for inputs/buttons, `16px` for cards/modals. No `rounded-sm` (4px) or `rounded` (6px is minimum but prefer 10/16).
3. **Never render a form without complete validation states:** default, focus, error (red border + icon + message + shake), disabled. Every field must have zod schema and inline error.
4. **Never use placeholder or lorem ipsum copy in final output.** Every heading, subheading, body, CTA must be the real words from Section 5. No "Lorem ipsum dolor sit amet."
5. **Never use more than one primary CTA per viewport section.** One `primary lg` per hero/card — secondary actions are `secondary` or `ghost` or `link`. Avoids visual competition.
6. **Never use pure black (`#000000`) or pure white page background (`#FFFFFF` for page).** Page is `#F8F7F5`, text is `#1A2332`, card is `#FFFFFF`. Black reads as harsh, not institutional.
7. **Never use gradients that read as "student startup":** no purple, pink, neon, or high-saturation rainbow gradients. Only approved gradients in Section 3 (navy→teal, brass→transparent).
8. **Never use emoji as icons.** Use Lucide React icons only, strokeWidth 1.75, size 16–20px. Consistency signals professionalism.
9. **Never leave an empty state without an icon + heading + body + action.** Every empty (directory no results, feed no posts, admin no records) must have the full pattern from Section 5.
10. **Never render a page without a loading skeleton.** Every data-fetching route (directory, profile, feed, admin) has `skeleton` components matching the card/table shape — no blank white flash.

### Firebase / Data — 6 Constraints

11. **Never write to Firestore without Zod validation first.** Every `setDoc`/`updateDoc`/`addDoc` call must be preceded by `schema.parse(data)` in `lib/firestore.ts`. Never trust client form values directly.
12. **Never expose `/admin` without auth + role check.** Component must `useRequireAuth` + `useIsAdmin` and redirect non-admin to `/directory` with toast. Never rely on nav hiding alone.
13. **Never store sensitive fields (password, plain phone, Aadhaar) in Firestore.** Password stays in Auth only; phone stored as string but never displayed fully to non-owners in future iterations. No secrets in `alumni_profiles`.
14. **Never call Firebase SDK directly from a component.** All Firestore/Auth calls go through `lib/firestore.ts` or `lib/auth.ts` helpers. Components import from `lib/*` only. Enables testing and rule safety.
15. **Never use Firestore queries without an index check.** If `where` + `orderBy` combo fails, log the Firebase index creation link and fall back to client-side sorting for demo — never leave table broken.
16. **Never leave Firestore rules as `allow read, write: if true;` in final submission.** Use the rules in Section 6 (signed-in reads, owner writes, admin-only posts).

### Code — 4 Constraints (total 20)

17. **Never use `any` type in TypeScript.** Every variable, prop, and Firestore helper must be typed (`AlumniProfile`, `FeedPost`, `unknown` + narrow). `tsconfig` has `noImplicitAny: true`.
18. **Never call Firebase directly from a component — always through `lib/firestore.ts` helpers.** Duplicates constraint 14 for emphasis — this is load-bearing.
19. **Never use `useEffect` for data fetching without cleanup and loading state.** Every fetch has `isLoading` + `error` + skeleton. Never fetch in render body.
20. **Never add a new npm dependency without checking the ladder (Section 2):** stdlib/CSS/Tailwind can do it? Then no new package. Every added package must be in the approved list in Section 2 or justified in a `// Chosen because:` comment.

---

## 12 — SIH-SPECIFIC CHECKLIST

Checks relevant to Government of Punjab judges demoing this live. All must pass before submission.

- [ ] **Landing page communicates problem solved in under 10 seconds** — hero overline + headline + subhead + trust bar together state the value without scrolling. Test with a fresh viewer.
- [ ] **Stats section shows impact numbers (even if placeholder for demo)** — 4 stats in dark band, numbers derived from Firestore count where possible, fallback to `2,000+ / 30+ / 6 / 100%`.
- [ ] **Admin dashboard loads without delay (seed Firestore with 20 dummy alumni records)** — run `npm run seed` (or `tsx lib/seed.ts`) before demo; 20 records covering batches 2018–2024, branches CSE/ECE/ME/CE, realistic names/companies. Verify `getAllAlumniProfiles()` returns 20.
- [ ] **Search works on first keystroke with Firestore query (or debounced client filter)** — type "Arjun" and grid filters within 150ms; no submit button required.
- [ ] **All forms have success + error states visible** — Register: success toast + redirect, error "Email already registered"; Login: error "Invalid email or password"; Profile edit: success "Profile updated"; Feed composer: success + clears; each shows toast with correct variant color.
- [ ] **Mobile experience is demo-able on a phone** — test all 7 routes at 375px width: no horizontal scroll, touch targets ≥40px, nav drawer works, cards stack, table becomes cards.
- [ ] **No broken states — every route has a loading skeleton** — simulate slow network (DevTools 3G): directory shows 8 card skeletons, profile shows avatar+lines, feed shows 3 post skeletons, admin shows table skeleton.
- [ ] **Every page has a clear next-action visible above the fold** — Landing: two CTAs; Register: Create button; Login: Sign In; Directory: search bar; Profile: Edit (own) or LinkedIn; Feed: composer (admin) or scroll; Admin: search + export.
- [ ] **Design looks institutional — no gradients that read as "student startup"** — only navy→teal, no purple/pink; show to a non-technical viewer — they say "government" not "startup."
- [ ] **Auth flow is judge-proof: create account → see directory → edit profile → see change reflected** — rehearse this live path end-to-end before demo; have a pre-made account ready as backup (email/password on slide).
- [ ] **Firestore security rules are deployed and not `allow all`** — demonstrate by opening console → attempt to write as non-admin fails; rules file is in repo.
- [ ] **Vercel deployment is live and env vars are set (no local-only demo)** — share Vercel URL; judges can open on their phones; not `localhost`.
- [ ] **Footer credits SIH and Government of Punjab with problem statement ID** — footer contains "SIH25019" and "Government of Punjab" verbatim for judge recognition.
- [ ] **No console errors or TypeScript errors on production build** — `npm run build` passes, `next lint` clean, Chrome console zero red errors on any route.
- [ ] **All 7 routes are navigable from nav alone (no dead ends)** — click every nav link as a judge would; ensure `/profile` redirects, `/admin` guards, `/feed` loads.

---

## APPENDIX — COPY BANK (Real Words, No Placeholders)

Use verbatim where possible.

| Location | Copy |
|---|---|
| Hero overline | GOVERNMENT OF PUNJAB • SMART EDUCATION |
| Hero headline | Your institution, still your home. |
| Hero subhead | A permanent, trusted home for every graduate — find batchmates, stay current, and never lose touch with the place that shaped you. |
| Trust bar | Trusted by 2,000+ alumni • Secure • Self-service • Always current |
| Value prop 1 | Stay Discoverable — Update your profile once and your institution always knows where you are. |
| Value prop 2 | Find Anyone, Instantly — Search by name, batch, or branch. Reconnect in seconds. |
| Value prop 3 | Never Miss What Matters — Jobs, announcements, reunions — one verified feed. |
| How-it-works | Three steps. Two minutes. |
| Stats footnote | Figures from live database — updated as alumni join. Seed data shown for demonstration. |
| CTA closing | Ready to reconnect? Your profile is the first step. |
| Register header | Create your alumni profile — Join the verified directory in under two minutes. |
| Login header | Welcome back — Sign in to access the directory and feed. |
| Directory H1 | Alumni Directory — Search and reconnect with your peers |
| Feed H1 | Engagement Feed — Announcements, jobs, and events — verified by your institution. |
| Admin H1 | Admin Dashboard — All alumni records — searchable and export-ready. |
| Empty directory | No alumni found — Try adjusting your search or filters. |
| Empty feed | No posts yet — Your institution hasn't posted anything. Check back soon. |
| Footer tagline | Centralized alumni data management for Government of Punjab — SIH25019. |

---

## APPENDIX — SEED DATA SPEC (20 Records)

For `lib/seed.ts` — create 20 `alumni_profiles` docs via Firebase Admin or client helper. Distribution:

- Batches: 2018×3, 2019×3, 2020×4, 2021×4, 2022×3, 2023×3
- Branches: CSE×8, ECE×5, ME×3, CE×2, EE×2
- Names: realistic Indian names (e.g., Arjun Sharma, Priya Kaur, Amanpreet Singh, Neha Gupta...)
- Companies: Infosys, TCS, Wipro, HDFC Bank, Punjab Govt., Startup, Higher Studies
- Locations: Ludhiana, Patiala, Chandigarh, Mohali, Jalandhar, Delhi, Bangalore
- Roles: 19× alumni, 1× admin (your demo admin account)

Each has `linkedinUrl: "https://linkedin.com/in/example"` placeholder where applicable, `photoURL: ""`.

---

*End of AGENTS.md — No further aesthetic or architectural decisions are needed. If a value is not listed, you are blocked: choose the boring, institutional default and add `// Chosen because: [reason]`.*
