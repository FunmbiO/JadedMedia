import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Jaded Media",
  description:
    "Jaded Media's deposit, rescheduling, and cancellation policy for booked shoots.",
};

const LAST_UPDATED = "October 23, 2026";

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Refund & Cancellation Policy"
      title="Refund & Cancellation Policy"
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection heading="Booking & retainer">
        <p>
          A non-refundable retainer (deposit) secures your date once we
          confirm a booking. The retainer comes off your total session
          price — it&apos;s not an extra fee, just paid up front to hold the
          date.
        </p>
      </LegalSection>

      <LegalSection heading="Balance due">
        <p>
          The remaining balance is due on or before the day of your shoot,
          unless we&apos;ve agreed to a different schedule in writing.
        </p>
      </LegalSection>

      <LegalSection heading="Rescheduling">
        <p>
          Need to move your date? I offer one complimentary reschedule if
          you give at least 14 days&apos; notice before the booked date,
          subject to my availability for the new date. Your retainer
          carries over — you don&apos;t pay it twice.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellations">
        <p>
          If you cancel instead of rescheduling, the retainer is
          non-refundable — it covers the time I&apos;ve already held for
          you and turned other work away for. Cancelling with less than 14
          days&apos; notice may also forfeit any additional payments already
          made toward the session.
        </p>
      </LegalSection>

      <LegalSection heading="If I have to cancel">
        <p>
          On the rare occasion I need to cancel — illness, an emergency,
          equipment failure that can&apos;t be worked around — you&apos;ll
          get a full refund of everything you&apos;ve paid, or help finding
          a suitable replacement photographer/videographer, whichever you
          prefer.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          This website doesn&apos;t process payments or store card details
          — booking payment is arranged directly between us (for example by
          e-transfer or invoice), and is governed by this policy together
          with any service agreement we sign for your project.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          Reach me at{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            {SITE_CONFIG.email}
          </a>{" "}
          before booking if anything here needs clarifying.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
