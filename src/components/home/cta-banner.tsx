import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export function CtaBanner() {
  return (
    <section id="contact" className="border-y border-paper/10 bg-ink-2 px-6 py-24 text-center md:px-16 md:py-36">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-7">
        <h2 className="font-display text-4xl leading-tight font-normal text-paper italic sm:text-5xl md:text-[54px]">
          Let&apos;s create something timeless.
        </h2>
        <p className="max-w-[480px] font-sans text-base leading-relaxed font-light text-muted-on-ink">
          Dates fill quickly &mdash; reach out and let&apos;s talk about your
          story before my calendar fills without you.
        </p>
        <Link
          href="/contact"
          className="mt-1.5 rounded-full border border-gold bg-gold px-9 py-4 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          Start Your Project
        </Link>
        <span className="mt-1 font-sans text-[13px] text-muted-on-ink">
          {SITE_CONFIG.email} &nbsp;&middot;&nbsp; {SITE_CONFIG.phone}
        </span>
      </div>
    </section>
  );
}
