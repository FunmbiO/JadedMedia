import type { LeadEventType } from "@/app/contact/actions";

export const EVENT_TYPE_LABELS: Record<LeadEventType, string> = {
  wedding: "Wedding",
  automotive: "Automotive",
  business: "Business & Brand",
  other: "Something else",
};

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export function isLeadEventType(value: string): value is LeadEventType {
  return value === "wedding" || value === "automotive" || value === "business" || value === "other";
}
