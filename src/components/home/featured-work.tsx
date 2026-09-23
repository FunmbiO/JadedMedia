import Link from "next/link";

type WorkItem = {
  category: string;
  title: string;
  bg: string;
  onLight: boolean;
  playSize: number;
};

const TOP_ROW: WorkItem[] = [
  {
    category: "Wedding Film · Sample",
    title: "The Hamptons — Coastal Editorial",
    bg: "bg-stone-2",
    onLight: false,
    playSize: 68,
  },
  {
    category: "Automotive Photography · Sample",
    title: "1967 Porsche 911 — Track Day",
    bg: "bg-beige",
    onLight: true,
    playSize: 60,
  },
];

const BOTTOM_ROW: WorkItem[] = [
  {
    category: "Automotive Film · Sample",
    title: "Midnight Run — GT3 RS",
    bg: "bg-stone-2",
    onLight: false,
    playSize: 52,
  },
  {
    category: "Business Film · Sample",
    title: "Kinfolk Coffee Roasters",
    bg: "bg-sage",
    onLight: true,
    playSize: 52,
  },
  {
    category: "Wedding Photography · Sample",
    title: "Lake Como — Sofia & Luca",
    bg: "bg-stone-2",
    onLight: false,
    playSize: 52,
  },
];

function WorkCard({ item, className }: { item: WorkItem; className?: string }) {
  const textColor = item.onLight ? "text-ink" : "text-paper";
  const mutedTextColor = item.onLight ? "text-ink/60" : "text-gold-soft";
  const ringColor = item.onLight
    ? "border-ink/45 text-ink"
    : "border-paper/60 text-paper";

  return (
    <div
      className={`group relative overflow-hidden rounded-md ${item.bg} ${className ?? ""}`}
    >
      <div className="absolute inset-3 flex items-start justify-end sm:inset-5">
        <span
          className={`font-sans text-[10px] tracking-[0.1em] uppercase ${item.onLight ? "text-ink/40" : "text-paper/40"}`}
        >
          [ Film still ]
        </span>
      </div>

      <div
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-transform group-hover:scale-105 ${ringColor}`}
        style={{ width: item.playSize, height: item.playSize }}
        aria-hidden
      >
        <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
          <path
            d="M1 1.5V18.5L17 10L1 1.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 sm:bottom-6 sm:left-6">
        <span
          className={`font-sans text-[10.5px] font-semibold tracking-[0.12em] uppercase ${mutedTextColor}`}
        >
          {item.category}
        </span>
        <span
          className={`font-display text-lg italic sm:text-xl ${textColor}`}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="bg-paper px-6 py-20 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-14">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-deep uppercase">
              Selected Work
            </span>
            <h2 className="font-display text-3xl font-normal text-ink sm:text-4xl md:text-[52px]">
              Work worth a second look.
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 border-b border-ink/30 pb-1 font-sans text-[13px] font-semibold text-ink/80 transition-opacity hover:opacity-70"
          >
            View Full Portfolio &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <WorkCard item={TOP_ROW[0]} className="h-72 sm:col-span-2 sm:h-[560px]" />
            <WorkCard item={TOP_ROW[1]} className="h-56 sm:h-[560px]" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {BOTTOM_ROW.map((item) => (
              <WorkCard key={item.title} item={item} className="h-56 sm:h-[360px]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
