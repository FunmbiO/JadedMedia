import "server-only";
import { createResendClient } from "@/lib/email/resend-client";
import {
  quoteRequestConfirmationEmail,
  quoteRequestNotificationEmail,
} from "@/lib/email/templates";
import type { QuoteRequestPayload } from "@/app/services/actions";

/**
 * Fails soft, always — the lead is already saved in the database by the
 * time this runs, so a misconfigured or down email provider should never
 * turn into a lost inquiry or a broken form submission for the visitor.
 */
export async function sendQuoteRequestNotifications(
  payload: QuoteRequestPayload & { serviceTitle: string },
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const studioEmail = process.env.STUDIO_NOTIFICATION_EMAIL;

  if (!apiKey || !fromEmail || !studioEmail) {
    console.warn(
      "Resend not configured (RESEND_API_KEY/RESEND_FROM_EMAIL/STUDIO_NOTIFICATION_EMAIL) — skipping quote request email notifications.",
    );
    return;
  }

  const resend = createResendClient();
  const owner = quoteRequestNotificationEmail(payload);
  const client = quoteRequestConfirmationEmail(payload);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: fromEmail,
      to: studioEmail,
      subject: owner.subject,
      html: owner.html,
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
        `Quote request notification email (${index === 0 ? "owner" : "client"}) failed:`,
        result.reason,
      );
    }
  });
}
