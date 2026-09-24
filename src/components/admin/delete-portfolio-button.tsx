"use client";

import { useTransition } from "react";
import { deletePortfolioItem } from "@/app/admin/portfolio/actions";

export function DeletePortfolioButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
          startTransition(() => {
            deletePortfolioItem(id);
          });
        }
      }}
      className="font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
