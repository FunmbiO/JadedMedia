import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "About | Jaded Media",
  description:
    "Meet the person behind Jaded Media — photo and film for weddings, cars, and business.",
};

const VALUES = [
  {
    title: "Unscripted",
    description:
      "I shoot what's happening, not a staged version of it. The best moments are the ones nobody planned.",
  },
  {
    title: "Editorial",
    description:
      "Every photo is shot and edited with care, not rushed out like a phone snap.",
  },
  {
    title: "Built to Last",
    description:
      "Trends fade. I shoot for how it'll look in twenty years, not just this year.",
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
            The person behind the work.
          </h1>
          <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
            It&apos;s just me and a camera. I don&apos;t stage shots, I
            catch what&apos;s happening.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-beige">
            <Image
              src="/founder.avif"
              alt="Olufunmbi Olajubu, founder of Jaded Media"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center gap-5">
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              Hey, I&apos;m Olufunmbi Olajubu &mdash; one might call it
              cliché, but I&apos;m quite literally just a guy with a
              camera. I love representing the moment as accurately as I
              can through photo or video. As I&apos;d like to say,
              I&apos;m a visual storyteller.
            </p>
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              You might be slightly confused seeing this website,
              wondering exactly what I specialize in&hellip; Nothing. I
              don&apos;t stick to just one style of photography or
              videography; I capture everything from weddings to
              landscapes, portraits to events, and even the
              &mdash;<em className="italic">ahem</em>&mdash; boring
              company and business shoots.
            </p>
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              Some say, &ldquo;Jack of all trades, master of
              none,&rdquo; but I believe the full quote fits me better:
              &ldquo;Jack of all trades, master of none, but oftentimes
              better than the master of one.&rdquo; (Not to brag,
              obviously.)
            </p>
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              Every project teaches me something new, and I embrace the
              challenge of making every frame, every shot, and every
              story as captivating as possible. No matter the setting,
              I bring creativity, adaptability, and a keen eye for
              detail to every shoot.
            </p>
            <p className="max-w-md font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
              So yeah &mdash; book me and whatnot.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-gold" />
              <span className="font-display text-base text-paper italic">
                Olufunmbi Olajubu &mdash; Photographer &amp; Filmmaker
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="font-display text-2xl font-normal text-paper sm:text-3xl">
            How I work.
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
