import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — portfolio cover/gallery images.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Cloudflare R2 public bucket URLs (r2.dev, or a custom public domain later).
      { protocol: "https", hostname: "*.r2.dev" },
    ],
    // Next.js only serves quality values listed here (75 by default) —
    // 75 was visibly over-compressing photography (muted color, soft
    // detail). 90 is used across the portfolio-facing images.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
