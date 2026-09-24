import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/service-detail";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Services | Jaded Media",
  description:
    "Photography and film for weddings, automotive, and business & brand — tailored to your story.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="flex flex-col gap-16 px-6 py-20 md:px-16 md:py-28">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            What We Offer
          </span>
          <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
            Services built for every story.
          </h1>
          <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
            Every project starts with a conversation, not a package —
            below is what each service typically includes, tailored to what
            your story actually needs.
          </p>
        </div>

        <ServiceDetail
          number="01"
          category="wedding"
          title="Weddings"
          description="Full-day photo and film coverage that captures the vows, the toasts, and the quiet moments in between — delivered as work you'll return to for decades."
          bullets={[
            "Full-day photography and/or film coverage",
            "A private online gallery of edited images",
            "A cinematic highlight film (when film is included)",
            "Optional engagement or rehearsal dinner coverage",
            "Full-resolution delivery, yours to keep forever",
          ]}
          icon={
            <path
              d="M12 19.5C12 19.5 4 15 4 9.6C4 6.9 6.1 5 8.4 5C9.9 5 11.2 5.8 12 7C12.8 5.8 14.1 5 15.6 5C17.9 5 20 6.9 20 9.6C20 15 12 19.5 12 19.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          }
        />

        <ServiceDetail
          number="02"
          category="automotive"
          title="Automotive"
          description="Editorial stills and cinematic film for cars that deserve better than a phone photo — track days, builds, dealer inventory, and personal collections."
          reverse
          bullets={[
            "On-location or studio shoots — track days, builds, dealer inventory",
            "Editorial stills and/or cinematic film",
            "Fast turnaround available for dealer and inventory needs",
            "Print-ready and social-ready exports",
          ]}
          icon={
            <>
              <path
                d="M5 15.5L6.4 10.6C6.7 9.5 7.7 8.8 8.8 8.8H15.2C16.3 8.8 17.3 9.5 17.6 10.6L19 15.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <rect x="3.5" y="15.5" width="17" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="7" cy="17.5" r="0.9" fill="currentColor" />
              <circle cx="17" cy="17.5" r="0.9" fill="currentColor" />
            </>
          }
        />

        <ServiceDetail
          number="03"
          category="business"
          title="Business &amp; Brand"
          description="Story-driven photo and film for brands who want to feel human — product launches, founder stories, headshots, and campaigns built to hold attention."
          bullets={[
            "Product photography and video",
            "Founder and team headshots",
            "Brand and campaign films",
            "On-site or studio sessions",
          ]}
          icon={
            <>
              <path d="M4 19V9.5L12 4L20 9.5V19" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M4 19H20" stroke="currentColor" strokeWidth="1.3" />
              <rect x="10" y="13" width="4" height="6" stroke="currentColor" strokeWidth="1.2" />
            </>
          }
        />
      </div>

      <CtaBanner />
    </>
  );
}
