import { ServiceIcon } from "@/components/services/service-icon";
import { getPublishedServices } from "@/lib/services/queries";

export async function ServicesTeaser() {
  const services = await getPublishedServices();

  return (
    <section id="services" className="bg-ink px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 md:gap-18">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            What I Offer
          </span>
          <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl md:text-[46px]">
            A few ways I can help.
          </h2>
          <p className="font-sans text-base font-light text-muted-on-ink">
            Photo, film, or both — whatever fits what you need.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="border-t border-paper/15 pt-8 font-sans text-sm font-light text-muted-on-ink">
            Services are being updated — check back shortly.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="flex flex-col gap-5 border-t border-paper/15 pt-8"
              >
                <span className="font-display text-sm text-gold-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ServiceIcon size={30} className="text-paper" />
                <h3 className="font-display text-xl font-medium text-paper sm:text-2xl">
                  {service.title}
                </h3>
                <p className="font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
