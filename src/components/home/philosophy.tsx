import Image from "next/image";

export function Philosophy() {
  return (
    <section id="about" className="grid grid-cols-1 bg-paper md:grid-cols-2">
      <div className="relative h-64 bg-beige sm:h-96 md:h-[680px]">
        <Image
          src="/founder.avif"
          alt="Olufunmbi Olajubu behind the camera"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col justify-center gap-6 px-6 py-14 sm:px-12 sm:py-20 md:px-20 md:py-0">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">
          My Philosophy
        </span>
        <h2 className="font-display max-w-[480px] text-2xl leading-snug font-light text-ink italic sm:text-3xl md:text-[38px]">
          &ldquo;I don&apos;t believe in having a niche. If it&apos;s worth
          capturing, I&apos;m there.&rdquo;
        </h2>
        <p className="max-w-[440px] font-sans text-[15.5px] leading-relaxed font-light text-muted-on-paper">
          Founded in 2019, Jaded Media doesn&apos;t stick to one type of
          shoot. Weddings, cars, business — if it matters to you, I&apos;ll
          shoot it. You decide what&apos;s worth it, I just show up and
          do it right.
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
