import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio/types";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-stone">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            quality={90}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-sans text-[10px] tracking-[0.1em] text-paper/40 uppercase">
              [ {item.videoUrl ? "Film" : "Photo"} &mdash; no cover set ]
            </span>
          </div>
        )}
        {item.videoUrl && (
          <div
            className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 transition-transform group-hover:scale-105"
            aria-hidden
          >
            <svg width="14" height="16" viewBox="0 0 18 20" fill="none">
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

      <div className="flex flex-col gap-1.5">
        <span className="font-sans text-[10.5px] font-semibold tracking-[0.1em] text-gold-soft uppercase">
          {CATEGORY_LABELS[item.category]} &middot; {MEDIUM_LABELS[item.medium]}
        </span>
        <span className="font-display text-lg text-paper italic">
          {item.title}
        </span>
      </div>
    </Link>
  );
}
