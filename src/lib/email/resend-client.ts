import "server-only";
import { Resend } from "resend";

export function createResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Resend accepts "Display Name <address>" for `from` — shows "Funmbi
 * Olajubu" as the sender in the inbox even though the underlying address
 * is still the unverified-domain fallback (onboarding@resend.dev) until
 * a real domain is verified and RESEND_FROM_EMAIL points at it.
 */
export function formatFromAddress(email: string) {
  return `Funmbi Olajubu <${email}>`;
}
