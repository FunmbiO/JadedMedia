const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We talk about what you want and what the day looks like.",
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "I put together a plan and a timeline, so you know what to expect.",
  },
  {
    number: "03",
    title: "The Shoot",
    description: "I stay out of the way and shoot the day as it happens.",
  },
  {
    number: "04",
    title: "The Reveal",
    description:
      "You get a private link to everything, usually within 6–8 weeks. It's yours to keep.",
  },
];

export function Process() {
  return (
    <section className="bg-ink px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 md:gap-18">
        <div className="flex max-w-[560px] flex-col items-center gap-4 text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            How I Work
          </span>
          <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl md:text-[44px]">
            From the first call to the final film.
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 border-t border-paper/15 pt-7"
            >
              <span
                aria-hidden
                className="font-display text-4xl font-light text-paper/40 sm:text-5xl"
              >
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
