import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import type { LeadEventType } from "@/app/contact/actions";
import { isLeadEventType } from "@/app/contact/labels";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact | Jaded Media",
  description:
    "Get in touch about your wedding, automotive, or business project.",
};

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const defaultEventType: LeadEventType =
    type && isLeadEventType(type) ? type : "wedding";

  return (
    <div className="flex flex-col gap-16 px-6 py-20 md:px-16 md:py-28">
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Contact
        </span>
        <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
          Get in touch.
        </h1>
        <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
          Fill out the form below and I&apos;ll get back to you shortly. Or
          reach out directly:
        </p>
        <div className="flex flex-col gap-1 font-sans text-sm text-paper/80">
          <span>{SITE_CONFIG.email}</span>
          <span>{SITE_CONFIG.phone}</span>
          <span>{SITE_CONFIG.city}</span>
        </div>
        <p className="max-w-md font-sans text-sm font-light text-muted-on-ink">
          {SITE_CONFIG.travelNote}
        </p>
      </div>

      <div className="max-w-2xl">
        <ContactForm defaultEventType={defaultEventType} />
      </div>
    </div>
  );
}
