import { createClient } from "@/lib/supabase/server";
import { mapTestimonialRow, type Testimonial, type TestimonialRow } from "@/lib/testimonials/types";

const SELECT_COLUMNS = "id, quote, name, client_type, published, sort_order, created_at, updated_at";

/** Published testimonials, in display order — for the homepage section. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getPublishedTestimonials failed:", error.message);
    return [];
  }
  return (data as TestimonialRow[]).map(mapTestimonialRow);
}

/**
 * Every testimonial — published and draft alike. Relies on the
 * authenticated-role RLS policy (0013); returns nothing useful for a
 * logged-out caller, since the anon policy only exposes published rows.
 */
export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getAllTestimonialsForAdmin failed:", error.message);
    return [];
  }
  return (data as TestimonialRow[]).map(mapTestimonialRow);
}

/** A single testimonial by id, published or not — for the admin edit form. */
export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getTestimonialById failed:", error.message);
    return null;
  }
  return data ? mapTestimonialRow(data as TestimonialRow) : null;
}
