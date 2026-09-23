/**
 * Placeholder copy on purpose — a fabricated client quote would be a false
 * testimonial. Swap in a real one (or wire this to the testimonials table
 * once Sprint 5's admin exists) before this ships.
 */
export function Testimonial() {
  return (
    <section className="bg-beige-deep px-6 py-24 text-center md:px-16 md:py-36">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-7">
        <span
          aria-hidden
          className="font-display text-6xl leading-none text-gold-deep opacity-55 sm:text-8xl"
        >
          &ldquo;
        </span>
        <p className="font-display text-xl leading-relaxed font-light text-ink italic sm:text-2xl md:text-[32px]">
          [Client testimonial goes here — a sentence or two on how the
          experience felt, in their own words.]
        </p>
        <div className="mt-3 flex items-center gap-3.5">
          <div className="h-11 w-11 shrink-0 rounded-full bg-beige" />
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-sans text-sm font-semibold text-ink">
              [Client Name]
            </span>
            <span className="font-sans text-[12.5px] text-muted-on-paper">
              [Wedding / Automotive / Business Client — Location]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
