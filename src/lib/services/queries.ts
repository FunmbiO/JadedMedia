import { createClient } from "@/lib/supabase/server";
import { mapServiceRow, type Service, type ServiceRow } from "@/lib/services/types";

const SELECT_COLUMNS =
  "id, slug, title, description, bullets, published, sort_order, created_at, updated_at";

/** Published services, in display order — for /services and the homepage teaser. */
export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getPublishedServices failed:", error.message);
    return [];
  }
  return (data as ServiceRow[]).map(mapServiceRow);
}

/**
 * Every service — published and draft alike. Relies on the
 * authenticated-role RLS policy (0007); returns nothing useful for a
 * logged-out caller, since the anon policy only exposes published rows.
 */
export async function getAllServicesForAdmin(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getAllServicesForAdmin failed:", error.message);
    return [];
  }
  return (data as ServiceRow[]).map(mapServiceRow);
}

/** A single service by id, published or not — for the admin edit form. */
export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getServiceById failed:", error.message);
    return null;
  }
  return data ? mapServiceRow(data as ServiceRow) : null;
}
