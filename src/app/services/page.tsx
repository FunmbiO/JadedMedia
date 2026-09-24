import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/service-detail";
import { CtaBanner } from "@/components/home/cta-banner";
import { getPublishedServices } from "@/lib/services/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Jaded Media",
  description:
    "Photography and film for weddings, automotive, and business & brand — tailored to your story.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

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

        {services.length === 0 ? (
          <div className="flex flex-col items-center gap-2 border-t border-paper/15 py-20 text-center">
            <span className="font-display text-xl text-paper/70 italic">
              Services are being updated.
            </span>
            <p className="max-w-md font-sans text-sm font-light text-muted-on-ink">
              Check back shortly, or reach out directly.
            </p>
          </div>
        ) : (
          services.map((service, index) => (
            <ServiceDetail
              key={service.id}
              number={String(index + 1).padStart(2, "0")}
              slug={service.slug}
              title={service.title}
              description={service.description}
              bullets={service.bullets}
              reverse={index % 2 === 1}
            />
          ))
        )}
      </div>

      <CtaBanner />
    </>
  );
}
