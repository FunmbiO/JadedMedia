"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioCategory, PortfolioMedium } from "@/lib/portfolio/types";

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
    return { error: error.message };
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
    return { error: error.message };
  }

  revalidatePortfolioPaths(payload.slug);
  return {};
}

export async function deletePortfolioItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePortfolioPaths();
}
