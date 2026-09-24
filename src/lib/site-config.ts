/**
 * Real business details. Used anywhere contact info repeats (footer, CTA
 * banner, contact page) so there's one place to update instead of several.
 */
export const SITE_CONFIG = {
  email: "funmbiolajubu@gmail.com",
  phone: "(506) 588-6081",
  city: "New Brunswick, Canada",
  travelNote:
    "Based in New Brunswick — available to travel for the right project (travel costs may apply).",
  instagramHandle: "@jaded.medias",
  instagramUrl: "https://www.instagram.com/jaded.medias/",
  // Used to build absolute asset URLs (e.g. the logo in email templates) —
  // email clients can't load a relative /logo.png path.
  siteUrl: "https://jadedmedia.ca",
} as const;
