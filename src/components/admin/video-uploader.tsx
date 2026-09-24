"use client";

import { useState } from "react";
import { createVideoUploadUrl } from "@/app/admin/portfolio/video-upload-actions";

export function VideoUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setIsUploading(true);
    setProgress(0);

    try {
      const result = await createVideoUploadUrl(
        file.name,
        file.type || "video/mp4",
      );

      if ("error" in result) {
        setError(result.error);
        return;
      }

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", result.uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type || "video/mp4");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed (${xhr.status})`));
          }
        };
        xhr.onerror = () => reject(new Error("Upload failed — network error"));

        xhr.send(file);
      });

      onChange(result.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isUploading ? (
        <div className="flex flex-col gap-2 rounded border border-paper/20 px-3.5 py-3">
          <span className="font-sans text-[12.5px] text-muted-on-ink">
            Uploading&hellip; {progress}%
          </span>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper/10">
            <div
              className="h-full rounded-full bg-gold transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <label className="flex w-fit cursor-pointer items-center gap-2 rounded border border-dashed border-paper/25 px-4 py-2.5 font-sans text-[12.5px] text-muted-on-ink transition-colors hover:border-gold/50">
          <span>{value ? "Replace video" : "Upload a video file"}</span>
          <input
            type="file"
            accept="video/*"
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

      {error && <p className="font-sans text-[12px] text-red-300">{error}</p>}
    </div>
  );
}
