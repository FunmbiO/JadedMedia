"use server";

import { createClient } from "@/lib/supabase/server";
import { getServiceById } from "@/lib/services/queries";
import { sendQuoteRequestNotifications } from "@/lib/email/send-quote-request-notifications";

export type QuoteRequestPayload = {
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  details: string;
};

// Return a result object rather than calling redirect() here: this action
// is invoked programmatically from a client component (the quote modal,
// not a <form action>), and redirect()'s special throw is easy to
// accidentally swallow in that call site's try/catch.
export async function submitQuoteRequest(
  payload: QuoteRequestPayload,
): Promise<{ error?: string }> {
  if (!payload.name.trim() || !payload.email.trim() || !payload.details.trim()) {
    return { error: "Name, email, and details are required." };
  }

  // getServiceById relies on RLS: anon can only ever see published
  // services, so this also quietly blocks quote requests against a
  // draft/unpublished service that shouldn't be publicly visible yet.
  const service = await getServiceById(payload.serviceId);
  if (!service) {
    return {
      error: "That service couldn't be found — please refresh and try again.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim() || null,
    message: payload.details.trim(),
    service_id: service.id,
    source: "quote_popup",
  });

  if (error) {
    return { error: error.message };
  }

  // Fails soft internally — the lead above is already saved, so a client's
  // request is never lost even if email isn't configured yet or fails.
  await sendQuoteRequestNotifications({
    ...payload,
    serviceTitle: service.title,
  });

  return {};
}
