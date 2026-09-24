"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  PortfolioCategory,
  PortfolioItem,
  PortfolioMedium,
} from "@/lib/portfolio/types";
import { slugify } from "@/lib/slugify";
import {
  createPortfolioItem,
  updatePortfolioItem,
  type PortfolioFormPayload,
} from "@/app/admin/portfolio/actions";
import { CoverImageUploader } from "@/components/admin/cover-image-uploader";
import { GalleryImagesUploader } from "@/components/admin/gallery-images-uploader";
import { VideoUploader } from "@/components/admin/video-uploader";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function PortfolioForm({ item }: { item?: PortfolioItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(item));

  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [category, setCategory] = useState<PortfolioCategory>(
    item?.category ?? "wedding",
  );
  const [medium, setMedium] = useState<PortfolioMedium>(item?.medium ?? "photo");
  const [summary, setSummary] = useState(item?.summary ?? "");
  const [story, setStory] = useState(item?.story ?? "");
  const [clientName, setClientName] = useState(item?.client ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [videoUrl, setVideoUrl] = useState(item?.videoUrl ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(item?.coverImageUrl ?? "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(item?.galleryUrls ?? []);
  const [featured, setFeatured] = useState(item?.featured ?? false);
  const [published, setPublished] = useState(item?.published ?? false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: PortfolioFormPayload = {
      slug,
      title,
      category,
      medium,
      summary,
      story,
      client: clientName,
      location,
      coverImageUrl,
      galleryUrls,
      videoUrl,
      featured,
      published,
    };

    startTransition(async () => {
      const result = item
        ? await updatePortfolioItem(item.id, payload)
        : await createPortfolioItem(payload);

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/admin");
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
        <span className={labelClass}>Slug (URL: /work/&lt;slug&gt;)</span>
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

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
            className={inputClass}
          >
            <option value="wedding">Weddings</option>
            <option value="automotive">Automotive</option>
            <option value="business">Business &amp; Brand</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Medium</span>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value as PortfolioMedium)}
            className={inputClass}
          >
            <option value="photo">Photography</option>
            <option value="film">Film</option>
            <option value="both">Photo &amp; Film</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Summary (shown on the work grid)</span>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Story (shown on the project page)</span>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
          className={inputClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Client (optional)</span>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Location (optional)</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Video (optional)</span>
        <VideoUploader value={videoUrl} onChange={setVideoUrl} />
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://pub-xxxx.r2.dev/your-film.mp4"
          className={inputClass}
        />
        <span className="font-sans text-[11px] text-muted-on-ink/70">
          Upload above, or paste an existing R2 URL directly.
        </span>
      </div>

      <CoverImageUploader value={coverImageUrl} onChange={setCoverImageUrl} />
      <GalleryImagesUploader values={galleryUrls} onChange={setGalleryUrls} />

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          <span className="font-sans text-sm text-paper">
            Featured (show on the homepage)
          </span>
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
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving…" : item ? "Save Changes" : "Create Entry"}
      </button>
    </form>
  );
}
