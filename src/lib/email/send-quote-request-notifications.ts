import "server-only";
import { createResendClient, formatFromAddress } from "@/lib/email/resend-client";
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
  const teamEmail = process.env.JADEDMEDIA_TEAM_EMAIL;

  if (!apiKey || !fromEmail || !teamEmail) {
    console.warn(
      "Resend not configured (RESEND_API_KEY/RESEND_FROM_EMAIL/JADEDMEDIA_TEAM_EMAIL) — skipping quote request email notifications.",
    );
    return;
  }

  const resend = createResendClient();
  const from = formatFromAddress(fromEmail);
  const owner = quoteRequestNotificationEmail(payload);
  const client = quoteRequestConfirmationEmail(payload);

  const results = await Promise.allSettled([
    // Hitting reply on the owner's own notification goes straight to the
    // client who requested the quote — the natural next action after
    // "you got a request" is replying to that person.
    resend.emails.send({
      from,
      to: teamEmail,
      replyTo: payload.email,
      subject: owner.subject,
      html: owner.html,
    }),
    // The client's confirmation sends from onboarding@resend.dev (no
    // real inbox behind it) until a verified domain is set up — reply-to
    // routes a reply to the real inbox instead of bouncing or vanishing.
    resend.emails.send({
      from,
      to: payload.email,
      replyTo: teamEmail,
      subject: client.subject,
      html: client.html,
    }),
  ]);

  results.forEach((result, index) => {
    const label = index === 0 ? "owner" : "client";
    if (result.status === "rejected") {
      console.error(`Quote request notification email (${label}) failed:`, result.reason);
    } else if (result.value.error) {
      // The Resend SDK resolves (doesn't reject) on an API-level error like
      // an unverified sending domain — it comes back as { error } instead
      // of a thrown exception, so this has to be checked separately from
      // the rejected case above or failures here go completely unnoticed.
      console.error(`Quote request notification email (${label}) failed:`, result.value.error);
    }
  });
}
