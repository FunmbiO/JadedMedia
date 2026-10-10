"use client";

import { useTransition } from "react";
import { deleteTestimonial } from "@/app/admin/testimonials/actions";

export function DeleteTestimonialButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (window.confirm(`Delete the testimonial from "${name}"? This can't be undone.`)) {
          startTransition(() => {
            deleteTestimonial(id);
          });
        }
      }}
      className="font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
