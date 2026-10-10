import { getSiteContent, pickContent } from "@/lib/content/queries";

export async function SocialStrip() {
  const content = await getSiteContent();
  const handle = pickContent(content, "instagram_handle");
  const url = pickContent(content, "instagram_url");

  return (
    <section className="bg-ink px-6 py-16 md:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-accent text-xl font-normal text-paper sm:text-2xl">
          Follow along &mdash; {handle}
        </h3>
        <a
          href={url}
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
