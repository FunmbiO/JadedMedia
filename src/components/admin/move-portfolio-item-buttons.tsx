"use client";

import { useTransition } from "react";
import { movePortfolioItem } from "@/app/admin/portfolio/actions";

export function MovePortfolioItemButtons({
  id,
  isFirst,
  isLast,
}: {
  id: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={isPending || isFirst}
        onClick={() => startTransition(() => movePortfolioItem(id, "up"))}
        aria-label="Move up"
        className="flex h-6 w-6 items-center justify-center rounded-full font-sans text-xs text-muted-on-ink transition-colors hover:text-paper disabled:opacity-25"
      >
        &uarr;
      </button>
      <button
        type="button"
        disabled={isPending || isLast}
        onClick={() => startTransition(() => movePortfolioItem(id, "down"))}
        aria-label="Move down"
        className="flex h-6 w-6 items-center justify-center rounded-full font-sans text-xs text-muted-on-ink transition-colors hover:text-paper disabled:opacity-25"
      >
        &darr;
      </button>
    </div>
  );
}
