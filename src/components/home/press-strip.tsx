import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

// Recolored to a flat paper tone and masked by each source logo's own
// shape (alpha channel for D1, a luminance threshold for the rest, whose
// originals were a flat background baked into an opaque PNG — light for
// Muir/Mancuso, dark for Atlantic Built) — kept at native aspect ratio and
// displayed at a fixed height so mixed logo shapes (a tall square mark vs.
// a wide wordmark) still sit on one baseline. Muted via opacity in CSS
// rather than baked into the file, so it can brighten on hover without a
// second export.
const CLIENT_LOGOS: ClientLogo[] = [
  { name: "D1 Autotech", src: "/logos/d1-autotech.png", width: 940, height: 1024 },
  { name: "Muir Real Estate Group", src: "/logos/muir-real-estate.png", width: 775, height: 231 },
  { name: "Atlantic Built", src: "/logos/atlantic-built.png", width: 183, height: 164 },
  { name: "Mancuso Clinic", src: "/logos/mancuso-clinic.png", width: 344, height: 76 },
];

export function PressStrip() {
  return (
    <section className="border-y border-paper/10 bg-ink px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-start sm:gap-14">
        <span className="shrink-0 font-sans text-[11px] tracking-[0.18em] text-paper/55 uppercase">
          Trusted By
        </span>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-14 gap-y-6 sm:w-auto sm:justify-start">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              quality={100}
              className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
