const PLACEHOLDER_SLOTS = 5;

/**
 * "As seen in" is a real, specific claim — naming actual publications here
 * would be false until the studio has been featured in them. Rendered as
 * generic placeholder slots until there's real press to list; swap for
 * real outlet wordmarks (or remove the section) when that exists.
 */
export function PressStrip() {
  return (
    <section className="border-y border-paper/10 bg-ink px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <span className="shrink-0 font-sans text-[11px] tracking-[0.18em] text-paper/40 uppercase">
          As Seen In
        </span>
        <div className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-4 sm:flex sm:flex-1 sm:justify-between">
          {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
            <span
              key={i}
              className="rounded border border-dashed border-paper/15 px-4 py-2 text-center font-sans text-[11px] tracking-[0.05em] text-paper/35 uppercase"
            >
              [ Publication ]
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
