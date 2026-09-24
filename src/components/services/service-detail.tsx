import Link from "next/link";
import type { ReactNode } from "react";
import type { PortfolioCategory } from "@/lib/portfolio/types";

type ServiceDetailProps = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
  category: PortfolioCategory;
  reverse?: boolean;
};

export function ServiceDetail({
  number,
  title,
  description,
  bullets,
  icon,
  category,
  reverse,
}: ServiceDetailProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 border-t border-paper/15 pt-14 md:grid-cols-2 md:gap-16 md:pt-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="flex flex-col gap-6">
        <span className="font-display text-sm text-gold-soft">{number}</span>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-paper" aria-hidden>
          {icon}
        </svg>
        <h2 className="font-display text-3xl font-normal text-paper italic sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md font-sans text-base leading-relaxed font-light text-muted-on-ink">
          {description}
        </p>
        <Link
          href={`/contact?type=${category}`}
          className="w-fit rounded-full border border-gold px-6 py-2.5 font-sans text-[12.5px] font-semibold tracking-[0.06em] text-gold-soft uppercase transition-colors hover:bg-gold hover:text-ink"
        >
          Get a Custom Quote &rarr;
        </Link>
      </div>

      <ul className="flex flex-col gap-4 self-start">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 font-sans text-[15px] font-light text-paper/85"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
