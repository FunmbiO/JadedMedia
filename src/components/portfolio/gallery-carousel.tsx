"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function GalleryCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const el = scrollerRef.current;
    const slide = el?.children[index];
    if (slide instanceof HTMLElement) {
      slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full shrink-0 snap-start bg-stone"
            >
              <Image
                src={url}
                alt={`${alt} — photo ${index + 1}`}
                fill
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="object-cover"
                quality={90}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/50 bg-ink/50 text-paper backdrop-blur-sm transition-opacity hover:bg-ink/70 disabled:pointer-events-none disabled:opacity-0"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                <path
                  d="M7 1L1 7L7 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                scrollToIndex(Math.min(activeIndex + 1, images.length - 1))
              }
              disabled={activeIndex === images.length - 1}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/50 bg-ink/50 text-paper backdrop-blur-sm transition-opacity hover:bg-ink/70 disabled:pointer-events-none disabled:opacity-0"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                <path
                  d="M1 1L7 7L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-paper/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
