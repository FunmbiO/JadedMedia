import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[560px] flex-col overflow-hidden py-24 sm:min-h-[680px] md:min-h-[820px] md:py-0">
      {/* Placeholder for the full-bleed cinematic reel background */}
      <div className="absolute inset-0 flex items-end justify-start bg-stone p-5">
        <span className="text-[11px] tracking-[0.14em] text-paper/45 uppercase">
          [ Full-bleed reel — cinematic motion background ]
        </span>
      </div>
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex max-w-[900px] flex-1 flex-col justify-center gap-7 px-6 md:px-16">
        <div className="flex items-center gap-3.5">
          <div className="h-px w-8.5 bg-gold" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.22em] text-gold-soft uppercase sm:text-xs">
            Automotive &middot; Weddings &middot; Business &mdash; Photo &amp;
            Film
          </span>
        </div>

        <h1 className="font-display text-[44px] leading-[1.08] font-normal text-paper italic sm:text-6xl md:text-7xl lg:text-[92px] lg:leading-[1.04]">
          Cinematic stories,
          <br />
          crafted with intention.
        </h1>

        <p className="max-w-[540px] font-sans text-base leading-relaxed font-light text-paper/80 sm:text-[17px]">
          Jaded Media is one photographer&apos;s take on photography &amp;
          film, for people who don&apos;t want an ordinary shot. From
          weddings to build sheets to boardrooms, I turn real, unscripted
          moments into something you&apos;ll still feel a decade from now.
        </p>

        <div className="mt-2 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Link
            href="/work"
            className="rounded-full bg-paper px-8 py-4 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-colors hover:bg-beige"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="border-b border-gold-soft/50 pb-1 font-sans text-[13px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
          >
            Book a Consultation &rarr;
          </Link>
        </div>
      </div>

      <div className="relative z-10 hidden flex-col items-center gap-2.5 self-end px-16 pb-10 md:flex">
        <span className="font-sans text-[10px] tracking-[0.24em] text-paper/55 uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="h-11 w-px bg-paper/35" />
      </div>
    </section>
  );
}
