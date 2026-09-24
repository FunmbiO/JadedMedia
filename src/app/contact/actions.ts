"use server";

import { createClient } from "@/lib/supabase/server";
import { sendLeadNotifications } from "@/lib/email/send-lead-notifications";

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

  // Fails soft internally — the lead above is already saved, so a client's
  // inquiry is never lost even if email isn't configured yet or fails.
  await sendLeadNotifications(payload);

  return {};
}
