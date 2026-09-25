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

// Best-effort: the database change (delete row, or update dropping a
// cover/gallery URL) has already succeeded by the time this runs — a
// failure here just means an orphaned file, not a reason to fail the
// request the admin already completed.
async function removeStorageUrls(
  supabase: Awaited<ReturnType<typeof createClient>>,
  urls: string[],
  context: string,
) {
  const paths = urls
    .map(storagePathFromUrl)
    .filter((path): path is string => Boolean(path));

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from(PORTFOLIO_IMAGES_BUCKET).remove(paths);
  if (error) {
    console.error(`Failed to remove Storage files (${context}):`, error.message);
  }
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

  const { data: previous } = await supabase
    .from("portfolio_items")
    .select("cover_image_url, gallery_urls")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("portfolio_items")
    .update(toRow(payload))
    .eq("id", id);

  if (error) {
    return { error: friendlyError(error) };
  }

  // Cleans up both a swapped-out cover image and any gallery photos
  // dropped in this edit — whatever URLs existed before that aren't in
  // the saved payload are gone from the bucket too, not just the row.
  const previousUrls = [previous?.cover_image_url, ...(previous?.gallery_urls ?? [])].filter(
    (url): url is string => Boolean(url),
  );
  const nextUrls = new Set(
    [payload.coverImageUrl, ...payload.galleryUrls].filter(Boolean),
  );
  const removedUrls = previousUrls.filter((url) => !nextUrls.has(url));
  await removeStorageUrls(supabase, removedUrls, `portfolio item ${id} edit`);

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
  await removeStorageUrls(supabase, urls, `deleted portfolio item ${id}`);

  revalidatePortfolioPaths();
}
