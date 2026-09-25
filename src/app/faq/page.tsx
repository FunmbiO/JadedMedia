import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ | Jaded Media",
  description:
    "Answers to common questions about booking Jaded Media for a wedding, automotive, or business shoot.",
};

const FAQS = [
  {
    question: "What kind of work do you do?",
    answer:
      "Weddings, cars, and business or brand shoots — photo, film, or both. I don't work in just one style; if it's worth capturing, I'll shoot it.",
  },
  {
    question: "Do you shoot photo, video, or both?",
    answer:
      "Both, and either on their own too. When you request a quote, let me know what you're after and I'll put together what fits the project.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the project — scope, location, and how much coverage you need all factor in. There's no fixed price list; request a quote and I'll get back to you with real numbers for your specific shoot.",
  },
  {
    question: "Do you travel outside Moncton?",
    answer:
      "Yes. I'm based in Moncton, New Brunswick, but I'll travel for the right project — travel costs may apply depending on distance.",
  },
  {
    question: "How do I book you?",
    answer: (
      <>
        Fill out the{" "}
        <Link
          href="/contact"
          className="text-gold-soft underline underline-offset-2 hover:opacity-75"
        >
          contact form
        </Link>{" "}
        or request a quote from a specific service, and I&apos;ll follow up
        to talk through the details before anything&apos;s locked in.
      </>
    ),
  },
  {
    question: "How far in advance should I book?",
    answer:
      "The sooner the better, especially for weddings or a date-specific shoot — but reach out even if your timeline is tight. Worst case, I'll tell you if it's not doable.",
  },
  {
    question: "Can I see examples of your work?",
    answer: (
      <>
        Yes —{" "}
        <Link
          href="/work"
          className="text-gold-soft underline underline-offset-2 hover:opacity-75"
        >
          take a look here
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do you edit the photos and video?",
    answer:
      "Every shoot is edited before delivery — nothing goes out straight off the camera.",
  },
] as const;

export default function FaqPage() {
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
          — {SITE_CONFIG.email}.
        </p>
      </div>

      <div className="flex max-w-3xl flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-5">
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
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
