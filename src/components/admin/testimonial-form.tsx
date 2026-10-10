"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/lib/testimonials/types";
import {
  createTestimonial,
  updateTestimonial,
  type TestimonialFormPayload,
} from "@/app/admin/testimonials/actions";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [quote, setQuote] = useState(testimonial?.quote ?? "");
  const [name, setName] = useState(testimonial?.name ?? "");
  const [clientType, setClientType] = useState(testimonial?.clientType ?? "");
  const [sortOrder, setSortOrder] = useState(testimonial?.sortOrder ?? 0);
  const [published, setPublished] = useState(testimonial?.published ?? true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: TestimonialFormPayload = {
      quote,
      name,
      clientType,
      sortOrder,
      published,
    };

    startTransition(async () => {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, payload)
        : await createTestimonial(payload);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/testimonials");
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-2xl flex-col gap-6 px-6 py-10 md:px-10"
    >
      {error && (
        <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
          {error}
        </p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Quote</span>
        <textarea
          required
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Client name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>
          Client type (e.g. &ldquo;Wedding client&rdquo;)
        </span>
        <input
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Display order (lower shows first)</span>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className={`max-w-32 ${inputClass}`}
        />
      </label>

      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        <span className="font-sans text-sm text-paper">
          Published (visible to site visitors)
        </span>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving…" : testimonial ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}
