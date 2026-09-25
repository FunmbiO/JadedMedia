import { createClient } from "@/lib/supabase/server";
import { mapLeadRow, type Lead, type LeadRow } from "@/lib/leads/types";
import { ADMIN_PAGE_SIZE, type PaginatedResult } from "@/lib/pagination";

const SELECT_COLUMNS =
  "id, name, email, phone, event_type, event_date, budget_range, message, status, source, service_id, created_at";

/**
 * Every lead — contact-form inquiries and per-service quote requests
 * alike. Relies on the authenticated-role RLS policy (0006); returns
 * nothing useful for a logged-out caller.
 */
export async function getAllLeadsForAdmin(
  page = 1,
): Promise<PaginatedResult<Lead>> {
  const supabase = await createClient();
  const from = (page - 1) * ADMIN_PAGE_SIZE;
  const to = from + ADMIN_PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("leads")
    .select(SELECT_COLUMNS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("getAllLeadsForAdmin failed:", error.message);
    return { items: [], totalCount: 0, page, pageSize: ADMIN_PAGE_SIZE };
  }

  const rows = data as LeadRow[];
  const serviceIds = [
    ...new Set(
      rows
        .map((row) => row.service_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  let titleByServiceId: Record<string, string> = {};
  if (serviceIds.length > 0) {
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("id, title")
      .in("id", serviceIds);

    if (servicesError) {
      console.error("getAllLeadsForAdmin (service lookup) failed:", servicesError.message);
    } else {
      titleByServiceId = Object.fromEntries(
        (services as { id: string; title: string }[]).map((s) => [s.id, s.title]),
      );
    }
  }

  return {
    items: rows.map((row) =>
      mapLeadRow(row, row.service_id ? (titleByServiceId[row.service_id] ?? null) : null),
    ),
    totalCount: count ?? 0,
    page,
    pageSize: ADMIN_PAGE_SIZE,
  };
}
