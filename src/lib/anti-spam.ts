/**
 * Lightweight bot defense for public forms, enforced server-side (not
 * just hidden in the UI) since a scripted attacker can call a Server
 * Action directly without ever loading the page's JS or CSS.
 *
 * Two independent signals: a honeypot field real visitors never see or
 * fill, and a minimum time between the form rendering and being
 * submitted (basic scripts fill + submit in one shot; a human has to
 * at least notice the page and click submit).
 */

const MIN_FILL_TIME_MS = 1500;

export function isLikelyBot({
  honeypot,
  formRenderedAt,
}: {
  honeypot: string;
  formRenderedAt: number;
}): boolean {
  if (honeypot.trim() !== "") return true;
  if (Date.now() - formRenderedAt < MIN_FILL_TIME_MS) return true;
  return false;
}
