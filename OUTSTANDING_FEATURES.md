# Outstanding Features

Running list of what's deferred, simplified, or unverified. Updated
every phase — items get checked off or removed as they're resolved,
never silently dropped.

## Phase 1 — Foundation & Design System

- [ ] **No mobile nav.** `SiteHeader`'s primary links are hidden below
      the `lg` breakpoint (1024px) with no hamburger menu to replace
      them — below that, visitors can only reach the logo and the
      Book a Call button, not Work/Services/About/Contact.
      Needs a client component with a toggle. (Breakpoint moved from
      `md` to `lg` in phase 2 — see Resolved below for why.)
- [ ] **Some footer links still 404.** `/faq`, `/press`, `/privacy`,
      `/terms` — none were in the original build plan as their own
      pages; decide if/when any of these are worth building, or drop
      the links. (`/careers` was removed in phase 7 — doesn't make
      sense for a one-person business. `/journal` was removed in
      phase 8 at your request — say the word if you want it back once
      there's something to put there.)
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
- [x] **Resend now configured** (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
      `JADEDMEDIA_TEAM_EMAIL` — renamed from `STUDIO_NOTIFICATION_EMAIL`
      in phase 8). Using `onboarding@resend.dev` as the sending address
      for now, which works without any domain verification; switch to
      a real address like `hello@jadedmedia.ca` once that domain is
      verified in Resend. See Phase 8 for the current email-sending
      status — a real bug there is now fixed, still confirming it
      sends end to end.
- [ ] **No public pricing on `/services`.** Every service ends in
      "Get a Custom Quote" rather than listed price tiers — a real
      business decision I didn't make on your behalf. Say the word if
      you want actual prices public.
- [x] **`/about` founder photo added.** Lives at `public/founder.avif`
      (you uploaded it in phase 8, originally as `Founder.avif` then
      renamed to `.jpg` — I renamed it back to `.avif` since the file
      is genuinely AVIF-encoded and the `.jpg` extension didn't match
      the actual bytes, plus fixed the casing: Vercel runs Linux, and
      a case mismatch between `Founder.jpg` and the code's lowercase
      `/founder.jpg` reference would have 404'd in production even
      though it worked fine locally). Swap the photo any time by
      replacing that same file — no code change needed.
- [ ] **Can't test the contact form or emails live from this
      sandbox.** Same `*.supabase.co` network block as everything
      else. Please submit a real test inquiry once 0006 is applied,
      and check both the `leads` table and (once Resend is
      configured) that both emails actually arrive.

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

- [x] **Internal "studio" naming — renamed in phase 8.** Left alone
      here on purpose at the time (an env var you'd have had to update
      in two places for zero visible benefit), but you independently
      set `JADEDMEDIA_TEAM_EMAIL` while configuring Resend rather than
      `STUDIO_NOTIFICATION_EMAIL`, so the code was renamed to match
      instead of asking you to change what you'd already set.
- [ ] **No specific city given.** `SITE_CONFIG.city` reads "New
      Brunswick, Canada" since that's what you gave me — send a
      specific city/town if you'd rather show that instead.

## Phase 8 — Quote Requests, Leads Admin & Instagram

- [ ] **⚠️ Migration 0009 not applied yet — action needed from you.**
      `supabase/migrations/0009_lead_service_link.sql` adds `service_id`
      and `source` columns to `leads`. Until it's run, submitting a
      quote request from `/services` will fail with a database error
      (the insert references columns that don't exist yet).
- [ ] **No Instagram feed embed.** The social strip's photo tiles are
      still generic grey squares, not real posts pulled from
      @jaded.medias — that needs Instagram's Graph API and an OAuth
      connection I don't have a way to set up from here. The handle
      and follow link are real; the tiles are decorative only.
- [x] **All four transactional emails redesigned.** Logo + "JADED
      MEDIA / PHOTO & FILM" wordmark header, a gold accent bar, an
      eyebrow label above each heading, cleaner divided rows for the
      details, and a proper footer (contact info + copyright) instead
      of a plain "— Jaded Media" sign-off line. Shared chrome lives in
      one `emailShell()` helper in `templates.ts` instead of being
      duplicated across all four templates. Verified by rendering a
      static copy and screenshotting it with Playwright — I can't send
      a real email from this sandbox, but the actual HTML is what
      ships.
- [ ] **Logo in emails loads full-size (541KB) and gets scaled down to
      40×40 by the `<img>` tag**, not actually resized — fine, just
      not optimal for inbox load time. A dedicated small logo asset
      (e.g. `logo-email.png` at ~200×200) would be a quick follow-up
      if you want it. `SITE_CONFIG.siteUrl` (now `https://jadedmedia.ca`)
      is what builds the logo's absolute URL — update that if the
      domain ever changes.
- [ ] **Can't test the quote-request flow or admin Leads view live
      from this sandbox.** Same `*.supabase.co` network block as
      everything else. Once 0009 is applied, please submit a real
      quote request from `/services`, confirm it shows up in
      `/admin/leads` tagged "Quote Request" with the right service,
      and check that both emails arrive.
- [ ] **Quote-popup leads don't collect an event date or budget
      range** — just name, email, phone, and free-text details. The
      main `/contact` form still asks for those; the popup is meant to
      be faster/lighter. Say the word if you want those fields there
      too.
- [x] **Bug found and fixed: Resend API errors were silently
      swallowed.** Both email dispatchers only treated a *rejected*
      promise as a failure, but the Resend SDK doesn't reject on an
      API-level error (unverified domain, bad `from` address, bad API
      key) — it resolves with `{ data: null, error: {...} }` instead.
      That error was never checked, so a real send failure produced
      no log anywhere, app-side or otherwise. Fixed in both
      `send-lead-notifications.ts` and
      `send-quote-request-notifications.ts` to check and log that
      case too.
- [x] **Second bug found: env var name mismatch.** While debugging
      the above with you, it turned out you'd set `JADEDMEDIA_TEAM_EMAIL`
      but the code was still reading `STUDIO_NOTIFICATION_EMAIL` —
      different name, so the app saw it as unset and silently skipped
      sending entirely (the early-exit check, separate from the
      swallowed-error bug above). Renamed the code to
      `JADEDMEDIA_TEAM_EMAIL` to match what you'd already set, rather
      than asking you to rename it again.
- [ ] **⚠️ Action needed from you: confirm both env vars actually
      reach the running app.** You mentioned testing on localhost —
      make sure your local `.env.local` has all three
      (`RESEND_API_KEY`, `RESEND_FROM_EMAIL=onboarding@resend.dev`,
      `JADEDMEDIA_TEAM_EMAIL=funmbiolajubu@gmail.com`) with the
      renamed variable, and restart `npm run dev` after editing it —
      it only reads env vars at startup. If it still doesn't send,
      check your terminal output right after submitting the form for
      a line starting `Lead notification email (...) failed:` or
      `Quote request notification email (...) failed:` — that'll show
      Resend's exact rejection reason now that it's actually logged.
      Once this works locally, the same three vars need to be set on
      **Vercel's Production environment** too before it'll work on the
      live site — Vercel never reads your local `.env.local`.

## Phase 9 — Client-Ready Polish

*(This phase had real Vercel and Supabase access for the first time —
not just guessing what's live, I could actually check it. Every claim
below is verified against your real project, not assumed.)*

- [ ] **⚠️ Being #1 on Google for "Jaded Media" isn't something I can
      guarantee — nobody honestly can.** Ranking depends on Google's
      own algorithm, competition, backlinks, and time, none of which a
      developer controls directly. What I *did* do: proper page
      titles/descriptions, Open Graph + Twitter preview cards, a
      `ProfessionalService` structured-data block naming you as
      founder (helps Google understand "Jaded Media" as a specific
      local business, not just text), a sitemap, and a robots.txt.
      Lighthouse's SEO score is 100/100 — the technical side is as
      solid as it gets. Two things worth doing on your end: (1) submit
      the site to [Google Search Console](https://search.google.com/search-console)
      once you're ready (verify `www.jadedmedia.ca`, submit
      `/sitemap.xml`) — this is what actually gets Google to notice
      and crawl a new site quickly, and I can't do it myself since it
      needs your Google account; (2) claim a
      [Google Business Profile](https://business.google.com) for
      Jaded Media — for a "business name" search like this, a Business
      Profile often outranks the website itself and is one of the
      biggest levers you personally control.
- [ ] **No dedicated social-share image.** Open Graph/Twitter cards
      fall back to `logo.png` (a square product shot, not designed for
      the 1200×630 landscape crop social platforms use) since no
      dedicated share image exists yet. Looks fine, not ideal — a real
      one would show better when the site gets shared or linked.
- [ ] **Leaked password protection is off in Supabase Auth.** Confirmed
      via advisor check — this is a dashboard toggle (Authentication →
      Policies → Password Security), not something fixable via SQL
      migration. Two clicks, checks new admin passwords against
      HaveIBeenPwned. Worth doing since it's free.

## Phase 10 — Copy Simplify

*(A full pass rewriting site copy that read as AI-generated — heavy
"isn't X, it's Y" rhetorical contrast, words like "actually" and
"real," and phrases like "cinematic stories, crafted with intention"
— into plainer, shorter, more direct wording. Your own words on
`/about` — the bio paragraphs and the Philosophy quote — were left
untouched since they're already yours, not mine.)*

- [x] **Rewrote copy across the homepage, About, Services, and Contact
      pages**: hero headline and intro, Philosophy's supporting
      paragraph, all four Process steps, the CTA banner, the Services
      teaser, About's intro line and three value descriptions, the
      Services page intro, the Contact page heading, the footer
      tagline, and the social strip label. Also updated the root
      layout's meta description and the Services page's meta
      description — same "crafted with intention" style phrase was
      sitting there too.
- [x] **Simplified the three service descriptions stored in the
      database** (Weddings/Automotive/Business & Brand) — these are
      admin-editable now, so a code change alone wouldn't have touched
      what's actually live. Updated directly via Supabase MCP and
      verified with a follow-up query; migration 0011 keeps the repo's
      history matching what's live, same as every other data change
      here.
- [x] **All bracket placeholders restyled to a plain `[add -- later]`
      format** — testimonial quote/name/client type, the work-detail
      page's cover image and story fallbacks, the press strip's
      publication slots, and the hero's background-video placeholder
      (this one was still using the old wordier style and had been
      missed until now).
- [x] **Verified visually, not just by reading the diff.** Screenshotted
      the homepage, About, Services, and Contact pages against a clean
      rebuild after a stale local server initially served pre-edit
      copy (caught by comparing rendered text against what was just
      written, not assumed correct).

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
- [x] **Social strip removed, then restored in phase 8** once you gave
      me the real handle (@jaded.medias). It was 100% placeholder
      (grey tiles, a `[@yourhandle]` link to nowhere) with no real
      Instagram account to connect at the time, so it was deleted
      rather than left as a placeholder — the tiles are still generic
      squares (no real feed embed), but the handle and link are real.
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
      (`public/founder.avif`) instead of a "[ Studio / behind-the-scenes
      photo ]" placeholder box.
- [x] **"Get a Custom Quote" now opens a popup instead of linking to
      `/contact`.** Each service card's button opens a modal showing
      that service's own description and bullet list next to a
      name/email/phone/details form. Submitting saves a `leads` row
      tagged to that service (`service_id` + `source = 'quote_popup'`,
      via migration 0009) and fires a styled "Consultation received"
      confirmation to the client plus a notification to the business
      inbox — see Phase 8.
- [x] **Admin Leads view built.** `/admin/leads` lists every lead
      (contact-form submissions and quote-popup requests alike),
      badged by source, with the tied service or event type, and an
      inline status dropdown (new/contacted/booked/closed).
- [x] **Confirmed live: all 9 migrations are actually applied.** Direct
      Supabase access this phase let me check for real instead of
      asking — `portfolio_items` (5 rows), `services` (3 rows), and
      `leads` (5 rows, meaning real inquiries have already come in)
      all exist with the right columns, including 0009's `service_id`/
      `source` on `leads`. `list_migrations` itself shows empty since
      these were run by hand in the SQL Editor rather than through the
      Supabase CLI's migration tracking — that's just bookkeeping, the
      schema itself is confirmed correct.
- [x] **Favicon and app icons set from the real logo** (`icon.png`,
      `apple-icon.png`, `favicon.ico`, generated from `public/logo.png`
      via sharp — see the phase 9 commits for how the `.ico` was
      hand-built since sharp doesn't write that format directly).
- [x] **SEO fundamentals added**: Open Graph + Twitter card metadata,
      a `ProfessionalService` JSON-LD block, `/sitemap.xml`,
      `/robots.txt`, and `metadataBase` pointed at the canonical
      `www.jadedmedia.ca` (confirmed via Vercel's own domain config —
      `jadedmedia.ca` redirects to `www`, not the other way around).
      Lighthouse SEO score: 100/100.
- [x] **Bug found and fixed: `/robots.txt` and `/sitemap.xml` were
      404ing.** The auth middleware's matcher didn't exclude them, and
      running the Supabase session-refresh logic on those routes broke
      them — confirmed by testing every route after a clean rebuild
      (not assuming a first fix worked), narrowing it down to exactly
      those two, and fixing the matcher. Both work correctly now.
- [x] **Supabase advisor findings fixed on the live database** (via
      Supabase MCP, confirmed clean with a follow-up advisor check):
      added the missing index on `leads.service_id`, pinned
      `search_path` on the `set_updated_at()` trigger function, and
      removed a redundant permissive RLS policy overlap on
      `portfolio_items`/`services`. Migration 0010 keeps the repo's
      schema history matching what's live.
- [x] **Real Lighthouse audit run against the production build** —
      not guessed. Before: Performance 95, Accessibility 95, Best
      Practices 100, SEO 100. Found genuine WCAG contrast failures
      (press strip labels, footer copyright/links, the Philosophy
      "eyebrow" label, testimonial attribution, Process section's
      decorative step numerals) and fixed all of them — two shared
      design tokens darkened (`--color-sage`, `--color-muted-on-paper`,
      safe since both are only ever used as text-on-light-background)
      plus a few component-level opacity bumps. Re-run after fixes:
      **Accessibility 100**, Performance 94, Best Practices 100, SEO
      100. This measures the actual code (bundle size, render
      performance, real accessibility tree) against a local production
      server — it can't measure real-world network latency from a
      visitor's actual location to Vercel's edge, since this sandbox
      can't reach the live domain at all. Worth a real PageSpeed
      Insights run against `https://www.jadedmedia.ca` once you have a
      minute, just to confirm the edge/CDN side looks as good as the
      code does.
