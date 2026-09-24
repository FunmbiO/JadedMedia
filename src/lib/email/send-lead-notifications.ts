import "server-only";
import { createResendClient } from "@/lib/email/resend-client";
import {
  clientConfirmationEmail,
  teamNotificationEmail,
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
  const teamEmail = process.env.JADEDMEDIA_TEAM_EMAIL;

  if (!apiKey || !fromEmail || !teamEmail) {
    console.warn(
      "Resend not configured (RESEND_API_KEY/RESEND_FROM_EMAIL/JADEDMEDIA_TEAM_EMAIL) — skipping lead email notifications.",
    );
    return;
  }

  const resend = createResendClient();
  const team = teamNotificationEmail(payload);
  const client = clientConfirmationEmail(payload);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: fromEmail,
      to: teamEmail,
      subject: team.subject,
      html: team.html,
    }),
    resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: client.subject,
      html: client.html,
    }),
  ]);

  results.forEach((result, index) => {
    const label = index === 0 ? "team" : "client";
    if (result.status === "rejected") {
      console.error(`Lead notification email (${label}) failed:`, result.reason);
    } else if (result.value.error) {
      // The Resend SDK resolves (doesn't reject) on an API-level error like
      // an unverified sending domain — it comes back as { error } instead
      // of a thrown exception, so this has to be checked separately from
      // the rejected case above or failures here go completely unnoticed.
      console.error(`Lead notification email (${label}) failed:`, result.value.error);
    }
  });
}
