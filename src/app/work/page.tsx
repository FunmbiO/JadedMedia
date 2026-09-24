import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPortfolioItems } from "@/lib/portfolio/queries";
import { CATEGORY_LABELS } from "@/lib/portfolio/labels";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import type { PortfolioCategory } from "@/lib/portfolio/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work | Jaded Media",
  description:
    "Photography and film across weddings, automotive, and business & brand.",
};

const FILTERS: { label: string; value: PortfolioCategory | undefined }[] = [
  { label: "All", value: undefined },
  { label: CATEGORY_LABELS.wedding, value: "wedding" },
  { label: CATEGORY_LABELS.automotive, value: "automotive" },
  { label: CATEGORY_LABELS.business, value: "business" },
];

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

function isPortfolioCategory(value: string): value is PortfolioCategory {
  return value === "wedding" || value === "automotive" || value === "business";
}

export default async function WorkPage({ searchParams }: PageProps) {
  const { category: rawCategory } = await searchParams;
  const category =
    rawCategory && isPortfolioCategory(rawCategory) ? rawCategory : undefined;

  const items = await getPublishedPortfolioItems(category);

  return (
    <div className="flex flex-col gap-12 px-6 py-20 md:px-16 md:py-28">
      <div className="flex flex-col gap-4">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Portfolio
        </span>
        <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
          Selected Work
        </h1>
      </div>

      <nav aria-label="Filter by category" className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const isActive = filter.value === category;
          const href = filter.value ? `/work?category=${filter.value}` : "/work";
          return (
            <Link
              key={filter.label}
              href={href}
              className={`rounded-full border px-5 py-2 font-sans text-[12.5px] font-semibold tracking-[0.04em] uppercase transition-colors ${
                isActive
                  ? "border-gold bg-gold text-ink"
                  : "border-paper/20 text-paper/70 hover:border-paper/40"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <span className="font-display text-xl text-paper/70 italic">
            New work is on the way.
          </span>
          <p className="max-w-md font-sans text-sm font-light text-muted-on-ink">
            This section fills in as projects are published &mdash; check
            back soon.
          </p>
        </div>
      )}
    </div>
  );
}
