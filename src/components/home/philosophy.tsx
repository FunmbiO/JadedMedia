import Image from "next/image";
import { getSiteContent, pickContent } from "@/lib/content/queries";

export async function Philosophy() {
  const content = await getSiteContent();

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
          {pickContent(content, "philosophy_eyebrow")}
        </span>
        <h2 className="font-accent max-w-[480px] text-2xl leading-snug font-light text-ink sm:text-3xl md:text-[38px]">
          &ldquo;{pickContent(content, "philosophy_quote")}&rdquo;
        </h2>
        <p className="max-w-[440px] font-sans text-[15.5px] leading-relaxed font-light text-muted-on-paper">
          {pickContent(content, "philosophy_body")}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div className="h-px w-10 bg-gold" />
          <span className="font-brush text-lg text-ink">
            {pickContent(content, "philosophy_est_line")}
          </span>
        </div>
      </div>
    </section>
  );
}
