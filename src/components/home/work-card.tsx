import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio/types";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";

export function WorkCard({
  item,
  className,
}: {
  item: PortfolioItem;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={`group relative block overflow-hidden rounded-md bg-stone-2 ${className ?? ""}`}
    >
      {item.coverImageUrl ? (
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-[filter] duration-200 group-hover:brightness-[0.82]"
          quality={90}
        />
      ) : (
        <div className="absolute inset-0 flex items-start justify-end p-4 sm:p-5">
          <span className="font-sans text-[10px] tracking-[0.1em] text-paper/40 uppercase">
            [ {item.videoUrl ? "Film still" : "Photo"} ]
          </span>
        </div>
      )}

      {item.videoUrl && (
        <div
          className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 transition-transform group-hover:scale-105"
          aria-hidden
        >
          <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
            <path
              d="M1 1.5V18.5L17 10L1 1.5Z"
              stroke="#f6f4ef"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 sm:bottom-6 sm:left-6">
        <span className="font-sans text-[10.5px] font-semibold tracking-[0.12em] text-gold-soft uppercase">
          {CATEGORY_LABELS[item.category]} &middot; {MEDIUM_LABELS[item.medium]}
        </span>
        <span className="font-display text-xl text-paper italic sm:text-2xl">
          {item.title}
        </span>
      </div>
    </Link>
  );
}
