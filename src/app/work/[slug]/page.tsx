import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPortfolioItemBySlug } from "@/lib/portfolio/queries";
import { CATEGORY_LABELS, MEDIUM_LABELS } from "@/lib/portfolio/labels";
import { VideoPlayer } from "@/components/portfolio/video-player";
import { GalleryCarousel } from "@/components/portfolio/gallery-carousel";

// Portfolio content changes independently of deploys — render per request
// rather than trying to statically generate against the database at build
// time (there's also no live DB reachable during this project's builds yet).
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Jaded Media`,
    description: item.summary ?? undefined,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const hasGallery = item.galleryUrls.length > 0;

  return (
    <article className="flex flex-col">
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-12 md:px-16 md:pt-20">
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-stone">
          {item.videoUrl ? (
            <VideoPlayer
              src={item.videoUrl}
              posterUrl={item.coverImageUrl}
              title={item.title}
            />
          ) : item.coverImageUrl ? (
            <Image
              src={item.coverImageUrl}
              alt={item.title}
              fill
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="object-contain"
              quality={90}
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-sans text-[11px] tracking-[0.1em] text-paper/40 uppercase">
                [ Add cover media for this project ]
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-8 px-6 pt-10 pb-16 md:px-16 md:pt-14 md:pb-24">
        <Link
          href="/work"
          className="w-fit font-sans text-[13px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
        >
          &larr; Back to Work
        </Link>

        <div className="flex flex-col gap-4">
          <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-gold uppercase">
            {CATEGORY_LABELS[item.category]} &middot; {MEDIUM_LABELS[item.medium]}
          </span>
          <h1 className="font-display text-3xl font-normal text-paper italic sm:text-4xl md:text-5xl">
            {item.title}
          </h1>
          {(item.client || item.location) && (
            <span className="font-sans text-sm text-muted-on-ink">
              {[item.client, item.location].filter(Boolean).join(" — ")}
            </span>
          )}
        </div>

        <p className="max-w-[640px] font-sans text-base leading-relaxed font-light text-paper/85 whitespace-pre-line">
          {item.story ?? "[Add the full project story for this page.]"}
        </p>
      </div>

      {hasGallery && (
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-6 pb-16 md:px-16 md:pb-24">
          <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-gold uppercase">
            Gallery
          </span>
          <GalleryCarousel images={item.galleryUrls} alt={item.title} />
        </div>
      )}
    </article>
  );
}
