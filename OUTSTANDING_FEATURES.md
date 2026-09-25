# Outstanding Features

Running list of what's deferred, simplified, or unverified. Updated
every phase — items get checked off or removed as they're resolved,
never silently dropped.

## Phase 1 — Foundation & Design System

- [x] **`/faq` built with real content.** Eight questions grounded only
      in what's already established on the site (services, quote-based
      pricing, Moncton + travel, the booking flow) — nothing invented.
      Native `<details>/<summary>` accordion, no JS needed. Added to
      the sitemap.
- [x] **`/privacy` and `/terms` are real pages now, not 404s** — each a
      simple "Coming soon" placeholder, at your request, rather than me
      drafting actual legal text on my own judgment (that's real
      liability for your business, not boilerplate to guess at).
      Deliberately left out of the sitemap until there's real content.
      **Still needs you eventually:** the actual privacy policy and
      terms text, whenever you're ready for that.
- [ ] **`/press` still 404s.** Not part of this round — say the word
      if you want it built or the footer link dropped. (`/careers` was
      removed in phase 7 — doesn't make sense for a one-person
      business. `/journal` was removed in phase 8 at your request.)
- [x] **Vercel project live.** Confirmed directly via the Vercel API —
      project `jaded-media` has a `READY` production deployment on
      `main`, not just assumed from the repo existing.

## Phase 2 — Homepage

- [ ] **Testimonial is still a placeholder — deliberately last in
      line.** You've said build it last, so it's staying a placeholder
      on purpose, not stalled. Whenever you're ready: a real quote (and
      who it's from), and it's a quick swap.

## Phase 3 — Portfolio & Case Studies

- [x] **R2 video playback confirmed working.** You checked the D1
      Autotech project page directly (this sandbox still can't reach
      `*.r2.dev` to verify it itself) — the video player renders and
      plays correctly against the live R2-hosted file.
- [x] **R2 image/video domains no longer force a code change if the
      bucket moves.** `next.config.ts` still defaults to `*.r2.dev`,
      but now also reads an optional `R2_PUBLIC_HOSTNAME` env var and
      adds it to `remotePatterns` if set — so switching to a custom R2
      domain later is an env var + redeploy, not a code edit.

## Phase 4 — Admin & Content CMS

*(Pulled forward from the original plan's Sprint 5 — you asked for it
now rather than after Services/About/Contact, so those are pushed
back a phase.)*

- [x] **Password reset flow built.** "Forgot password?" on `/admin/login`
      → `/admin/forgot-password` (requests a reset email via Supabase
      Auth) → the emailed link lands on `/admin/auth/confirm` (a route
      handler that exchanges the token for a real session) → redirects
      to `/admin/reset-password` to set a new one. The middleware gate
      now recognizes all three as reachable without an existing
      session — that's the whole point of the flow. The request step
      always shows "check your inbox," whether or not the email has an
      account, so it can't be used to probe for valid admin addresses —
      but does log a failure server-side (`console.error`) rather than
      swallowing it silently, since that's the exact bug already found
      and fixed in the Resend integration (Phase 8). **Can't fully
      verify from here**: this sandbox can't reach `*.supabase.co` (confirmed
      directly — the request failed with "Host not in allowlist," not
      assumed), so I couldn't watch a real reset email arrive or click
      through it myself. Please run it once for real: request a reset,
      open the email, set a new password, confirm you can log in with it.
- [x] **Pagination added to `/admin` and `/admin/leads`.** 20 per page,
      `?page=` in the URL, Prev/Next controls, total count shown.
      Skipped `/admin/services` on purpose — it's a fixed, curated list
      of offerings (3 rows), not something that grows toward needing
      pages the way portfolio entries or leads do.
- [ ] **Single presigned PUT, not chunked multipart — left as is,
      not attempting without you asking.** A dropped connection
      mid-upload means starting that file over, not resuming. Building
      real resumable/chunked upload is a genuine feature addition (S3
      multipart initiation, chunking, resume logic), not a bug fix, and
      the existing note says to revisit only "if it becomes a real
      problem" — none has been reported. Say the word if you want it
      built anyway.
- [x] **Removing an image from the edit form now cleans up Storage
      too.** Extends the same cleanup from a full item delete: saving
      an edit now diffs the previous cover/gallery URLs against the
      submitted ones and removes whatever was dropped — covers both a
      swapped-out cover image and a removed gallery photo, not just the
      narrower gallery-only case this was originally scoped as.

## Phase 5 — Services, About & Contact/Booking

- [x] **Resend now configured** (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
      `JADEDMEDIA_TEAM_EMAIL` — renamed from `STUDIO_NOTIFICATION_EMAIL`
      in phase 8). Using `onboarding@resend.dev` as the sending address
      for now, which works without any domain verification; switch to
      a real address like `hello@jadedmedia.ca` once that domain is
      verified in Resend. See Phase 8 for the current email-sending
      status — a real bug there is now fixed, still confirming it
      sends end to end.
- [ ] **No public pricing on `/services` — deferred, not blocked.**
      Every service still ends in "Get a Custom Quote." You've said to
      save this for later; whenever you're ready, send real numbers (or
      ranges) per service and it's a quick add (see Phase 6's matching
      item for the admin-form side of it).
- [x] **`/about` founder photo added.** Lives at `public/founder.avif`
      (you uploaded it in phase 8, originally as `Founder.avif` then
      renamed to `.jpg` — I renamed it back to `.avif` since the file
      is genuinely AVIF-encoded and the `.jpg` extension didn't match
      the actual bytes, plus fixed the casing: Vercel runs Linux, and
      a case mismatch between `Founder.jpg` and the code's lowercase
      `/founder.jpg` reference would have 404'd in production even
      though it worked fine locally). Swap the photo any time by
      replacing that same file — no code change needed.

## Phase 6 — Services Admin CMS

- [ ] **Per-service custom icons — not building speculatively.** Every
      service shares one generic camera icon since the admin form is
      text-only. A small preset icon picker (a dropdown of a few fixed
      options) is a genuine, scoped feature — deliberately not adding
      UI you haven't asked for. Say the word and I'll build it.
- [ ] **No pricing field — deferred along with Phase 5's pricing
      decision.** Same thing: whenever you're ready, send real prices
      and I'll add the field and wire it up in one pass.

## Phase 7 — Solo Brand Voice & Real Contact Info

- [x] **Internal "studio" naming — renamed in phase 8.** Left alone
      here on purpose at the time (an env var you'd have had to update
      in two places for zero visible benefit), but you independently
      set `JADEDMEDIA_TEAM_EMAIL` while configuring Resend rather than
      `STUDIO_NOTIFICATION_EMAIL`, so the code was renamed to match
      instead of asking you to change what you'd already set.
- [x] **Real city set: Moncton.** `SITE_CONFIG.city` and `travelNote`
      now read "Moncton, New Brunswick" instead of the generic
      province-only placeholder — shows up in the footer, contact page,
      and the new FAQ. Also added `addressLocality: "Moncton"` to the
      homepage's `ProfessionalService` JSON-LD (was missing entirely,
      only had province + country) and "wedding photographer Moncton" /
      "videographer Moncton New Brunswick" to the page's SEO keywords —
      a real town name is worth more for local search than the province
      alone.

## Phase 8 — Quote Requests, Leads Admin & Instagram

- [x] **Instagram feed grid scrapped, not worth the Meta setup.** The
      photo-tile grid (generic grey squares needing real Graph API
      posts) is gone from `SocialStrip` — not worth the Meta
      app/OAuth/token setup described in the previous version of this
      note. Kept everything else in the section: the "Follow along —
      @jaded.medias" heading and the "Follow on Instagram" link, both
      real, now on one clean row without an empty grid under them.
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
- [x] **Logo in emails now a dedicated small asset.** Was the full
      541KB `logo.png` scaled down to 40×40 by the `<img>` tag; now a
      real 120×120 `public/logo-email.png` (815 bytes) generated via
      sharp, referenced from `templates.ts`'s `LOGO_URL`.
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
- [x] **Env vars confirmed reaching the app.** Both `RESEND_FROM_EMAIL`
      and `JADEDMEDIA_TEAM_EMAIL` are live — see Phase 5 and Phase 9:
      the `leads` table has 5 real rows (both `contact_form` and
      `quote_popup` sources, with `service_id` populated), meaning
      migrations 0006/0009 are applied and the forms have actually been
      submitted and saved successfully in production.

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
- [x] **Real 1200×630 social-share image built.** Open Graph/Twitter
      cards fell back to `logo.png` — a square product shot, cropped
      badly at the landscape ratio social platforms use. Added
      `src/app/opengraph-image.tsx` using `next/og`'s `ImageResponse`:
      a real branded card (logo badge, wordmark, gold subtitle,
      tagline) generated server-side from the same `logo.png`, at the
      correct size. Next's file-convention metadata picks it up
      automatically — removed the manual `images` override in
      `layout.tsx` so there's one source of truth, not two. Verified by
      fetching `/opengraph-image` directly and confirming the homepage's
      actual `<meta property="og:image">` tag now points to it.
- [ ] **⚠️ Found the actual reason you can't see this toggle: it's a
      Pro-plan feature, and your project is on Supabase's Free plan.**
      My earlier "two clicks, free" note was wrong — I hadn't checked
      Supabase's own docs at the time. Just did: leaked password
      protection is explicitly gated to the Pro Plan and above
      ([Supabase docs — Password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)),
      and confirmed your org (`FunmbiO's Org`) is on `tier_free` via
      the Supabase API directly — so the setting isn't hidden or
      broken, it genuinely isn't available on your current plan. This
      is a real Supabase Auth service setting, not something a SQL
      migration or this app's code can reach either way. **Your call:**
      upgrade to Supabase Pro ($25/mo) if this matters enough to pay
      for, or leave it — it's a defense-in-depth extra (blocks reusing
      a password that's already leaked elsewhere), not a hole in the
      admin login itself.

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

- [x] **Two more logos added to "Trusted By": Atlantic Built, Mancuso
      Clinic.** Same treatment as D1/Muir — recolored to the site's
      paper tone and masked from a luminance threshold, since both
      sources had a flat opaque background baked in (solid black for
      Atlantic Built's neon mark, solid white for Mancuso's wordmark —
      opposite polarities, so the threshold direction is flipped
      between the two). Four logos now sit on one row, verified with
      zero horizontal overflow at 320–1024px.
- [x] **Press strip now shows real client logos, "Trusted By."** Swapped
      the five `[add logo -- later]` placeholder slots for two real
      logos (D1 Autotech, Muir Real Estate Group) and renamed the label
      from "As Seen In" (a press-mention claim) to "Trusted By" (a
      client-trust claim, which these actually are). Both source images
      needed processing to blend into the dark strip rather than
      sitting in their original boxes: D1's webp already carried a real
      alpha channel, so its shape was recolored to the site's `paper`
      tone directly from that alpha; Muir's PNG had a flat gray
      background baked in as fully opaque, so its alpha was rebuilt
      from a luminance threshold (its white mark vs. the gray fill)
      before the same recolor. Muted to 60% opacity via CSS
      (`hover:opacity-100`) rather than baked into the file, so hover
      brightens without a second export. Both live at full native
      resolution in `public/logos/` — next/image handles the actual
      display sizing, so nothing is blurry. Verified visually at
      desktop and mobile widths, plus zero horizontal overflow at
      320–768px.
- [x] **Header wordmark/subtitle wrapping to two lines at narrow phones
      fixed.** At ~320–414px, "JADED MEDIA" and "PHOTO & FILM" were
      wrapping mid-word — flexbox was shrinking the wordmark block down
      to its min-content width (the longest single word) because the
      header's total content was a few pixels wider than the viewport
      once the hamburger button was added. Fixed by trimming the
      header's horizontal padding, gaps, and Book a Call button padding
      at the smallest breakpoint (restored at `sm:`) and adding
      `whitespace-nowrap` to both lines. Verified via Playwright:
      single line, zero horizontal overflow, from 320px through 1920px.
- [x] **Deleting a portfolio item now cleans up its Storage files too.**
      `deletePortfolioItem` previously only removed the database row,
      leaving the cover + gallery images orphaned in the `Portfolio
      Images` bucket. Now selects the URLs before deleting the row,
      derives their Storage paths, and removes them (best-effort —
      logged, not fatal, if cleanup fails after the row is already
      gone). At the time this didn't yet cover swapping out a single
      gallery image mid-edit without saving — that gap is now closed
      too, see Phase 4's storage-cleanup-on-edit item.
- [x] **Slug conflicts now show a friendly message.** Creating or
      renaming a portfolio item or service to a slug that's already
      taken previously surfaced Postgres's raw unique-violation error
      text in the admin form's error banner. Both `actions.ts` files
      now check for error code `23505` and show "That slug is already
      taken — pick a different one." instead.
- [x] **Mobile nav added.** `SiteHeader` is now a client component with
      a hamburger toggle below the `lg` breakpoint — three-bar icon
      animates into an X, opens a full-screen panel (Work/Services/
      About/Contact) portaled to `document.body`, locks body scroll
      while open, closes on Escape or on clicking a link. (The portal
      matters: the header's `backdrop-blur-sm` establishes a CSS
      containing block for fixed-position descendants, which silently
      collapsed the panel to a sliver when it was nested directly
      inside `<header>` — caught by inspecting computed layout, not
      just eyeballing a screenshot.)
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
      `0002_seed_d1_autotech.sql` (confirmed live — see below).
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
