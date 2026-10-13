"use client";

import { useState, useTransition, type FormEvent } from "react";
import { customAdminEmail } from "@/lib/email/templates";
import { sendAdminEmail } from "@/app/admin/email/actions";

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

export function SendEmailForm({ senderDisplay }: { senderDisplay: string | null }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const preview = customAdminEmail(
    subject || "Your subject here",
    message || "Your message will appear here as you type.",
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSent(false);
    startTransition(async () => {
      const result = await sendAdminEmail({ to, subject, message });
      if (result.error) {
        setError(result.error);
        return;
      }
      setSent(true);
      setTo("");
      setSubject("");
      setMessage("");
    });
  }

  return (
    <div className="flex flex-col gap-10 px-6 py-10 md:flex-row md:px-10">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 md:max-w-md">
        {error && (
          <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
            {error}
          </p>
        )}
        {sent && !error && (
          <p className="rounded border border-sage/30 bg-sage/10 px-4 py-3 font-sans text-sm text-sage">
            Sent.
          </p>
        )}

        <div className="flex items-center justify-between gap-3 rounded-lg border border-paper/15 px-4 py-3">
          {senderDisplay ? (
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-sage" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[11px] font-semibold tracking-[0.08em] text-sage uppercase">
                  Connected
                </span>
                <span className="font-sans text-[13px] text-paper">{senderDisplay}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-400" aria-hidden />
              <span className="font-sans text-[13px] text-red-300">
                Not connected — RESEND_FROM_EMAIL isn&apos;t set.
              </span>
            </div>
          )}
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>To</span>
          <input
            type="email"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="client@example.com"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Subject</span>
          <input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Message</span>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            className={inputClass}
          />
          <span className="font-sans text-[11px] text-muted-on-ink/70">
            Plain text — line breaks become paragraphs automatically, dropped
            into the same branded template every other email already uses.
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending || !senderDisplay}
          className="mt-2 w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Send Email"}
        </button>
      </form>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="font-sans text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">
          Preview — what your client sees
        </span>

        <div className="overflow-hidden rounded-lg border border-paper/10">
          <div className="flex flex-col gap-1.5 border-b border-ink/10 bg-paper px-5 py-4">
            <div className="flex gap-2 font-sans text-[12.5px]">
              <span className="w-12 shrink-0 text-ink/45">From</span>
              <span className="font-semibold text-ink">
                {senderDisplay ?? "(not connected)"}
              </span>
            </div>
            <div className="flex gap-2 font-sans text-[12.5px]">
              <span className="w-12 shrink-0 text-ink/45">To</span>
              <span className="text-ink">{to || "(recipient)"}</span>
            </div>
            <div className="flex gap-2 font-sans text-[12.5px]">
              <span className="w-12 shrink-0 text-ink/45">Subject</span>
              <span className="font-semibold text-ink">{subject || "(no subject)"}</span>
            </div>
          </div>

          <iframe
            title="Email preview"
            srcDoc={preview.html}
            className="h-[640px] w-full border-0 bg-[#0a0a08]"
          />
        </div>
      </div>
    </div>
  );
}
