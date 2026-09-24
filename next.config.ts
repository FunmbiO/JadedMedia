import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — portfolio cover/gallery images.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Cloudflare R2 public bucket URLs (r2.dev, or a custom public domain later).
      { protocol: "https", hostname: "*.r2.dev" },
    ],
  },
};

export default nextConfig;
