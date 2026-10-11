"use client";

import { useTransition } from "react";
import { deleteFaq } from "@/app/admin/faqs/actions";

export function DeleteFaqButton({ id, question }: { id: string; question: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (window.confirm(`Delete "${question}"? This can't be undone.`)) {
          startTransition(() => {
            deleteFaq(id);
          });
        }
      }}
      className="font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
