import Link from "next/link";
import { getSiteContent, pickContent } from "@/lib/content/queries";

export async function CtaBanner() {
  const content = await getSiteContent();

  return (
    <section id="contact" className="border-y border-paper/10 bg-ink-2 px-6 py-24 text-center md:px-16 md:py-36">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-7">
        <h2 className="font-accent text-4xl leading-tight font-normal text-paper sm:text-5xl md:text-[54px]">
          {pickContent(content, "cta_heading")}
        </h2>
        <p className="max-w-[480px] font-sans text-base leading-relaxed font-light text-muted-on-ink">
          {pickContent(content, "cta_subcopy")}
        </p>
        <Link
          href="/contact"
          className="mt-1.5 rounded-full border border-gold bg-gold px-9 py-4 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          {pickContent(content, "cta_button_label")}
        </Link>
        <span className="mt-1 font-sans text-[13px] text-muted-on-ink">
          {pickContent(content, "contact_email")} &nbsp;&middot;&nbsp; {pickContent(content, "contact_phone")}
        </span>
      </div>
    </section>
  );
}
