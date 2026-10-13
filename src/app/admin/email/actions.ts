"use server";

import { createClient } from "@/lib/supabase/server";
import { createResendClient, formatFromAddress } from "@/lib/email/resend-client";
import { customAdminEmail } from "@/lib/email/templates";

export type SendAdminEmailPayload = {
  to: string;
  subject: string;
  message: string;
};

/**
 * Sends a one-off branded email to any address. Unlike the DB-backed admin
 * actions elsewhere, there's no RLS policy standing between an unauthenticated
 * caller and this — a Server Action is a reachable endpoint on its own — so
 * the auth check here is load-bearing, not a formality.
 */
export async function sendAdminEmail(
  payload: SendAdminEmailPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to be signed in to send email." };
  }

  const to = payload.to.trim();
  const subject = payload.subject.trim();
  const message = payload.message.trim();

  if (!to || !subject || !message) {
    return { error: "Fill in the recipient, subject, and message." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return {
      error:
        "Email isn't connected yet — RESEND_API_KEY and RESEND_FROM_EMAIL need to be set.",
    };
  }

  const resend = createResendClient();
  const email = customAdminEmail(subject, message);

  const { error } = await resend.emails.send({
    from: formatFromAddress(fromEmail),
    to,
    replyTo: fromEmail,
    subject: email.subject,
    html: email.html,
  });

  if (error) {
    return { error: error.message };
  }

  return {};
}
