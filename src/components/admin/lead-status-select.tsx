"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/leads/actions";
import type { LeadStatus } from "@/lib/leads/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "booked", "closed"];

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        startTransition(() => {
          updateLeadStatus(id, next);
        });
      }}
      className="rounded border border-paper/20 bg-transparent px-2.5 py-1.5 font-sans text-xs text-paper outline-none focus:border-gold disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-ink-2">
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
