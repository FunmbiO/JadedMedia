"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadPortfolioImage } from "@/lib/supabase/storage";

export function AvatarUploader({
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
        Photo (shown beside the quote)
      </span>

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-stone">
          {value && (
            <Image src={value} alt="" fill sizes="64px" className="object-cover" />
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded border border-dashed border-paper/25 px-4 py-2.5 text-center transition-colors hover:border-gold/50">
          <span className="font-sans text-[12.5px] text-muted-on-ink">
            {isUploading ? "Uploading…" : value ? "Replace photo" : "Click to upload"}
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

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-sans text-[12px] font-semibold text-red-300 hover:text-red-200"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="font-sans text-[12px] text-red-300">{error}</p>}
    </div>
  );
}
