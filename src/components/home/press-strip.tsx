import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

// Recolored to a flat paper tone and masked by each source logo's own
// shape (a luminance threshold for all five, whose originals had a flat
// background baked into an opaque PNG — light for Muir/Mancuso, dark for
// D1/Atlantic Built, or a mostly-transparent canvas with an opaque fill
// for Platinum Pro) — kept at native aspect ratio and displayed at a
// fixed height so mixed logo shapes (a tall square mark vs. a wide
// wordmark) still sit on one baseline. Muted via opacity in CSS rather
// than baked into the file, so it can brighten on hover without a second
// export. Height and gaps shrink below `sm` — five logos at the desktop
// size made the strip feel oversized and cramped on narrow phones.
const CLIENT_LOGOS: ClientLogo[] = [
  { name: "D1 Autotech", src: "/logos/d1-autotech.png", width: 928, height: 510 },
  { name: "Muir Real Estate Group", src: "/logos/muir-real-estate.png", width: 775, height: 231 },
  { name: "Atlantic Built", src: "/logos/atlantic-built.png", width: 183, height: 164 },
  { name: "Mancuso Clinic", src: "/logos/mancuso-clinic.png", width: 344, height: 76 },
  { name: "Platinum Pro Construction", src: "/logos/platinum-pro-construction.png", width: 192, height: 144 },
];

export function PressStrip() {
  return (
    <section className="border-y border-paper/10 bg-ink px-6 py-5 md:px-16 md:py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-14">
        <span className="shrink-0 font-sans text-[10px] tracking-[0.18em] text-paper/55 uppercase sm:text-[11px]">
          Trusted By
        </span>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:w-auto sm:justify-start sm:gap-x-14 sm:gap-y-6">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              quality={100}
              className="h-8 w-auto opacity-60 transition-opacity hover:opacity-100 sm:h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
