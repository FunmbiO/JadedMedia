import type { LeadFormPayload } from "@/app/contact/actions";
import { EVENT_TYPE_LABELS } from "@/app/contact/labels";
import type { QuoteRequestPayload } from "@/app/services/actions";
import { SITE_CONFIG } from "@/lib/site-config";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";
// Email clients can't load a relative path — this has to be an absolute URL
// to the deployed site.
const LOGO_URL = `${SITE_CONFIG.siteUrl}/logo.png`;

const WRAPPER_STYLE = `font-family: ${FONT_STACK}; background: #0a0a08; padding: 48px 20px;`;
const CARD_STYLE =
  "max-width: 480px; margin: 0 auto; background: #14130f; border: 1px solid rgba(246,244,239,0.1); border-radius: 12px; overflow: hidden;";
const ACCENT_BAR_STYLE =
  "height: 3px; line-height: 3px; font-size: 0; background: linear-gradient(90deg, #8a6a34, #d4af6a, #8a6a34);";
const EYEBROW_STYLE =
  "font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #b6904c; margin: 0 0 10px;";
const HEADING_STYLE =
  "font-size: 22px; font-style: italic; font-weight: 400; line-height: 1.3; margin: 0 0 20px; color: #f6f4ef;";
const INTRO_STYLE =
  "font-size: 15px; line-height: 1.65; color: #c9c5b9; margin: 0 0 4px;";
const LABEL_STYLE =
  "font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8678; margin: 0 0 3px;";
const VALUE_STYLE = "font-size: 15px; line-height: 1.5; margin: 0; color: #f6f4ef;";

function row(label: string, value: string): string {
  if (!value) return "";
  return `
    <div style="padding: 14px 0; border-bottom: 1px solid rgba(246,244,239,0.07);">
      <p style="${LABEL_STYLE}">${label}</p>
      <p style="${VALUE_STYLE}">${value}</p>
    </div>
  `;
}

/** Shared chrome (logo, wordmark, footer) every notification/confirmation email renders inside. */
function emailShell(eyebrow: string, headingHtml: string, bodyHtml: string): string {
  return `
    <div style="${WRAPPER_STYLE}">
      <div style="${CARD_STYLE}">
        <div style="${ACCENT_BAR_STYLE}">&nbsp;</div>
        <div style="padding: 40px 36px 4px; text-align: center;">
          <img src="${LOGO_URL}" width="40" height="40" alt="Jaded Media" style="display: inline-block; border-radius: 9px; margin-bottom: 14px;" />
          <div style="font-family: ${FONT_STACK}; font-size: 14px; font-weight: 700; letter-spacing: 0.14em; color: #f6f4ef;">
            JADED MEDIA
          </div>
          <div style="font-size: 10px; font-weight: 500; letter-spacing: 0.24em; color: #b6904c; margin-top: 5px;">
            PHOTO &amp; FILM
          </div>
          <div style="width: 36px; height: 1px; background: #b6904c; margin: 24px auto 0; font-size: 0;">&nbsp;</div>
        </div>
        <div style="padding: 28px 36px 4px;">
          <p style="${EYEBROW_STYLE}">${eyebrow}</p>
          ${headingHtml}
          ${bodyHtml}
        </div>
        <div style="padding: 24px 36px 32px; margin-top: 8px; border-top: 1px solid rgba(246,244,239,0.07); text-align: center;">
          <p style="font-size: 12.5px; color: #a9a598; margin: 20px 0 4px;">
            ${SITE_CONFIG.email} &middot; ${SITE_CONFIG.phone}
          </p>
          <p style="font-size: 11px; color: #55524a; margin: 0;">
            &copy; ${new Date().getFullYear()} Jaded Media &middot; ${SITE_CONFIG.city}
          </p>
        </div>
      </div>
    </div>
  `;
}

export function teamNotificationEmail(payload: LeadFormPayload) {
  return {
    subject: `New inquiry: ${payload.name} (${EVENT_TYPE_LABELS[payload.eventType]})`,
    html: emailShell(
      "New Inquiry",
      `<h1 style="${HEADING_STYLE}">${payload.name} wants to talk.</h1>`,
      `
        ${row("Name", payload.name)}
        ${row("Email", payload.email)}
        ${row("Phone", payload.phone)}
        ${row("Inquiry type", EVENT_TYPE_LABELS[payload.eventType])}
        ${row("Event date", payload.eventDate)}
        ${row("Budget range", payload.budgetRange)}
        ${row("Message", payload.message)}
      `,
    ),
  };
}

export function clientConfirmationEmail(payload: LeadFormPayload) {
  return {
    subject: "I received your message — Jaded Media",
    html: emailShell(
      "Message Received",
      `<h1 style="${HEADING_STYLE}">Thank you, ${payload.name}.</h1>`,
      `
        <p style="${INTRO_STYLE}">
          I've received your message and will get back to you shortly.
          Here's a copy of what you sent:
        </p>
        ${row("Inquiry type", EVENT_TYPE_LABELS[payload.eventType])}
        ${row("Event date", payload.eventDate)}
        ${row("Message", payload.message)}
      `,
    ),
  };
}

export function quoteRequestNotificationEmail(
  payload: QuoteRequestPayload & { serviceTitle: string },
) {
  return {
    subject: `New consultation request: ${payload.name} (${payload.serviceTitle})`,
    html: emailShell(
      "New Consultation Request",
      `<h1 style="${HEADING_STYLE}">${payload.name} wants a quote.</h1>`,
      `
        ${row("Service", payload.serviceTitle)}
        ${row("Name", payload.name)}
        ${row("Email", payload.email)}
        ${row("Phone", payload.phone)}
        ${row("Details", payload.details)}
      `,
    ),
  };
}

export function quoteRequestConfirmationEmail(
  payload: QuoteRequestPayload & { serviceTitle: string },
) {
  return {
    subject: "Consultation received — Jaded Media",
    html: emailShell(
      "Consultation Received",
      `<h1 style="${HEADING_STYLE}">Consultation received, ${payload.name}.</h1>`,
      `
        <p style="${INTRO_STYLE}">
          I've received your consultation request and will get back to you
          shortly. Here's a copy of what you sent:
        </p>
        ${row("Service", payload.serviceTitle)}
        ${row("Details", payload.details)}
      `,
    ),
  };
}
