"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/services/types";
import { slugify } from "@/lib/slugify";
import {
  createService,
  updateService,
  type ServiceFormPayload,
} from "@/app/admin/services/actions";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(service));

  const [title, setTitle] = useState(service?.title ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [bullets, setBullets] = useState<string[]>(
    service?.bullets && service.bullets.length > 0 ? service.bullets : [""],
  );
  const [sortOrder, setSortOrder] = useState(service?.sortOrder ?? 0);
  const [published, setPublished] = useState(service?.published ?? true);

  function updateBullet(index: number, value: string) {
    setBullets((prev) => prev.map((b, i) => (i === index ? value : b)));
  }

  function removeBullet(index: number) {
    setBullets((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: ServiceFormPayload = {
      slug,
      title,
      description,
      bullets,
      sortOrder,
      published,
    };

    startTransition(async () => {
      const result = service
        ? await updateService(service.id, payload)
        : await createService(payload);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin/services");
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
        <span className={labelClass}>Title</span>
        <input
          required
          value={title}
          onChange={(e) => {
            const next = e.target.value;
            setTitle(next);
            if (!slugTouched) setSlug(slugify(next));
          }}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>
          Slug (used as /contact?type=&lt;slug&gt;)
        </span>
        <input
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Description</span>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>What&apos;s included</span>
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              className={`flex-1 ${inputClass}`}
              placeholder="e.g. Full-day photography and/or film coverage"
            />
            <button
              type="button"
              onClick={() => removeBullet(index)}
              disabled={bullets.length === 1}
              className="font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200 disabled:opacity-30"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setBullets((prev) => [...prev, ""])}
          className="w-fit font-sans text-[12px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
        >
          + Add line
        </button>
      </div>

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
        {isPending ? "Saving…" : service ? "Save Changes" : "Create Service"}
      </button>
    </form>
  );
}
