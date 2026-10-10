import { getSiteContent, pickContent } from "@/lib/content/queries";

const STEP_KEYS = [
  { title: "process_step_1_title", description: "process_step_1_description" },
  { title: "process_step_2_title", description: "process_step_2_description" },
  { title: "process_step_3_title", description: "process_step_3_description" },
  { title: "process_step_4_title", description: "process_step_4_description" },
] as const;

export async function Process() {
  const content = await getSiteContent();

  const steps = STEP_KEYS.map((keys, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: pickContent(content, keys.title),
    description: pickContent(content, keys.description),
  }));

  return (
    <section className="bg-ink px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 md:gap-18">
        <div className="flex max-w-[560px] flex-col items-center gap-4 text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {pickContent(content, "process_eyebrow")}
          </span>
          <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl md:text-[44px]">
            {pickContent(content, "process_heading")}
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {steps.map((step) => (
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
