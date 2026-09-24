import "server-only";
import { createResendClient } from "@/lib/email/resend-client";
import {
  clientConfirmationEmail,
  studioNotificationEmail,
} from "@/lib/email/templates";
import type { LeadFormPayload } from "@/app/contact/actions";

/**
 * Fails soft, always — the lead is already saved in the database by the
 * time this runs, so a misconfigured or down email provider should never
 * turn into a lost inquiry or a broken form submission for the visitor.
 */
export async function sendLeadNotifications(payload: LeadFormPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const studioEmail = process.env.STUDIO_NOTIFICATION_EMAIL;

  if (!apiKey || !fromEmail || !studioEmail) {
    console.warn(
      "Resend not configured (RESEND_API_KEY/RESEND_FROM_EMAIL/STUDIO_NOTIFICATION_EMAIL) — skipping lead email notifications.",
    );
    return;
  }

  const resend = createResendClient();
  const studio = studioNotificationEmail(payload);
  const client = clientConfirmationEmail(payload);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: fromEmail,
      to: studioEmail,
      subject: studio.subject,
      html: studio.html,
    }),
    resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: client.subject,
      html: client.html,
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Lead notification email (${index === 0 ? "studio" : "client"}) failed:`,
        result.reason,
      );
    }
  });
}
