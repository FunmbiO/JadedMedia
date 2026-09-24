import type { LeadEventType } from "@/app/contact/actions";

export type LeadStatus = "new" | "contacted" | "booked" | "closed";
export type LeadSource = "contact_form" | "quote_popup";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventType: LeadEventType | null;
  eventDate: string | null;
  budgetRange: string | null;
  message: string;
  status: LeadStatus;
  source: LeadSource;
  serviceId: string | null;
  serviceTitle: string | null;
  createdAt: string;
};

/** Raw shape of a leads row, snake_case as Postgres returns it. */
export type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: LeadEventType | null;
  event_date: string | null;
  budget_range: string | null;
  message: string;
  status: LeadStatus;
  source: LeadSource;
  service_id: string | null;
  created_at: string;
};

export function mapLeadRow(row: LeadRow, serviceTitle: string | null): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    eventType: row.event_type,
    eventDate: row.event_date,
    budgetRange: row.budget_range,
    message: row.message,
    status: row.status,
    source: row.source,
    serviceId: row.service_id,
    serviceTitle,
    createdAt: row.created_at,
  };
}
