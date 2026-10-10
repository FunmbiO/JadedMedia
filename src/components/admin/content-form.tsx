"use client";

import { useState, useTransition } from "react";
import type { SiteContentMap } from "@/lib/content/queries";
import { CONTENT_DEFAULTS } from "@/lib/content/defaults";
import { CONTENT_SECTIONS } from "@/components/admin/content-form-sections";
import { VideoUploader } from "@/components/admin/video-uploader";
import { updateSiteContent } from "@/app/admin/content/actions";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function ContentForm({ initial }: { initial: SiteContentMap }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const key of Object.keys(CONTENT_DEFAULTS)) {
      map[key] = initial[key as keyof typeof CONTENT_DEFAULTS] ?? CONTENT_DEFAULTS[key as keyof typeof CONTENT_DEFAULTS];
    }
    return map;
  });

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateSiteContent(values);
      if (result.error) {
        setError(result.error);
        return;
      }
      setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-10 px-6 py-10 md:px-10">
      {error && (
        <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
          {error}
        </p>
      )}

      <details open className="group flex flex-col gap-5 border-t border-paper/15 pt-6">
        <summary className="cursor-pointer font-display text-lg text-paper">
          Hero background video
        </summary>
        <p className="font-sans text-[12.5px] leading-relaxed text-muted-on-ink">
          Plays full-bleed, muted and looping, behind the homepage hero text.
          Leave empty to keep the placeholder panel instead.
        </p>
        <VideoUploader
          value={values.hero_video_url}
          onChange={(url) => setValue("hero_video_url", url)}
        />
        {values.hero_video_url && (
          <button
            type="button"
            onClick={() => setValue("hero_video_url", "")}
            className="w-fit font-sans text-[12px] font-semibold text-red-300 transition-colors hover:text-red-200"
          >
            Remove video
          </button>
        )}
      </details>

      {CONTENT_SECTIONS.map((section) => (
        <details key={section.title} open className="group flex flex-col gap-5 border-t border-paper/15 pt-6">
          <summary className="cursor-pointer font-display text-lg text-paper">
            {section.title}
          </summary>
          {section.fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-1.5">
              <span className={labelClass}>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.key]}
                  onChange={(e) => setValue(field.key, e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              ) : (
                <input
                  value={values[field.key]}
                  onChange={(e) => setValue(field.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </label>
          ))}
        </details>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
        {saved && !isPending && (
          <span className="font-sans text-[12.5px] text-sage">Saved.</span>
        )}
      </div>
    </form>
  );
}
