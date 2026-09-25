"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { PORTFOLIO_IMAGES_BUCKET } from "@/lib/supabase/storage-bucket";
import type { PortfolioCategory, PortfolioMedium } from "@/lib/portfolio/types";

const SLUG_UNIQUE_VIOLATION = "23505";

function friendlyError(error: { code?: string; message: string }): string {
  if (error.code === SLUG_UNIQUE_VIOLATION) {
    return "That slug is already taken — pick a different one.";
  }
  return error.message;
}

// Public Storage URLs look like
// `.../storage/v1/object/public/Portfolio%20Images/<path>` — pull the
// path back out so a delete can also remove the underlying file.
function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${encodeURIComponent(PORTFOLIO_IMAGES_BUCKET)}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export type PortfolioFormPayload = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  medium: PortfolioMedium;
  summary: string;
  story: string;
  client: string;
  location: string;
  coverImageUrl: string;
  galleryUrls: string[];
  videoUrl: string;
  featured: boolean;
  published: boolean;
};

function toRow(payload: PortfolioFormPayload) {
  return {
    slug: payload.slug,
    title: payload.title,
    category: payload.category,
    medium: payload.medium,
    summary: payload.summary || null,
    story: payload.story || null,
    client: payload.client || null,
    location: payload.location || null,
    cover_image_url: payload.coverImageUrl || null,
    gallery_urls: payload.galleryUrls,
    video_url: payload.videoUrl || null,
    featured: payload.featured,
    published: payload.published,
  };
}

function revalidatePortfolioPaths(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/");
  if (slug) revalidatePath(`/work/${slug}`);
}

// Return a result object rather than calling redirect() here: this action
// is invoked programmatically from a client component (not a <form action>),
// and redirect()'s special throw is easy to accidentally swallow in that
// call site's try/catch. The form navigates itself on success instead.
export async function createPortfolioItem(
  payload: PortfolioFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").insert(toRow(payload));

  if (error) {
    return { error: friendlyError(error) };
  }

  revalidatePortfolioPaths(payload.slug);
  return {};
}

export async function updatePortfolioItem(
  id: string,
  payload: PortfolioFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_items")
    .update(toRow(payload))
    .eq("id", id);

  if (error) {
    return { error: friendlyError(error) };
  }

  revalidatePortfolioPaths(payload.slug);
  return {};
}

export async function deletePortfolioItem(id: string) {
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("portfolio_items")
    .select("cover_image_url, gallery_urls")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("portfolio_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(friendlyError(error));
  }

  const urls = [item?.cover_image_url, ...(item?.gallery_urls ?? [])].filter(
    (url): url is string => Boolean(url),
  );
  const paths = urls
    .map(storagePathFromUrl)
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from(PORTFOLIO_IMAGES_BUCKET)
      .remove(paths);
    if (storageError) {
      // The database row is already gone — this is cleanup, not a reason
      // to fail the delete the admin just confirmed.
      console.error(
        `Failed to remove Storage files for deleted portfolio item ${id}:`,
        storageError.message,
      );
    }
  }

  revalidatePortfolioPaths();
}
