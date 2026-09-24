type VideoPlayerProps = {
  src: string;
  posterUrl?: string | null;
  title: string;
};

/**
 * Native <video> playback — no adaptive bitrate (R2 serves one file as-is),
 * so preload="metadata" avoids pulling the whole file until the visitor
 * actually presses play, while still showing a frame + duration up front.
 */
export function VideoPlayer({ src, posterUrl, title }: VideoPlayerProps) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={posterUrl ?? undefined}
      aria-label={title}
      className="h-full w-full bg-stone object-contain"
    >
      <source src={src} type="video/mp4" />
      Your browser doesn&apos;t support embedded video.{" "}
      <a href={src} className="underline">
        Download the file
      </a>{" "}
      instead.
    </video>
  );
}
