# Express API (Phase 1 sandbox)

Standalone Node.js + Express backend. Replaces Firebase for local verification.

## Run

```bash
npm run server
```

API: `http://localhost:4000`

## Demo accounts (after seed)

| Role | Email | Password |
|---|---|---|
| Admin | `manpreet.singh@example.com` | `Password123` |
| Alumni | `arjun.sharma@example.com` | `Password123` |

Reseed: `npm run seed -- --force`

## Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/alumni`
- `GET /api/alumni/:id`
- `PATCH /api/alumni/:id`
- `GET /api/feed`
- `POST /api/feed` (admin)
- `POST /api/colleges/requests`
- `GET /api/colleges/requests` (admin)
- `PATCH /api/colleges/requests/:id` (admin)
