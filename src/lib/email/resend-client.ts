import "server-only";
import { Resend } from "resend";

export function createResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Resend accepts "Display Name <address>" for `from` — shows "Jaded
 * Media" as the sender in the inbox, branded rather than a personal
 * name, regardless of what the underlying address actually is.
 */
export function formatFromAddress(email: string) {
  return `Jaded Media <${email}>`;
}
