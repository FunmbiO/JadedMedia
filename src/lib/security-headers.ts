/**
 * Decides which routes may be framed by an external origin, and which
 * origins are allowed to do it. Both the CSP's frame-ancestors directive
 * and the X-Frame-Options header (see src/lib/supabase/middleware.ts)
 * are driven from this one allowlist — a new route is blocked by
 * default until it's explicitly added here, not the other way around.
 */

// Public, read-only marketing pages only. Nothing under /admin, no auth
// flow, nothing that uploads a file, sends email, or changes data.
const EMBEDDABLE_EXACT_PATHS = new Set([
  "/",
  "/work",
  "/services",
  "/about",
  "/contact",
  "/faq",
  "/press",
  "/privacy",
  "/terms",
  "/cookies",
  "/refund-policy",
]);

// Dynamic routes under a public section — /work/[slug] project pages.
const EMBEDDABLE_PATH_PREFIXES = ["/work/"];

export function isEmbeddablePath(pathname: string): boolean {
  if (EMBEDDABLE_EXACT_PATHS.has(pathname)) return true;
  return EMBEDDABLE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Origins allowed to embed the pages above, in an iframe. A small
 * constant plus an optional comma-separated env var
 * (EMBED_ALLOWED_ORIGINS) for adding another origin — e.g. the
 * portfolio's eventual custom domain — without touching this file.
 */
export const EMBEDDABLE_ORIGINS: readonly string[] = [
  "https://jaded-works.vercel.app",
  ...(process.env.EMBED_ALLOWED_ORIGINS
    ? process.env.EMBED_ALLOWED_ORIGINS.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : []),
];

/** The frame-ancestors CSP directive for a given request path. */
export function frameAncestorsFor(pathname: string): string {
  return isEmbeddablePath(pathname)
    ? `frame-ancestors 'self' ${EMBEDDABLE_ORIGINS.join(" ")}`
    : "frame-ancestors 'none'";
}

/**
 * Whether X-Frame-Options: DENY should be set for this path. Browsers
 * that understand CSP's frame-ancestors ignore X-Frame-Options when
 * both are present, but X-Frame-Options can't allowlist a specific
 * origin the way frame-ancestors can (it's DENY, SAMEORIGIN, or
 * nothing) — so it has to come off entirely on an embeddable path
 * rather than conflict with frame-ancestors there, and stays on
 * everywhere else as a second layer for any older browser that only
 * understands X-Frame-Options.
 */
export function shouldSetXFrameOptionsDeny(pathname: string): boolean {
  return !isEmbeddablePath(pathname);
}
