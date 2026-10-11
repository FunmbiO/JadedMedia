"use client";

import { useState, type UIEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/portfolio/types";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";
import { chunk } from "@/lib/chunk";

const PAGE_SIZE = 3;

/**
 * Desktop (sm+) alternative to the old hero+grid layout: full-width
 * alternating image/text rows with a large faded numeral behind each
 * caption, chunked into pages of 3 with horizontal scroll-snap paging —
 * the desktop scale-up of FeaturedWorkMobile's own treatment. Handles
 * 1-5 items on its own (no more hero/2-col/3-col special-casing at the
 * FeaturedWork level).
 */
export function FeaturedWorkDesktop({ items }: { items: PortfolioItem[] }) {
  const pages = chunk(items, PAGE_SIZE);
  const [activePage, setActivePage] = useState(0);

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.clientWidth === 0) return;
    setActivePage(Math.round(el.scrollLeft / el.clientWidth));
  }

  let runningIndex = 0;

  return (
    <div className="hidden sm:block">
      <div
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="flex w-full shrink-0 snap-start flex-col gap-10">
            {page.map((item) => {
              const index = runningIndex++;
              const reversed = index % 2 === 1;
              const tall = index % 2 === 0;

              return (
                <Link
                  key={item.id}
                  href={`/work/${item.slug}`}
                  className={`group flex items-center gap-12 ${reversed ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`relative w-[58%] shrink-0 overflow-hidden rounded-xl bg-stone-2 ${
                      tall ? "h-[440px]" : "h-[380px]"
                    }`}
                  >
                    {item.coverImageUrl && (
                      <Image
                        src={item.coverImageUrl}
                        alt={item.title}
                        fill
                        sizes="60vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        quality={90}
                      />
                    )}
                    {item.videoUrl && (
                      <div
                        className="absolute top-1/2 left-1/2 flex h-15 w-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 transition-transform group-hover:scale-105"
                        aria-hidden
                      >
                        <svg width="17" height="20" viewBox="0 0 18 20" fill="none">
                          <path
                            d="M1 1.5V18.5L17 10L1 1.5Z"
                            stroke="#f6f4ef"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative flex flex-1 flex-col gap-2.5 ${
                      reversed ? "items-end text-right" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -top-14 font-display text-[160px] leading-none font-normal text-ink/[0.07] select-none ${
                        reversed ? "-right-2" : "-left-2"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 flex flex-col gap-2.5">
                      <span className="font-sans text-xs font-semibold tracking-[0.12em] text-gold-deep uppercase">
                        {CATEGORY_LABELS[item.category]} &middot; {MEDIUM_LABELS[item.medium]}
                      </span>
                      <span className="font-accent text-[40px] leading-[1.1] text-ink">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === activePage ? "w-7 bg-gold" : "w-2 bg-ink/15"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
