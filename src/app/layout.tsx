import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConditionalSiteChrome } from "@/components/conditional-site-chrome";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const TITLE = "Jaded Media | Photography & Film";
const DESCRIPTION =
  "Jaded Media is Olufunmbi Olajubu's photo and film work — weddings, cars, and business shoots.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Jaded Media",
    "Olufunmbi Olajubu",
    "wedding photographer Moncton",
    "wedding photographer New Brunswick",
    "automotive photography",
    "business photography",
    "videographer Moncton New Brunswick",
  ],
  authors: [{ name: "Olufunmbi Olajubu" }],
  creator: "Olufunmbi Olajubu",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Jaded Media",
    title: TITLE,
    description: DESCRIPTION,
    // No manual `images` override — opengraph-image.tsx (a real 1200x630
    // branded card, not the square product-shot logo) is picked up
    // automatically by Next's file-convention metadata.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  // Google Search Console ownership verification (HTML tag method) —
  // a second, independent path alongside the /google...html file, so
  // either one verifies the property.
  verification: {
    google: "Em02yIMTKaUjXiwzIJjhvCKqBVwyHkxx_Tim3xXor4c",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Jaded Media",
  image: `${SITE_CONFIG.siteUrl}/logo.png`,
  url: SITE_CONFIG.siteUrl,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moncton",
    addressRegion: "NB",
    addressCountry: "CA",
  },
  areaServed: "CA-NB",
  founder: {
    "@type": "Person",
    name: "Olufunmbi Olajubu",
  },
  sameAs: [SITE_CONFIG.instagramUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
