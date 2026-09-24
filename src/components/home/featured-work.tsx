import Link from "next/link";
import { getFeaturedPortfolioItems } from "@/lib/portfolio/queries";
import { WorkCard } from "@/components/home/work-card";

export async function FeaturedWork() {
  const items = await getFeaturedPortfolioItems(5);

  return (
    <section id="work" className="bg-paper px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-deep uppercase">
              Selected Work
            </span>
            <h2 className="font-display text-3xl font-normal text-ink sm:text-4xl md:text-[52px]">
              Work worth a second look.
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 border-b border-ink/30 pb-1 font-sans text-[13px] font-semibold text-ink/80 transition-opacity hover:opacity-70"
          >
            View Full Portfolio &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-ink/15 py-20 text-center">
            <span className="font-display text-xl text-ink/70 italic">
              New work is on the way.
            </span>
            <p className="max-w-md font-sans text-sm font-light text-muted-on-paper">
              This grid fills in as projects are published.
            </p>
          </div>
        ) : items.length === 1 ? (
          <WorkCard item={items[0]} className="h-80 w-full sm:h-[560px]" />
        ) : items.length === 2 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {items.map((item) => (
              <WorkCard key={item.id} item={item} className="h-72 sm:h-[480px]" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            <WorkCard item={items[0]} className="h-80 w-full sm:h-[500px]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {items.slice(1).map((item) => (
                <WorkCard key={item.id} item={item} className="h-56 sm:h-[320px]" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
