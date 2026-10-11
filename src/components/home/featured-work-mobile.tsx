"use client";

import { useRef, useState, type UIEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/portfolio/types";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";
import { chunk } from "@/lib/chunk";

const PAGE_SIZE = 3;

/**
 * Mobile-only alternative to the desktop grid: up to 3 items stack
 * together as one page (editorial numbering, alternating sides, no
 * scrolling needed to see all 3), and swiping that page sideways reveals
 * the next 3 as a new page. Desktop (sm+) keeps the existing grid,
 * untouched, in a sibling `hidden sm:block` block.
 */
export function FeaturedWorkMobile({ items }: { items: PortfolioItem[] }) {
  const pages = chunk(items, PAGE_SIZE);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.clientWidth === 0) return;
    setActivePage(Math.round(el.scrollLeft / el.clientWidth));
  }

  let runningIndex = 0;

  return (
    <div className="sm:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="-mx-6 flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="flex w-full shrink-0 snap-start flex-col gap-6 px-6">
            {page.map((item) => {
              const index = runningIndex++;
              const reversed = index % 2 === 1;

              return (
                <Link
                  key={item.id}
                  href={`/work/${item.slug}`}
                  className={`group flex items-start gap-3.5 ${reversed ? "flex-row-reverse" : ""}`}
                >
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-3xl font-normal leading-none text-ink/15"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={`flex flex-1 flex-col gap-2.5 ${reversed ? "items-end text-right" : ""}`}
                  >
                    <div
                      className={`relative w-full overflow-hidden rounded-md bg-stone-2 ${
                        reversed ? "h-40" : "h-56"
                      }`}
                    >
                      {item.coverImageUrl && (
                        <Image
                          src={item.coverImageUrl}
                          alt={item.title}
                          fill
                          sizes="90vw"
                          className="object-cover object-top"
                          quality={90}
                        />
                      )}
                      {item.videoUrl && (
                        <div
                          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60"
                          aria-hidden
                        >
                          <svg width="13" height="15" viewBox="0 0 18 20" fill="none">
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

                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] font-semibold tracking-[0.12em] text-gold-deep uppercase">
                        {CATEGORY_LABELS[item.category]} &middot; {MEDIUM_LABELS[item.medium]}
                      </span>
                      <span className="font-accent text-xl text-ink">{item.title}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {pages.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] rounded-full transition-all ${
                i === activePage ? "w-5.5 bg-gold" : "w-1.5 bg-ink/15"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
