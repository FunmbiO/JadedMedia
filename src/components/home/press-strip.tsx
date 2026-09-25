import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

// Recolored to a flat paper tone and masked by each source logo's own
// shape (alpha channel for D1, a luminance threshold for Muir, whose
// original was a flat gray background baked into an opaque PNG) — kept at
// native aspect ratio and displayed at a fixed height so mixed logo shapes
// (a tall square mark vs. a wide wordmark) still sit on one baseline.
// Muted via opacity in CSS rather than baked into the file, so it can
// brighten on hover without a second export.
const CLIENT_LOGOS: ClientLogo[] = [
  { name: "D1 Autotech", src: "/logos/d1-autotech.png", width: 940, height: 1024 },
  { name: "Muir Real Estate Group", src: "/logos/muir-real-estate.png", width: 775, height: 231 },
];

export function PressStrip() {
  return (
    <section className="border-y border-paper/10 bg-ink px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <span className="shrink-0 font-sans text-[11px] tracking-[0.18em] text-paper/55 uppercase">
          Trusted By
        </span>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-14 gap-y-6 sm:w-auto sm:justify-end">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              quality={100}
              className="h-9 w-auto opacity-60 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
