export function Philosophy() {
  return (
    <section id="about" className="grid grid-cols-1 bg-paper md:grid-cols-2">
      <div className="relative flex h-64 items-end bg-beige p-5 sm:h-96 md:h-[680px]">
        <span className="text-[10px] tracking-[0.1em] text-ink/45 uppercase">
          [ Studio / behind-the-scenes photo ]
        </span>
      </div>

      <div className="flex flex-col justify-center gap-6 px-6 py-14 sm:px-12 sm:py-20 md:px-20 md:py-0">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">
          Our Philosophy
        </span>
        <h2 className="font-display max-w-[480px] text-2xl leading-snug font-light text-ink italic sm:text-3xl md:text-[38px]">
          &ldquo;We don&apos;t just document moments — we translate feeling
          into photo and film.&rdquo;
        </h2>
        <p className="max-w-[440px] font-sans text-[15.5px] leading-relaxed font-light text-muted-on-paper">
          Founded in 2019, Jaded Media began with one belief: that the best
          work isn&apos;t staged, it&apos;s noticed. Whether we&apos;re
          behind a camera or a lens on a car, an aisle, or a boardroom, we
          shoot quietly, edit patiently, and hand you something
          you&apos;ll pass down.
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div className="h-px w-10 bg-gold" />
          <span className="font-display text-base text-ink italic">
            Jaded Media, Est. 2019
          </span>
        </div>
      </div>
    </section>
  );
}
