import { SITE_CONFIG } from "@/lib/site-config";

export function SocialStrip() {
  return (
    <section className="bg-ink px-6 py-16 md:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-xl font-normal text-paper italic sm:text-2xl">
          Follow along &mdash; {SITE_CONFIG.instagramHandle}
        </h3>
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border-b border-gold-soft/40 pb-1 font-sans text-[13px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
        >
          Follow on Instagram &rarr;
        </a>
      </div>
    </section>
  );
}
