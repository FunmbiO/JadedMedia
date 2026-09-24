import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
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
  "Jaded Media is photography & film by Olufunmbi Olajubu, for weddings, automotive, and business — cinematic stories, crafted with intention.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Jaded Media",
    "Olufunmbi Olajubu",
    "wedding photographer New Brunswick",
    "automotive photography",
    "business photography",
    "videographer New Brunswick Canada",
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
    images: [{ url: "/logo.png", width: 1200, height: 1200, alt: "Jaded Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
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
      </body>
    </html>
  );
}
