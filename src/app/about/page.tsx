import type { Metadata } from "next";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "About | Jaded Media",
  description:
    "The studio behind Jaded Media — photography and film for weddings, automotive, and business & brand.",
};

const VALUES = [
  {
    title: "Unscripted",
    description:
      "We shoot what's actually happening, not a staged version of it. The best moments are the ones nobody planned.",
  },
  {
    title: "Editorial",
    description:
      "Every frame is composed and graded with the same care as a magazine feature — never a quick phone-quality shot.",
  },
  {
    title: "Built to Last",
    description:
      "Trends fade. We shoot and edit for how a photo or film will feel in twenty years, not just this season.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col gap-20 px-6 py-20 md:px-16 md:py-28">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            About
          </span>
          <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
            The studio behind the work.
          </h1>
          <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
            Jaded Media is a photography &amp; videography studio built
            around one belief: the best work isn&apos;t staged, it&apos;s
            noticed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative flex aspect-[4/3] items-end bg-beige p-5">
            <span className="text-[10px] tracking-[0.1em] text-ink/45 uppercase">
              [ Studio / behind-the-scenes photo ]
            </span>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <h2 className="font-display text-2xl font-light text-paper italic sm:text-3xl">
              &ldquo;We don&apos;t just document moments &mdash; we
              translate feeling into photo and film.&rdquo;
            </h2>
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              [Add the full founding story here — who started Jaded
              Media, why, and what the studio has grown into since.]
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-display text-base text-paper italic">
                Jaded Media, Est. 2019
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-t border-paper/15 pt-14 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-gold-soft">
              [ # ]
            </span>
            <span className="font-sans text-sm text-muted-on-ink">
              [Add years in business]
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-gold-soft">
              [ # ]
            </span>
            <span className="font-sans text-sm text-muted-on-ink">
              [Add projects delivered]
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-gold-soft">
              [ # ]
            </span>
            <span className="font-sans text-sm text-muted-on-ink">
              [Add another stat worth sharing]
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="font-display text-2xl font-normal text-paper sm:text-3xl">
            How we work.
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-3 border-t border-paper/15 pt-6"
              >
                <h3 className="font-display text-xl text-paper italic">
                  {value.title}
                </h3>
                <p className="font-sans text-[14.5px] leading-relaxed font-light text-muted-on-ink">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
