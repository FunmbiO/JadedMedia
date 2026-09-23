# Outstanding Features

Running list of what's deferred, simplified, or unverified. Updated
every phase — items get checked off or removed as they're resolved,
never silently dropped.

## Phase 1 — Foundation & Design System

- [ ] **No mobile nav.** `SiteHeader`'s primary links are hidden below
      the `md` breakpoint (`hidden md:flex`) with no hamburger menu to
      replace them — mobile visitors currently can't reach Work/
      Services/About/Journal/Contact from the nav, only the logo and
      the Book a Call button. Needs a client component with a toggle.
- [ ] **Nav/footer link targets don't exist yet.** `/work`, `/services`,
      `/about`, `/journal`, `/contact`, `/faq`, `/careers`, `/press`,
      `/privacy`, `/terms` all 404 until their respective sprints build
      the pages (Sprints 3–6 per the build plan). Expected, not a bug.
- [ ] **Footer contact details are placeholders.** Email, phone, and
      city in the footer are bracketed placeholders (`[Add studio
      email]` etc.) — need the real business details before this ships.
- [ ] **No real Supabase project.** `src/lib/supabase/*.ts` are wired
      up but will throw at runtime (`process.env...!` on an undefined
      var) until a real Supabase project exists and
      `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
      `SUPABASE_SERVICE_ROLE_KEY` are set in `.env.local`. No database
      schema exists yet either — that starts in Sprint 3 (portfolio
      table).
- [ ] **No Vercel project/deployment.** This phase only prepares the
      codebase to be deployed — no live URL exists yet. Creating the
      Vercel project and connecting the repo needs your Vercel account;
      I don't have a way to do that from here.
- [ ] **Homepage is a placeholder.** `src/app/page.tsx` is a one-screen
      "foundation phase" placeholder, not the real homepage — that's
      Sprint 2's work per the build plan.

## Resolved

- [x] **Real logo asset.** Added at `public/logo.png` (a 5834x5834 PNG,
      no alpha channel) and wired into `site-header.tsx` and
      `site-footer.tsx` via `next/image`, replacing the "JM" text
      placeholder. Served inside a paper-colored badge, so a non-
      transparent white background blends in without a visible seam.
