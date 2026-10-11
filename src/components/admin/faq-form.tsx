"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Faq } from "@/lib/faqs/types";
import { createFaq, updateFaq, type FaqFormPayload } from "@/app/admin/faqs/actions";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function FaqForm({ faq }: { faq?: Faq }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [sortOrder, setSortOrder] = useState(faq?.sortOrder ?? 0);
  const [published, setPublished] = useState(faq?.published ?? true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: FaqFormPayload = { question, answer, sortOrder, published };

    startTransition(async () => {
      const result = faq ? await updateFaq(faq.id, payload) : await createFaq(payload);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/faqs");
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
        <span className={labelClass}>Question</span>
        <input
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Answer</span>
        <textarea
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className={inputClass}
        />
        <span className="font-sans text-[11px] text-muted-on-ink/70">
          To link somewhere, write it as [link text](/contact) or
          [link text](https://example.com).
        </span>
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
        {isPending ? "Saving…" : faq ? "Save Changes" : "Add Question"}
      </button>
    </form>
  );
}
