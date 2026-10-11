import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent, pickContent } from "@/lib/content/queries";
import { getPublishedFaqs } from "@/lib/faqs/queries";
import { renderWithLinks } from "@/lib/markdown-links";

export const metadata: Metadata = {
  title: "FAQ | Jaded Media",
  description:
    "Answers to common questions about booking Jaded Media for a wedding, automotive, or business shoot.",
};

export default async function FaqPage() {
  const [content, faqs] = await Promise.all([getSiteContent(), getPublishedFaqs()]);

  return (
    <div className="flex flex-col gap-16 px-6 py-20 md:px-16 md:py-28">
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          FAQ
        </span>
        <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
          Questions, answered.
        </h1>
        <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
          Don&apos;t see what you&apos;re after?{" "}
          <Link
            href="/contact"
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            Just ask
          </Link>{" "}
          — {pickContent(content, "contact_email")}.
        </p>
      </div>

      {faqs.length > 0 && (
        <div className="flex max-w-3xl flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
          {faqs.map((faq) => (
            <details key={faq.id} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[15px] font-semibold text-paper">
                {faq.question}
                <span
                  aria-hidden
                  className="shrink-0 font-display text-xl text-gold-soft transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl font-sans text-[14.5px] leading-relaxed font-light text-muted-on-ink">
                {renderWithLinks(faq.answer)}
              </p>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
