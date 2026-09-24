# Outstanding Features

Running list of what's deferred, simplified, or unverified. Updated
every phase — items get checked off or removed as they're resolved,
never silently dropped.

## Phase 1 — Foundation & Design System

- [ ] **No mobile nav.** `SiteHeader`'s primary links are hidden below
      the `lg` breakpoint (1024px) with no hamburger menu to replace
      them — below that, visitors can only reach the logo and the
      Book a Call button, not Work/Services/About/Journal/Contact.
      Needs a client component with a toggle. (Breakpoint moved from
      `md` to `lg` in phase 2 — see Resolved below for why.)
- [ ] **Nav/footer link targets don't exist yet.** `/work`, `/services`,
      `/about`, `/journal`, `/contact`, `/faq`, `/careers`, `/press`,
      `/privacy`, `/terms` all 404 until their respective sprints build
      the pages (Sprints 3–6 per the build plan). Expected, not a bug.
- [ ] **No Vercel project/deployment.** This phase only prepares the
      codebase to be deployed — no live URL exists yet. Creating the
      Vercel project and connecting the repo needs your Vercel account;
      I don't have a way to do that from here.

## Phase 2 — Homepage

- [ ] **Real business contact details still needed.** `src/lib/
      site-config.ts` centralizes email/phone/city/Instagram handle as
      bracketed placeholders (e.g. `[Add studio email]`) — used by the
      footer, CTA banner, and social strip. Fill in real values before
      launch; everything downstream updates from that one file.
- [ ] **Press strip is placeholder.** Naming specific real publications
      before the studio has actually been featured in them would be a
      false claim, so `PressStrip` renders generic `[ Publication ]`
      slots instead. Replace with real outlet wordmarks (or remove the
      section entirely) once there's real press to show.
- [ ] **Testimonial is placeholder.** Bracketed placeholder copy, not a
      fabricated client quote — swap in a real testimonial (or wire to
      the testimonials table once Sprint 5's admin exists) before this
      ships.
- [ ] **Social strip tiles are empty placeholders**, and the Instagram
      handle/link in `site-config.ts` are brackets — same real-content
      dependency as above.
- [ ] **Logo wordmark wraps at the narrowest phones (~320px).** "JADED
      MEDIA" breaks to two lines at an iPhone SE-width viewport. Not
      broken, just not ideal — worth a proper fix alongside the mobile
      nav.

## Phase 3 — Portfolio & Case Studies

- [ ] **⚠️ Migration not applied yet — action needed from you.**
      `supabase/migrations/0001_portfolio.sql` and `0002_seed_d1_autotech.sql`
      exist in the repo but nothing has actually been run against your
      live database. Paste both into the Supabase SQL Editor (in
      order) and run them — until then, `/work` and the homepage
      Featured Work section will show their empty state ("New work is
      on the way"), and the database calls will fail soft with a
      console-logged error rather than crashing the page.
- [ ] **Can't test the live database or R2 video from this sandbox.**
      Both `*.supabase.co` and `*.r2.dev` are blocked by this session's
      network policy (confirmed via the proxy status endpoint, not a
      guess). Typecheck/lint/build all pass, and the code is written
      to fail gracefully, but I have not personally seen `/work` or
      the video player render against real data. Please verify by
      running `npm run dev` locally or checking the Vercel deploy once
      one exists.
- [ ] **No cover image for the D1 Autotech entry yet.** It's
      video-only right now — the homepage/work grid cards show a
      labelled placeholder ("[ Film still ]") instead of a thumbnail
      until a cover image is added. To add one: upload an image to
      Supabase Storage (create a public bucket if you haven't, e.g.
      `portfolio-images`) and update the row's `cover_image_url` in
      the Table Editor — same manual pattern as the R2 video upload,
      no code change needed.
- [ ] **No upload UI yet — everything is manual via each dashboard.**
      Adding a new portfolio entry today means: upload media to R2
      (video) or Supabase Storage (images) by hand, then add/edit the
      row in Supabase's Table Editor. Sprint 5 builds a real admin UI
      for this; until then it's a two-dashboard, no-code-change
      workflow.
- [ ] **`SUPABASE_SERVICE_ROLE_KEY` still not set.** Not needed for
      anything built so far (all reads go through the anon key +
      RLS) — only becomes necessary for Sprint 5's admin dashboard.
- [ ] **R2 image/video domains are hardcoded to `*.r2.dev` in
      `next.config.ts`.** If you switch the bucket to a custom domain
      later, that remotePatterns entry needs updating or `next/image`
      will refuse to load from it (videos aren't affected — the native
      `<video>` element doesn't have this restriction).

## Resolved

- [x] **Real logo asset.** Added at `public/logo.png` (a 5834x5834 PNG,
      no alpha channel) and wired into `site-header.tsx` and
      `site-footer.tsx` via `next/image`, replacing the "JM" text
      placeholder. Served inside a paper-colored badge, so a non-
      transparent white background blends in without a visible seam.
- [x] **Homepage placeholder replaced.** All nine sections from the
      approved mockup are built and composed in `src/app/page.tsx`.
- [x] **Footer contact details centralized.** Moved from inline
      placeholders into `src/lib/site-config.ts`, shared with the new
      CTA banner and social strip.
- [x] **Header overflow bug at 768–1023px.** Caught during a Playwright
      visual QA pass (screenshots at 320–1920px + a horizontal-overflow
      check at each width): the full nav appeared at the `md` (768px)
      breakpoint but didn't actually fit until `lg` (1024px), causing
      the logo, nav links, and Book a Call button to wrap and collide.
      Moved the nav's breakpoint to `lg` and made the Book a Call
      button `whitespace-nowrap` so it never wraps. Verified clean
      (zero horizontal overflow) at 320/375/390/640/768/820/1024/1280/
      1440/1920px.
- [x] **Press strip overflow bug at exactly 768px.** The placeholder
      chips used a non-wrapping flex row (`sm:flex sm:justify-between`)
      that didn't fit at that width. Changed to `flex-wrap`, which
      degrades gracefully at any width instead of relying on one exact
      breakpoint fitting.
- [x] **Real Supabase project connected.** URL + anon key are in
      `.env.local` (gitignored). Service-role key still pending — see
      Phase 3 above.
- [x] **Featured Work grid wired to real data.** No longer five
      hardcoded sample entries — `FeaturedWork` now queries Supabase
      for featured+published portfolio items and lays them out based
      on however many actually exist (honest empty state at zero).
- [x] **First real portfolio entry added.** "D1 Autotech × Exclusivo"
      — an automotive film hosted on Cloudflare R2, seeded via
      `0002_seed_d1_autotech.sql` (pending the migration actually being
      run — see the ⚠️ item in Phase 3).
