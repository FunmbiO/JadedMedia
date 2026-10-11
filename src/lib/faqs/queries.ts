import { createClient } from "@/lib/supabase/server";
import { mapFaqRow, type Faq, type FaqRow } from "@/lib/faqs/types";

const SELECT_COLUMNS = "id, question, answer, published, sort_order, created_at, updated_at";

/** Published FAQs, in display order — for the public /faq page. */
export async function getPublishedFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getPublishedFaqs failed:", error.message);
    return [];
  }
  return (data as FaqRow[]).map(mapFaqRow);
}

/**
 * Every FAQ — published and draft alike. Relies on the authenticated-role
 * RLS policy (0014); returns nothing useful for a logged-out caller, since
 * the anon policy only exposes published rows.
 */
export async function getAllFaqsForAdmin(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getAllFaqsForAdmin failed:", error.message);
    return [];
  }
  return (data as FaqRow[]).map(mapFaqRow);
}

/** A single FAQ by id, published or not — for the admin edit form. */
export async function getFaqById(id: string): Promise<Faq | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getFaqById failed:", error.message);
    return null;
  }
  return data ? mapFaqRow(data as FaqRow) : null;
}
