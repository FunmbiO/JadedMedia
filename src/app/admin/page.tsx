import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPortfolioItemsForAdmin } from "@/lib/portfolio/queries";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";
import { DeletePortfolioButton } from "@/components/admin/delete-portfolio-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Jaded Media",
};

export default async function AdminDashboardPage() {
  const items = await getAllPortfolioItemsForAdmin();

  return (
    <div className="flex flex-col gap-8 px-6 py-10 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-paper italic">Portfolio</h1>
        <Link
          href="/admin/portfolio/new"
          className="rounded-full bg-gold px-5 py-2.5 font-sans text-[12px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          + New Entry
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="font-sans text-sm text-muted-on-ink">
          No portfolio entries yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 py-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-stone">
                {item.coverImageUrl && (
                  <Image
                    src={item.coverImageUrl}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                )}
              </div>

              <div className="flex min-w-40 flex-1 flex-col gap-1">
                <span className="font-sans text-sm font-semibold text-paper">
                  {item.title}
                </span>
                <span className="font-sans text-xs text-muted-on-ink">
                  {CATEGORY_LABELS[item.category]} &middot;{" "}
                  {MEDIUM_LABELS[item.medium]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.published ? (
                  <span className="rounded-full bg-sage/20 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-sage uppercase">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-paper/10 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-on-ink uppercase">
                    Draft
                  </span>
                )}
                {item.featured && (
                  <span className="rounded-full bg-gold/15 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-gold-soft uppercase">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/portfolio/${item.id}/edit`}
                  className="font-sans text-[12px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
                >
                  Edit
                </Link>
                <DeletePortfolioButton id={item.id} title={item.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
