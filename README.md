# Ahmad Ibrahim Platform

AI-driven connected platform for audit, consulting, training, and client management.

## What's included

| App | Stack | Purpose |
|-----|-------|---------|
| **apps/web** | Next.js 15 + Tailwind | Corporate site, admin, portal, academy, AI assistant, PWA |
| **apps/api** | NestJS + Prisma + PostgreSQL | Unified backend |
| **apps/mobile** | Expo / React Native | Field audits with GPS + checklist |
| **packages/shared** | TypeScript | Shared types |

## Feature modules

### 1. Audit checklist (web + mobile)
- Full checklist UI with sections, Yes/No answers, notes
- Auto-scoring from template weights
- Corrective actions (create + status workflow)
- GPS field check-in (mobile + API)
- Admin: `/admin/audits`, `/admin/audits/new`, `/admin/audits/[id]`

### 2. CRM lead management
- Full CRUD for leads/contacts
- Pipeline statuses: lead, qualified, proposal, won, lost
- Stats dashboard
- Admin: `/admin/crm`

### 3. LMS — exams & certificates
- Course player with modules/lessons
- Multiple-choice exams with pass threshold
- Auto certificate issuance on pass
- PDF certificate download (`GET /certificates/:id/pdf`)
- Pages: `/academy/[slug]`, `/academy/[slug]/exam`, `/academy/[slug]/certificate`

### 4. Google Meet live training
- Schedule sessions with auto-generated Meet links
- Upcoming sessions on Academy page
- Admin scheduling: `/admin/academy`
- API: `POST /sessions`, `GET /sessions?upcoming=true`

### 5. AI assistant
- Floating chat widget on all pages
- Full page: `/assistant`
- Knowledge-base fallback + optional OpenAI (`OPENAI_API_KEY`)
- API: `POST /ai/chat`

## API endpoints (new)

| Area | Endpoints |
|------|-----------|
| CRM | `GET/POST /crm`, `PATCH/DELETE /crm/:id`, `GET /crm/stats` |
| Audits | `POST /audits/:id/responses`, `POST /audits/:id/corrective-actions` |
| Exams | `GET /exams/course/:id`, `POST /exams/enroll`, `POST /exams/:id/submit` |
| Certificates | `GET /certificates`, `GET /certificates/:id/pdf` |
| Sessions | `GET/POST /sessions` |
| AI | `POST /ai/chat`, `GET /ai/sessions/:id/messages` |

## Quick start

```bash
npm install
docker compose up -d
copy .env.example .env
copy .env.example apps\api\.env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

- **Website:** http://localhost:3000
- **API:** http://localhost:4000/api/v1
- **Demo login:** `admin@connect.local` / `Admin123!`

## Mobile

```bash
cd apps/mobile
# Set EXPO_PUBLIC_API_URL=http://YOUR_IP:4000 for device testing
npm run dev
```

## Optional environment

```env
OPENAI_API_KEY=sk-...          # Enables GPT-powered AI assistant
GOOGLE_MEET_BASE_URL=https://meet.google.com
```
