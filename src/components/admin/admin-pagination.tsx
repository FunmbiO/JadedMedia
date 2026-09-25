import Link from "next/link";

const linkClass =
  "rounded-full border border-paper/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-paper uppercase transition-colors hover:border-gold hover:text-gold-soft";
const disabledClass =
  "rounded-full border border-paper/10 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-muted-on-ink/40 uppercase";

export function AdminPagination({
  page,
  pageSize,
  totalCount,
  basePath,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <span className="font-sans text-xs text-muted-on-ink">
        Page {page} of {totalPages} &middot; {totalCount} total
      </span>
      <div className="flex items-center gap-3">
        {page > 1 ? (
          <Link href={`${basePath}?page=${page - 1}`} className={linkClass}>
            ← Previous
          </Link>
        ) : (
          <span className={disabledClass}>← Previous</span>
        )}
        {page < totalPages ? (
          <Link href={`${basePath}?page=${page + 1}`} className={linkClass}>
            Next →
          </Link>
        ) : (
          <span className={disabledClass}>Next →</span>
        )}
      </div>
    </div>
  );
}
