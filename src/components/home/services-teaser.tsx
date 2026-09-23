import type { ReactNode } from "react";

type Service = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Weddings",
    description:
      "Full-day photo and film coverage that captures the vows, the toasts, and the quiet moments in between — delivered as work you'll return to for decades.",
    icon: (
      <path
        d="M12 19.5C12 19.5 4 15 4 9.6C4 6.9 6.1 5 8.4 5C9.9 5 11.2 5.8 12 7C12.8 5.8 14.1 5 15.6 5C17.9 5 20 6.9 20 9.6C20 15 12 19.5 12 19.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    number: "02",
    title: "Automotive",
    description:
      "Editorial stills and cinematic film for cars that deserve better than a phone photo — track days, builds, dealer inventory, and personal collections.",
    icon: (
      <>
        <path
          d="M5 15.5L6.4 10.6C6.7 9.5 7.7 8.8 8.8 8.8H15.2C16.3 8.8 17.3 9.5 17.6 10.6L19 15.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <rect
          x="3.5"
          y="15.5"
          width="17"
          height="4"
          rx="1.2"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <circle cx="7" cy="17.5" r="0.9" fill="currentColor" />
        <circle cx="17" cy="17.5" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    number: "03",
    title: "Business & Brand",
    description:
      "Story-driven photo and film for brands who want to feel human — product launches, founder stories, headshots, and campaigns built to hold attention.",
    icon: (
      <>
        <path
          d="M4 19V9.5L12 4L20 9.5V19"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M4 19H20" stroke="currentColor" strokeWidth="1.3" />
        <rect x="10" y="13" width="4" height="6" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
];

export function ServicesTeaser() {
  return (
    <section id="services" className="bg-ink px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 md:gap-18">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl md:text-[46px]">
            Services built around your story.
          </h2>
          <p className="font-sans text-base font-light text-muted-on-ink">
            Every service below is offered in photography, film, or both —
            matched to what your story needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="flex flex-col gap-5 border-t border-paper/15 pt-8"
            >
              <span className="font-display text-sm text-gold-soft">
                {service.number}
              </span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                className="text-paper"
                aria-hidden
              >
                {service.icon}
              </svg>
              <h3 className="font-display text-xl font-medium text-paper sm:text-2xl">
                {service.title}
              </h3>
              <p className="font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
