import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPublishedPortfolioItems } from "@/lib/portfolio/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getPublishedPortfolioItems();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_CONFIG.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_CONFIG.siteUrl}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_CONFIG.siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_CONFIG.siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.siteUrl}/faq`, changeFrequency: "monthly", priority: 0.4 },
    // /privacy and /terms deliberately left out — still placeholder
    // "coming soon" pages, nothing worth Google indexing yet.
  ];

  const workRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_CONFIG.siteUrl}/work/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...workRoutes];
}
