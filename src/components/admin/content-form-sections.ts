import type { ContentKey } from "@/lib/content/defaults";

type FieldDef = { key: ContentKey; label: string; type: "text" | "textarea" };
type SectionDef = { title: string; fields: FieldDef[] };

/**
 * Drives the generic part of the admin content form. hero_video_url is
 * deliberately left out of this list — it gets its own uploader widget
 * instead of a plain text field, rendered separately in ContentForm.
 */
export const CONTENT_SECTIONS: SectionDef[] = [
  {
    title: "Hero (homepage top)",
    fields: [
      { key: "hero_eyebrow", label: "Small label above the headline", type: "text" },
      { key: "hero_headline_line1", label: "Headline — line 1", type: "text" },
      { key: "hero_headline_line2", label: "Headline — line 2", type: "text" },
      { key: "hero_subcopy", label: "Intro paragraph", type: "textarea" },
      { key: "hero_primary_cta_label", label: "Primary button text", type: "text" },
      { key: "hero_secondary_cta_label", label: "Secondary link text", type: "text" },
    ],
  },
  {
    title: "Philosophy (homepage, below Services)",
    fields: [
      { key: "philosophy_eyebrow", label: "Small label", type: "text" },
      { key: "philosophy_quote", label: "Pull quote", type: "textarea" },
      { key: "philosophy_body", label: "Paragraph", type: "textarea" },
      { key: "philosophy_est_line", label: "Signature line", type: "text" },
    ],
  },
  {
    title: "How I Work (the 4-step process)",
    fields: [
      { key: "process_eyebrow", label: "Small label", type: "text" },
      { key: "process_heading", label: "Heading", type: "text" },
      { key: "process_step_1_title", label: "Step 1 — title", type: "text" },
      { key: "process_step_1_description", label: "Step 1 — description", type: "textarea" },
      { key: "process_step_2_title", label: "Step 2 — title", type: "text" },
      { key: "process_step_2_description", label: "Step 2 — description", type: "textarea" },
      { key: "process_step_3_title", label: "Step 3 — title", type: "text" },
      { key: "process_step_3_description", label: "Step 3 — description", type: "textarea" },
      { key: "process_step_4_title", label: "Step 4 — title", type: "text" },
      { key: "process_step_4_description", label: "Step 4 — description", type: "textarea" },
    ],
  },
  {
    title: "What I Offer (services teaser)",
    fields: [
      { key: "services_teaser_eyebrow", label: "Small label", type: "text" },
      { key: "services_teaser_heading", label: "Heading", type: "text" },
      { key: "services_teaser_subcopy", label: "Subheading", type: "text" },
    ],
  },
  {
    title: "Testimonial",
    fields: [
      { key: "testimonial_quote", label: "Quote (leave blank to hide this section)", type: "textarea" },
      { key: "testimonial_name", label: "Client name", type: "text" },
      { key: "testimonial_client_type", label: "Client type (e.g. \"Wedding client\")", type: "text" },
    ],
  },
  {
    title: "Let's Talk (bottom call-to-action)",
    fields: [
      { key: "cta_heading", label: "Heading", type: "text" },
      { key: "cta_subcopy", label: "Subheading", type: "text" },
      { key: "cta_button_label", label: "Button text", type: "text" },
    ],
  },
  {
    title: "Contact details (shown in the footer, contact page & emails)",
    fields: [
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_phone", label: "Phone", type: "text" },
      { key: "contact_city", label: "City / location", type: "text" },
      { key: "contact_travel_note", label: "Travel note", type: "textarea" },
      { key: "instagram_handle", label: "Instagram handle (e.g. @jaded.medias)", type: "text" },
      { key: "instagram_url", label: "Instagram URL", type: "text" },
    ],
  },
];
