import { getPublishedTestimonials } from "@/lib/testimonials/queries";

/**
 * Hidden entirely until at least one is published via /admin/testimonials
 * — no more permanent "[add testimonial -- later]" placeholder. Renders
 * every published testimonial stacked in the same pull-quote treatment,
 * divided by a hairline, rather than a carousel — simpler, fully
 * server-rendered, no client JS needed for what's realistically a
 * handful of quotes on a small business site.
 */
export async function Testimonial() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-beige-deep px-6 py-24 md:px-16 md:py-36">
      <div className="mx-auto flex max-w-[820px] flex-col items-center divide-y divide-ink/10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center gap-7 py-14 text-center first:pt-0 last:pb-0"
          >
            <span
              aria-hidden
              className="font-display text-6xl leading-none text-gold-deep opacity-55 sm:text-8xl"
            >
              &ldquo;
            </span>
            <p className="font-accent text-xl leading-relaxed font-light text-ink sm:text-2xl md:text-[32px]">
              {testimonial.quote}
            </p>
            <div className="mt-3 flex items-center gap-3.5">
              <div className="h-11 w-11 shrink-0 rounded-full bg-beige" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-brush text-lg text-ink">
                  {testimonial.name}
                </span>
                <span className="font-sans text-[12.5px] text-muted-on-paper">
                  {testimonial.clientType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
