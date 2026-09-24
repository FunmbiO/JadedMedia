import type { LeadFormPayload } from "@/app/contact/actions";
import { EVENT_TYPE_LABELS } from "@/app/contact/labels";
import type { QuoteRequestPayload } from "@/app/services/actions";

const WRAPPER_STYLE =
  "font-family: -apple-system, Helvetica, Arial, sans-serif; background: #0d0d0b; color: #f6f4ef; padding: 40px 24px;";
const CARD_STYLE =
  "max-width: 480px; margin: 0 auto; background: #14130f; border: 1px solid rgba(246,244,239,0.12); border-radius: 8px; padding: 32px;";
const LABEL_STYLE =
  "font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #b6904c; margin: 0 0 4px;";
const VALUE_STYLE = "font-size: 15px; margin: 0 0 18px; color: #f6f4ef;";

function row(label: string, value: string): string {
  if (!value) return "";
  return `<p style="${LABEL_STYLE}">${label}</p><p style="${VALUE_STYLE}">${value}</p>`;
}

export function studioNotificationEmail(payload: LeadFormPayload) {
  return {
    subject: `New inquiry: ${payload.name} (${EVENT_TYPE_LABELS[payload.eventType]})`,
    html: `
      <div style="${WRAPPER_STYLE}">
        <div style="${CARD_STYLE}">
          <h1 style="font-size: 20px; font-style: italic; margin: 0 0 24px; color: #f6f4ef;">New inquiry</h1>
          ${row("Name", payload.name)}
          ${row("Email", payload.email)}
          ${row("Phone", payload.phone)}
          ${row("Inquiry type", EVENT_TYPE_LABELS[payload.eventType])}
          ${row("Event date", payload.eventDate)}
          ${row("Budget range", payload.budgetRange)}
          ${row("Message", payload.message)}
        </div>
      </div>
    `,
  };
}

export function clientConfirmationEmail(payload: LeadFormPayload) {
  return {
    subject: "I received your message — Jaded Media",
    html: `
      <div style="${WRAPPER_STYLE}">
        <div style="${CARD_STYLE}">
          <h1 style="font-size: 22px; font-style: italic; margin: 0 0 16px; color: #f6f4ef;">Thank you, ${payload.name}.</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #c9c5b9; margin: 0 0 20px;">
            I've received your message and will get back to you shortly.
            Here's a copy of what you sent:
          </p>
          ${row("Inquiry type", EVENT_TYPE_LABELS[payload.eventType])}
          ${row("Event date", payload.eventDate)}
          ${row("Message", payload.message)}
          <p style="font-size: 13px; color: #7c7768; margin: 24px 0 0;">
            &mdash; Jaded Media
          </p>
        </div>
      </div>
    `,
  };
}

export function quoteRequestNotificationEmail(
  payload: QuoteRequestPayload & { serviceTitle: string },
) {
  return {
    subject: `New consultation request: ${payload.name} (${payload.serviceTitle})`,
    html: `
      <div style="${WRAPPER_STYLE}">
        <div style="${CARD_STYLE}">
          <h1 style="font-size: 20px; font-style: italic; margin: 0 0 24px; color: #f6f4ef;">New consultation request</h1>
          ${row("Service", payload.serviceTitle)}
          ${row("Name", payload.name)}
          ${row("Email", payload.email)}
          ${row("Phone", payload.phone)}
          ${row("Details", payload.details)}
        </div>
      </div>
    `,
  };
}

export function quoteRequestConfirmationEmail(
  payload: QuoteRequestPayload & { serviceTitle: string },
) {
  return {
    subject: "Consultation received — Jaded Media",
    html: `
      <div style="${WRAPPER_STYLE}">
        <div style="${CARD_STYLE}">
          <h1 style="font-size: 22px; font-style: italic; margin: 0 0 16px; color: #f6f4ef;">Consultation received, ${payload.name}.</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #c9c5b9; margin: 0 0 20px;">
            I've received your consultation request and will get back to you
            shortly. Here's a copy of what you sent:
          </p>
          ${row("Service", payload.serviceTitle)}
          ${row("Details", payload.details)}
          <p style="font-size: 13px; color: #7c7768; margin: 24px 0 0;">
            &mdash; Jaded Media
          </p>
        </div>
      </div>
    `,
  };
}
