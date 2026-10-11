"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials/types";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  function go(delta: 1 | -1) {
    setIndex((current) => (current + delta + testimonials.length) % testimonials.length);
  }

  return (
    <div className="mx-auto flex max-w-[820px] flex-col items-center gap-8">
      <div className="flex w-full items-center gap-4 sm:gap-8">
        {testimonials.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            &larr;
          </button>
        )}

        <div className="flex flex-1 flex-col items-center gap-7 text-center">
          <span
            aria-hidden
            className="font-display text-6xl leading-none text-gold-deep opacity-55 sm:text-8xl"
          >
            &ldquo;
          </span>
          <p className="font-accent text-xl leading-relaxed font-light text-ink sm:text-2xl md:text-[32px]">
            {testimonial.quote}
          </p>
          <div className="mt-3 flex items-center gap-3.5">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-beige">
              {testimonial.photoUrl && (
                <Image
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-brush text-lg text-ink">{testimonial.name}</span>
              <span className="font-sans text-[12.5px] text-muted-on-paper">
                {testimonial.clientType}
              </span>
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            &rarr;
          </button>
        )}
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold-deep" : "w-1.5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
