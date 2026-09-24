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
- [ ] **R2 image/video domains are hardcoded to `*.r2.dev` in
      `next.config.ts`.** If you switch the bucket to a custom domain
      later, that remotePatterns entry needs updating or `next/image`
      will refuse to load from it (videos aren't affected — the native
      `<video>` element doesn't have this restriction).

## Phase 4 — Admin & Content CMS

*(Pulled forward from the original plan's Sprint 5 — you asked for it
now rather than after Services/About/Contact, so those are pushed
back a phase.)*

- [ ] **⚠️ Migration 0005 not applied yet — action needed from you.**
      `supabase/migrations/0005_admin_write_policies.sql` exists in
      the repo but hasn't been run. Without it, logging into `/admin`
      works, but every create/edit/delete/upload will fail with an RLS
      permission error. Paste it into the Supabase SQL Editor and run
      it (after 0001–0004, which you've already applied).
- [ ] **⚠️ Admin login user — confirm you've created it.** I asked for
      this while building in parallel (Supabase dashboard →
      Authentication → Users → Add user). If you haven't yet, `/admin`
      has nothing to log into.
- [ ] **Can't test the admin flow live from this sandbox.** Same
      `*.supabase.co` network block as before — I have not personally
      logged in, created an entry, uploaded an image, or deleted
      anything against your real project. Typecheck/lint/build pass,
      but please run through the whole flow yourself (login → new
      entry → upload a photo → edit → delete) before trusting it.
- [ ] **No password reset flow.** If you forget your admin password,
      recovery is via the Supabase dashboard (Authentication → Users →
      reset), not through the site itself.
- [ ] **Deleting an item, or removing an image in the form, doesn't
      delete the underlying file from Storage.** The database row (or
      that gallery entry) is gone, but the image file stays in the
      `Portfolio Images` bucket. Low cost at your current scale (a
      handful of images), but worth a cleanup pass eventually.
- [ ] **Slug conflicts surface as a raw Postgres error.** Creating an
      entry with a slug that already exists fails with the database's
      own error message in the error banner, not a friendly
      "that slug is taken" message.
- [ ] **No pagination on `/admin`.** Fine at a handful of entries,
      will need it eventually.
- [ ] **⚠️ Video upload untested end to end.** `.env.local` now has
      real R2 credentials (Account ID, Access Key, bucket name), but
      the bucket's CORS policy needs to be enabled before a browser
      upload will succeed (instructions given separately) — and I
      can't test any of it myself, same network block as everything
      else Supabase/R2. Please try uploading a real video from
      `/admin/portfolio/new` once the migration is run and your login
      exists.
- [ ] **Single presigned PUT, not chunked multipart.** A dropped
      connection mid-upload means starting that file over, not
      resuming. Deliberate simplification given realistic file sizes
      here — revisit if it becomes a real problem.

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
      `.env.local` (gitignored). Turns out the service-role key was
      never needed — see below.
- [x] **Featured Work grid wired to real data.** No longer five
      hardcoded sample entries — `FeaturedWork` now queries Supabase
      for featured+published portfolio items and lays them out based
      on however many actually exist (honest empty state at zero).
- [x] **First real portfolio entry added.** "D1 Autotech × Exclusivo"
      — an automotive film hosted on Cloudflare R2, seeded via
      `0002_seed_d1_autotech.sql` (pending the migration actually being
      run — see the ⚠️ item in Phase 3).
- [x] **D1 Autotech cover image + second entry added.** Cover image
      set via `0003`; "Professional Headshots" (business/photo, 1
      cover + 3-photo gallery) added via `0004`.
- [x] **Video-player sizing fixed.** Was full-bleed edge-to-edge; now
      capped at `max-w-[1100px]`, centered, rounded corners.
- [x] **Back-to-Home link added on `/work`.**
- [x] **Admin CMS built.** Login (Supabase Auth), `/admin` dashboard
      (list/edit/delete), create/edit form, and direct-to-Storage image
      upload for cover + gallery images — see Phase 4. Manual
      dashboard uploads are no longer needed for photos; only video
      stays manual (R2 + paste URL), by your explicit choice.
- [x] **`SUPABASE_SERVICE_ROLE_KEY` turned out not to be needed at
      all.** The admin uses authenticated-role RLS policies (0005)
      instead of a service-role key — no god-mode key anywhere in the
      deployed app. That env var line can stay empty permanently
      unless a future feature genuinely needs to bypass RLS.
