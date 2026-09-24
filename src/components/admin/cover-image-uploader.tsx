"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadPortfolioImage } from "@/lib/supabase/storage";

export function CoverImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setIsUploading(true);
    try {
      const url = await uploadPortfolioImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-xs font-medium text-muted-on-ink">
        Cover image
      </span>

      {value ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded bg-stone">
          <Image src={value} alt="" fill sizes="384px" className="object-contain" quality={90} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-semibold text-paper hover:bg-ink"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed border-paper/25 bg-transparent text-center transition-colors hover:border-gold/50">
          <span className="font-sans text-[12.5px] text-muted-on-ink">
            {isUploading ? "Uploading…" : "Click to upload an image"}
          </span>
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </label>
      )}

      {error && (
        <p className="font-sans text-[12px] text-red-300">{error}</p>
      )}
    </div>
  );
}
