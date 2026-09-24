import { createClient } from "@/lib/supabase/server";
import {
  mapPortfolioRow,
  type PortfolioCategory,
  type PortfolioItem,
  type PortfolioItemRow,
} from "@/lib/portfolio/types";

const SELECT_COLUMNS =
  "id, slug, title, category, medium, summary, story, client, location, cover_image_url, gallery_urls, video_url, featured, published, sort_order, created_at, updated_at";

/** Published portfolio items, optionally filtered by category. */
export async function getPublishedPortfolioItems(
  category?: PortfolioCategory,
): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  let query = supabase
    .from("portfolio_items")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedPortfolioItems failed:", error.message);
    return [];
  }
  return (data as PortfolioItemRow[]).map(mapPortfolioRow);
}

/** Published + featured items, for the homepage grid. */
export async function getFeaturedPortfolioItems(
  limit = 5,
): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedPortfolioItems failed:", error.message);
    return [];
  }
  return (data as PortfolioItemRow[]).map(mapPortfolioRow);
}

/** A single published item by slug, or null if not found/not published. */
export async function getPortfolioItemBySlug(
  slug: string,
): Promise<PortfolioItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getPortfolioItemBySlug failed:", error.message);
    return null;
  }
  return data ? mapPortfolioRow(data as PortfolioItemRow) : null;
}

/**
 * Every portfolio item — published and draft alike. Relies on the
 * authenticated-role RLS policy (0005); returns nothing useful for a
 * logged-out caller, since the anon policy only exposes published rows.
 */
export async function getAllPortfolioItemsForAdmin(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPortfolioItemsForAdmin failed:", error.message);
    return [];
  }
  return (data as PortfolioItemRow[]).map(mapPortfolioRow);
}

/** A single item by id, published or not — for the admin edit form. */
export async function getPortfolioItemById(
  id: string,
): Promise<PortfolioItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_items")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getPortfolioItemById failed:", error.message);
    return null;
  }
  return data ? mapPortfolioRow(data as PortfolioItemRow) : null;
}
