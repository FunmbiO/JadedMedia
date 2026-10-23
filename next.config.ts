import type { NextConfig } from "next";

// Optional: set this to a custom R2 public domain (e.g. cdn.jadedmedia.ca)
// if the bucket ever moves off the default *.r2.dev domain — no code
// change needed, just add the env var (locally and on Vercel) and redeploy.
const r2CustomDomain = process.env.R2_PUBLIC_HOSTNAME;

// Scoped to our own project/bucket rather than wildcarded (*.supabase.co,
// *.r2.dev) — Next's /_next/image proxy is a public, unauthenticated route
// that fetches whatever URL passes this check, server-side, on our own
// hosting bill. A wildcard would let anyone point it at an arbitrary
// third-party Supabase project or R2 bucket.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;
const r2Hostname =
  r2CustomDomain ??
  (process.env.R2_PUBLIC_BASE_URL
    ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
    : undefined);

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content-Security-Policy is set per-request in src/proxy.ts instead —
  // it needs a fresh nonce on every response for Next's own inline
  // hydration scripts to run under a strict script-src.
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      ...(r2Hostname ? [{ protocol: "https" as const, hostname: r2Hostname }] : []),
    ],
    // Next.js only serves quality values listed here (75 by default) —
    // 75 was visibly over-compressing photography (muted color, soft
    // detail). 90 is used across the portfolio-facing images.
    qualities: [75, 90, 100],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
