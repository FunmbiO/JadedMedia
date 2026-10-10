"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SiteContentMap } from "@/lib/content/queries";

/**
 * Upserts every submitted key in one batch. revalidatePath with the
 * "layout" type clears the whole route tree in one call — content shows
 * up on every page that reads it (home, about, services, contact, faq,
 * the footer on all of them) without having to enumerate each path and
 * risk missing one as new content keys get added later.
 */
export async function updateSiteContent(
  payload: SiteContentMap,
): Promise<{ error?: string }> {
  const rows = Object.entries(payload).map(([key, value]) => ({
    key,
    value: value ?? "",
  }));

  if (rows.length === 0) return {};

  const supabase = await createClient();
  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return {};
}
