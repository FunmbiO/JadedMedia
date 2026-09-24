"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadPortfolioImage } from "@/lib/supabase/storage";

export function GalleryImagesUploader({
  values,
  onChange,
}: {
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    setIsUploading(true);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map((file) => uploadPortfolioImage(file)),
      );
      onChange([...values, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-xs font-medium text-muted-on-ink">
        Gallery images
      </span>

      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {values.map((url, index) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded bg-stone">
              <Image src={url} alt="" fill sizes="150px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 font-sans text-xs text-paper hover:bg-ink"
                aria-label="Remove image"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-paper/25 px-4 py-3 text-center transition-colors hover:border-gold/50">
        <span className="font-sans text-[12.5px] text-muted-on-ink">
          {isUploading ? "Uploading…" : "Click to add images"}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) handleFiles(files);
            e.target.value = "";
          }}
        />
      </label>

      {error && <p className="font-sans text-[12px] text-red-300">{error}</p>}
    </div>
  );
}
