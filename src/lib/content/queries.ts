import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_DEFAULTS, type ContentKey } from "@/lib/content/defaults";

export type SiteContentMap = Partial<Record<ContentKey, string>>;

/**
 * All site_content rows as a plain key→value map. Wrapped in React's
 * cache() so the several homepage sections that each call this
 * independently (matching the rest of this codebase's self-fetching
 * component style) still only hit the database once per request.
 */
export const getSiteContent = cache(async (): Promise<SiteContentMap> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("key, value");

  if (error) {
    console.error("getSiteContent failed:", error.message);
    return {};
  }

  return Object.fromEntries(
    data.map((row) => [row.key, row.value]),
  ) as SiteContentMap;
});

/**
 * A single content value with its hardcoded fallback — an empty string in
 * the DB (not yet customized, or deliberately cleared) still falls back
 * to the default rather than rendering blank.
 */
export function pickContent(map: SiteContentMap, key: ContentKey): string {
  const value = map[key];
  return value && value.trim().length > 0 ? value : CONTENT_DEFAULTS[key];
}
