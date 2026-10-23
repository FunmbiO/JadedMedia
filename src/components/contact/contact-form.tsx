"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import {
  submitLead,
  type LeadEventType,
  type LeadFormPayload,
} from "@/app/contact/actions";
import { BUDGET_RANGES, EVENT_TYPE_LABELS } from "@/app/contact/labels";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function ContactForm({
  defaultEventType,
}: {
  defaultEventType: LeadEventType;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState<LeadEventType>(defaultEventType);
  const [eventDate, setEventDate] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: LeadFormPayload = {
      name,
      email,
      phone,
      eventType,
      eventDate,
      budgetRange,
      message,
      consent,
    };

    startTransition(async () => {
      const result = await submitLead(payload);
      if (result.error) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 rounded-md border border-gold/30 bg-gold/5 px-6 py-10 text-center">
        <span className="font-accent text-2xl text-paper">
          Thank you &mdash; message sent.
        </span>
        <p className="font-sans text-sm font-light text-muted-on-ink">
          I&apos;ll get back to you soon. In the meantime, feel free to
          browse more of my work.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Name</span>
          <input
            required
            aria-required="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            required
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Phone (optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>What are you inquiring about?</span>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as LeadEventType)}
            className={inputClass}
          >
            {(Object.keys(EVENT_TYPE_LABELS) as LeadEventType[]).map((key) => (
              <option key={key} value={key}>
                {EVENT_TYPE_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Event date (optional)</span>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Budget range (optional)</span>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Message</span>
        <textarea
          required
          aria-required="true"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your story — date, location, what you're looking for."
          className={inputClass}
        />
      </label>

      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          required
          aria-required="true"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
        />
        <span className="font-sans text-xs leading-relaxed font-light text-muted-on-ink">
          I agree to the{" "}
          <Link
            href="/privacy"
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            Privacy Policy
          </Link>{" "}
          and consent to Jaded Media collecting this information to respond
          to my inquiry.
        </span>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
