"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { submitQuoteRequest } from "@/app/services/actions";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const inputClass =
  "rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold";
const labelClass = "font-sans text-xs font-medium text-muted-on-ink";

type QuoteRequestModalProps = {
  serviceId: string;
  title: string;
  description: string;
  bullets: string[];
};

export function QuoteRequestModal({
  serviceId,
  title,
  description,
  bullets,
}: QuoteRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus moves into the dialog as soon as it opens, and Tab/Shift+Tab
    // loop within it instead of escaping to the page behind it.
    const dialog = dialogRef.current;
    dialog?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && dialog) {
        const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setSubmitted(false);
    setError(null);
    setName("");
    setEmail("");
    setPhone("");
    setDetails("");
    setConsent(false);
    // Returns focus to whatever opened the dialog, since the dialog
    // itself (and everything in it) is about to leave the DOM.
    triggerRef.current?.focus();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await submitQuoteRequest({
        serviceId,
        name,
        email,
        phone,
        details,
        consent,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      setSubmitted(true);
    });
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-fit rounded-full border border-gold px-6 py-2.5 font-sans text-[12.5px] font-semibold tracking-[0.06em] text-gold-soft uppercase transition-colors hover:bg-gold hover:text-ink"
      >
        Get a Custom Quote &rarr;
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4 py-8 backdrop-blur-sm"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Request a quote for ${title}`}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-lg flex-col overflow-y-auto rounded-md border border-paper/15 bg-ink-2 p-7 outline-none"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[11px] font-semibold tracking-[0.14em] text-gold-soft uppercase">
                  Custom Quote
                </span>
                <h3 className="font-accent text-2xl text-paper">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 font-sans text-2xl leading-none text-muted-on-ink transition-colors hover:text-paper"
              >
                &times;
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="font-accent text-xl text-paper">
                  Consultation received.
                </span>
                <p className="max-w-sm font-sans text-sm font-light text-muted-on-ink">
                  I&apos;ll get back to you shortly. Check your email for a
                  copy of this request.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-2 rounded-full bg-gold px-6 py-2.5 font-sans text-[12px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="mb-3 font-sans text-[13.5px] leading-relaxed font-light text-muted-on-ink">
                  {description}
                </p>
                {bullets.length > 0 && (
                  <ul className="mb-6 flex flex-col gap-2">
                    {bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 font-sans text-[13px] font-light text-paper/80"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                    <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
                      {error}
                    </p>
                  )}

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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                    <label className="flex flex-col gap-1.5">
                      <span className={labelClass}>Phone (optional)</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>
                      What are you looking for?
                    </span>
                    <textarea
                      required
                      aria-required="true"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Date, location, style — anything else worth knowing."
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
                      and consent to Jaded Media collecting this information
                      to respond to my request.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="mt-1 w-fit rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {isPending ? "Sending…" : "Confirm"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
