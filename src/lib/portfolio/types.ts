export type PortfolioCategory = "wedding" | "automotive" | "business";
export type PortfolioMedium = "photo" | "film" | "both";

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  medium: PortfolioMedium;
  summary: string | null;
  story: string | null;
  client: string | null;
  location: string | null;
  coverImageUrl: string | null;
  galleryUrls: string[];
  videoUrl: string | null;
  featured: boolean;
  sortOrder: number;
};

/** Raw shape of a portfolio_items row, snake_case as Postgres returns it. */
export type PortfolioItemRow = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  medium: PortfolioMedium;
  summary: string | null;
  story: string | null;
  client: string | null;
  location: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  video_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapPortfolioRow(row: PortfolioItemRow): PortfolioItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    medium: row.medium,
    summary: row.summary,
    story: row.story,
    client: row.client,
    location: row.location,
    coverImageUrl: row.cover_image_url,
    galleryUrls: row.gallery_urls,
    videoUrl: row.video_url,
    featured: row.featured,
    sortOrder: row.sort_order,
  };
}
