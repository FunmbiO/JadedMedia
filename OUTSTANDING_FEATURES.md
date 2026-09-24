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
- [ ] **Some footer links still 404.** `/journal`, `/faq`, `/press`,
      `/privacy`, `/terms` — none were in the original build plan as
      their own pages; decide if/when any of these are worth building,
      or drop the links. (`/careers` was removed in phase 7 — doesn't
      make sense for a one-person business.)
- [ ] **No Vercel project/deployment.** This phase only prepares the
      codebase to be deployed — no live URL exists yet. Creating the
      Vercel project and connecting the repo needs your Vercel account;
      I don't have a way to do that from here.

## Phase 2 — Homepage

- [ ] **Press strip is placeholder.** Naming specific real publications
      before Jaded Media has actually been featured in them would be a
      false claim, so `PressStrip` renders generic `[ Publication ]`
      slots instead. Replace with real outlet wordmarks (or remove the
      section entirely) once there's real press to show. (Kept as a
      placeholder deliberately as of phase 7 — you asked to keep this
      one.)
- [ ] **Testimonial is placeholder.** Bracketed placeholder copy, not a
      fabricated client quote — swap in a real testimonial (or wire to
      the testimonials table once Sprint 5's admin exists) before this
      ships. (Kept as a placeholder deliberately as of phase 7 — you
      asked to keep this one too.)
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
- [ ] **Single presigned PUT, not chunked multipart.** A dropped
      connection mid-upload means starting that file over, not
      resuming. Deliberate simplification given realistic file sizes
      here — revisit if it becomes a real problem.

## Phase 5 — Services, About & Contact/Booking

- [ ] **⚠️ Migration 0006 not applied yet — action needed from you.**
      `supabase/migrations/0006_leads.sql` exists in the repo but
      hasn't been run. Until it is, the contact form's Server Action
      will return a database error on submit instead of saving the
      lead.
- [ ] **⚠️ Resend not configured.** `RESEND_API_KEY`,
      `RESEND_FROM_EMAIL`, and `STUDIO_NOTIFICATION_EMAIL` are all
      blank in `.env.local`. The contact form still saves every lead
      to the database regardless, but no confirmation or notification
      email will send until these are filled in. `RESEND_FROM_EMAIL`
      needs a domain Resend can verify — their shared
      `onboarding@resend.dev` works for testing without any DNS setup,
      but a real address like `hello@jadedmedia.ca` needs your domain
      verified in Resend (a separate DNS step, best done once the
      Namecheap/Vercel DNS work has settled).
- [ ] **No public pricing on `/services`.** Every service ends in
      "Get a Custom Quote" rather than listed price tiers — a real
      business decision I didn't make on your behalf. Say the word if
      you want actual prices public.
- [ ] **⚠️ `/about` founder photo missing — action needed from you.**
      The bio section now renders your real copy next to an `<Image>`
      pointed at `public/founder.jpg`, but that file doesn't exist in
      the repo yet, so it'll show as a broken image until you add one.
      Drop a photo in at `public/founder.jpg` (same way `logo.png` got
      added) — replacing that file any time swaps the photo, no code
      change needed.
- [ ] **Can't test the contact form or emails live from this
      sandbox.** Same `*.supabase.co` network block as everything
      else. Please submit a real test inquiry once 0006 is applied,
      and check both the `leads` table and (once Resend is
      configured) that both emails actually arrive.
- [ ] **No admin UI to view/manage leads yet.** The `leads` table and
      its RLS policies support it (authenticated can SELECT/UPDATE),
      but there's no `/admin/leads` page — submissions are only
      visible via the Supabase Table Editor for now.

## Phase 6 — Services Admin CMS

- [ ] **⚠️ Migrations 0007 and 0008 not applied yet — action needed
      from you.** `supabase/migrations/0007_services.sql` (table + RLS)
      and `0008_seed_services.sql` (backfills the three existing
      services) exist in the repo but haven't been run. Until they are,
      `/services` and the homepage teaser will both show their empty
      state instead of your services, and the admin's Services tab
      will show nothing to manage.
- [ ] **Per-service custom icons were dropped.** Each service used to
      have its own hand-drawn SVG icon; those can't reasonably be
      edited from a text-only admin form, so every service now shares
      one generic camera icon instead. If you want distinct icons back
      per service, that'd need a small fixed icon picker (a dropdown of
      a few preset icons) — say the word.
- [ ] **No pricing field.** Services CRUD covers title, slug,
      description, the bullet list, display order, and
      published/draft — matching the earlier decision not to make
      pricing public yet. If that changes, a price field is a small
      add.
- [ ] **Can't test the admin services flow live from this sandbox.**
      Same `*.supabase.co` network block as every other admin feature.
      Please run through it yourself once 0007/0008 are applied:
      create a service, edit one, delete one, toggle published/draft,
      and confirm both `/services` and the homepage teaser update.

## Phase 7 — Solo Brand Voice & Real Contact Info

- [ ] **Internal "studio" naming left as-is on purpose.** The Resend
      env var `STUDIO_NOTIFICATION_EMAIL` and a few internal
      function/variable names in `src/lib/email/` (`studioNotificationEmail`,
      `studioEmail`) still say "studio" — none of that is visible
      anywhere on the site or in the emails themselves (the subject
      and body text were fixed), so I left the naming alone rather
      than rename an env var you'd have to update in both
      `.env.local` and Vercel for zero visible benefit. Say the word
      if you want it renamed anyway.
- [ ] **No specific city given.** `SITE_CONFIG.city` reads "New
      Brunswick, Canada" since that's what you gave me — send a
      specific city/town if you'd rather show that instead.

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
- [x] **Real contact info filled in.** `SITE_CONFIG` now has your
      real email, phone, and location instead of bracketed
      placeholders — the footer, CTA banner, and contact page all pull
      from it.
- [x] **Social strip removed.** It was 100% placeholder (grey tiles, a
      `[@yourhandle]` link to nowhere) with no real Instagram account
      to connect — deleted rather than left as a placeholder.
- [x] **`/about` placeholder stats removed.** The three `[Add ...]`
      stat boxes never had real numbers to put in and weren't on the
      keep list — removed rather than left as brackets.
- [x] **Site copy rewritten for a solo operator.** "Studio," "we,"
      "our," and "team"-flavored language removed from every
      user-facing page (home, about, services, contact, footer,
      header, confirmation emails) in favor of first-person singular —
      Jaded Media is explicitly one person, not a studio with staff.
      Press strip and testimonial placeholders were kept as-is at your
      request.
- [x] **Homepage Philosophy section's placeholder image replaced**
      with the same real founder photo used on `/about`
      (`public/founder.jpg`) instead of a "[ Studio / behind-the-scenes
      photo ]" placeholder box.
