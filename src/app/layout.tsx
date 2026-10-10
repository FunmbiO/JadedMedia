import type { Metadata } from "next";
import { Fraunces, Manrope, Petrona } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConditionalSiteChrome } from "@/components/conditional-site-chrome";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Italic dropped: every spot that used to set `italic` on this font now
  // uses Petrona (--font-accent) upright instead — see globals.css.
  style: ["normal"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// The site's one deliberate flourish — used upright, never italic, only
// for the specific emotional/pull-quote moments (hero headline, the
// Philosophy quote, the testimonial, the closing CTA) that previously
// leaned on an italicized Fraunces for emphasis.
const petrona = Petrona({
  variable: "--font-petrona",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500"],
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
  // This is the field Google actually keys off for the small circular
  // logo shown next to the site in search results / the Knowledge
  // Panel — a plain `image` isn't enough on its own. Google requires
  // at least 112x112px and legible on a white background; logo.png is
  // 5834x5834 with a real white (not transparent) background, so it
  // clears both without needing a separate asset.
  logo: {
    "@type": "ImageObject",
    url: `${SITE_CONFIG.siteUrl}/logo.png`,
    width: 5834,
    height: 5834,
  },
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
      className={`${fraunces.variable} ${manrope.variable} ${petrona.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ConditionalSiteChrome header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </ConditionalSiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
