const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We learn your story, your day, and what “unforgettable” means to you.",
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "A tailored package and timeline — no bundled packages, no surprises.",
  },
  {
    number: "03",
    title: "The Shoot",
    description:
      "We move quietly through your day, capturing what's real, not staged.",
  },
  {
    number: "04",
    title: "The Reveal",
    description:
      "A private screening link, delivered in 6–8 weeks, yours to keep forever.",
  },
];

export function Process() {
  return (
    <section className="bg-ink px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 md:gap-18">
        <div className="flex max-w-[560px] flex-col items-center gap-4 text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            How We Work
          </span>
          <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl md:text-[44px]">
            From first hello to final film.
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 border-t border-paper/15 pt-7"
            >
              <span className="font-display text-4xl font-light text-paper/20 sm:text-5xl">
                {step.number}
              </span>
              <h3 className="font-sans text-[15px] font-semibold text-paper">
                {step.title}
              </h3>
              <p className="font-sans text-[13.5px] leading-relaxed font-light text-muted-on-ink">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
