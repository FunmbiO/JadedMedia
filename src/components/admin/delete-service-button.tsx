"use client";

import { useTransition } from "react";
import { deleteService } from "@/app/admin/services/actions";

export function DeleteServiceButton({
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
            deleteService(id);
          });
        }
      }}
      className="font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
