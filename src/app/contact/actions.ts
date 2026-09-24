"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadEventType = "wedding" | "automotive" | "business" | "other";

export type LeadFormPayload = {
  name: string;
  email: string;
  phone: string;
  eventType: LeadEventType;
  eventDate: string;
  budgetRange: string;
  message: string;
};

export async function submitLead(
  payload: LeadFormPayload,
): Promise<{ error?: string }> {
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { error: "Name, email, and message are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim() || null,
    event_type: payload.eventType,
    event_date: payload.eventDate || null,
    budget_range: payload.budgetRange || null,
    message: payload.message.trim(),
  });

  if (error) {
    return { error: error.message };
  }

  // Email notifications (Resend) are wired up separately — the lead is
  // saved either way, so a client's inquiry is never lost even if email
  // sending fails or isn't configured yet.

  return {};
}
