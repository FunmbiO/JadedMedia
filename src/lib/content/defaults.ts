/**
 * Fallback copy for every editable content key — what renders if a row is
 * missing from site_content (e.g. before the first admin save, or if a
 * key is ever added here without a matching DB row yet). Keep in sync
 * with the seed data in supabase/migrations/0012_site_content.sql.
 */
export const CONTENT_DEFAULTS = {
  hero_eyebrow: "Automotive · Weddings · Business — Photo & Film",
  hero_headline_line1: "Photo and film,",
  hero_headline_line2: "shot the way it happened.",
  hero_subcopy:
    "I'm Olufunmbi, and I shoot weddings, cars, and business work under Jaded Media. No forced poses — just what's happening in front of the camera.",
  hero_primary_cta_label: "View My Work",
  hero_secondary_cta_label: "Book a Call",
  hero_video_url: "",

  philosophy_eyebrow: "My Philosophy",
  philosophy_quote:
    "I don't believe in having a niche. If it's worth capturing, I'm there.",
  philosophy_body:
    "Founded in 2019, Jaded Media doesn't stick to one type of shoot. Weddings, cars, business — if it matters to you, I'll shoot it. You decide what's worth it, I just show up and do it right.",
  philosophy_est_line: "Jaded Media, Est. 2019",

  process_eyebrow: "How I Work",
  process_heading: "From the first call to the final film.",
  process_step_1_title: "Discovery Call",
  process_step_1_description:
    "We talk about what you want and what the day looks like.",
  process_step_2_title: "Custom Proposal",
  process_step_2_description:
    "I put together a plan and a timeline, so you know what to expect.",
  process_step_3_title: "The Shoot",
  process_step_3_description: "I stay out of the way and shoot the day as it happens.",
  process_step_4_title: "The Reveal",
  process_step_4_description:
    "You get a private link to everything, usually within 6–8 weeks. It's yours to keep.",

  services_teaser_eyebrow: "What I Offer",
  services_teaser_heading: "A few ways I can help.",
  services_teaser_subcopy: "Photo, film, or both — whatever fits what you need.",

  // Testimonials moved to a real `testimonials` table (phase 15 follow-up)
  // so there can be more than one — see /admin/testimonials.

  cta_heading: "Let's talk about your project.",
  cta_subcopy: "My calendar fills up fast, so reach out early if you want a date.",
  cta_button_label: "Start Your Project",

  contact_email: "funmbiolajubu@gmail.com",
  contact_phone: "(506) 588-6081",
  contact_city: "Moncton, New Brunswick, Canada",
  contact_travel_note:
    "Based in Moncton, New Brunswick — available to travel for the right project (travel costs may apply).",
  instagram_handle: "@jaded.medias",
  instagram_url: "https://www.instagram.com/jaded.medias/",
} as const;

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
