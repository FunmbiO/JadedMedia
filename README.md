# Jaded Media

Marketing site and content admin for Jaded Media — Olufunmbi Olajubu's
photography & videography work, covering weddings, automotive, and
business/brand shoots.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, brand tokens in `src/app/globals.css`
- **Fonts:** Fraunces (display) + Manrope (body/UI) via `next/font`
- **Backend:** Supabase (Postgres + Auth + Storage) — client helpers in
  `src/lib/supabase/`
- **Hosting (planned):** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project's values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | What it does                        |
| -------------------- | ------------------------------------ |
| `npm run dev`         | Local dev server                     |
| `npm run build`       | Production build                     |
| `npm run start`       | Serve the production build           |
| `npm run lint`        | ESLint                               |
| `npm run typecheck`   | `tsc --noEmit`, no build output      |

## Environment variables

See `.env.example`. All three are Supabase project values from
Project Settings > API. `SUPABASE_SERVICE_ROLE_KEY` is server-only —
never expose it to the browser or commit it.

## Project status

This repo is being built in phases (`phase-N-*` branches). See
`OUTSTANDING_FEATURES.md` for what's deferred, simplified, or still
needs real credentials/content before it works end to end.
