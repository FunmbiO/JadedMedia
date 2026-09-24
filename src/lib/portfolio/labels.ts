import type { PortfolioCategory, PortfolioMedium } from "@/lib/portfolio/types";

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  wedding: "Weddings",
  automotive: "Automotive",
  business: "Business & Brand",
};

export const MEDIUM_LABELS: Record<PortfolioMedium, string> = {
  photo: "Photography",
  film: "Film",
  both: "Photo & Film",
};
