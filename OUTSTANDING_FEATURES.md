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
- [ ] **Featured Work grid is static/sample.** Five hardcoded portfolio
      entries in `featured-work.tsx`, all image slots are "[ Film
      still ]" placeholders. Sprint 3 replaces this with real entries
      pulled from Supabase.
- [ ] **Social strip tiles are empty placeholders**, and the Instagram
      handle/link in `site-config.ts` are brackets — same real-content
      dependency as above.
- [ ] **Logo wordmark wraps at the narrowest phones (~320px).** "JADED
      MEDIA" breaks to two lines at an iPhone SE-width viewport. Not
      broken, just not ideal — worth a proper fix alongside the mobile
      nav.

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
