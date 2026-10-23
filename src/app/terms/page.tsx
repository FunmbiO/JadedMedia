import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalList, LegalSection } from "@/components/legal/legal-layout";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Jaded Media",
  description:
    "The terms that govern using jadedmedia.ca and booking photography or videography services with Jaded Media.",
};

const LAST_UPDATED = "October 23, 2026";

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Terms of Service" title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <LegalSection heading="Agreement">
        <p>
          Jaded Media is a trade name used by Olufunmbi Olajubu, a sole
          proprietor based in Moncton, New Brunswick, Canada. By using this
          website or booking a shoot with me, you&apos;re agreeing to these
          terms.
        </p>
      </LegalSection>

      <LegalSection heading="Services">
        <p>
          I provide photography and videography services — weddings,
          automotive, and business/brand work — as described on this site.
          Specific deliverables, dates, and pricing for your project are
          confirmed separately in a booking conversation and, where
          applicable, a signed service agreement — these terms cover the
          general relationship, not a substitute for that agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Bookings & payment">
        <p>
          A date is held once a retainer and any required booking details
          are confirmed. This website doesn&apos;t process payments itself —
          payment is arranged directly between us (e.g. e-transfer or
          invoice). Deposit, balance, rescheduling, and cancellation terms
          are set out in the{" "}
          <Link
            href="/refund-policy"
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            Refund &amp; Cancellation Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Delivery">
        <p>
          Finished photos and film are delivered via a private online
          gallery, typically within 6–8 weeks of the shoot. That timeline is
          a reasonable estimate, not a guarantee — busy seasons, extensive
          editing requests, or anything outside my control can shift it. I
          will keep you updated if it does.
        </p>
      </LegalSection>

      <LegalSection heading="Copyright & usage rights">
        <LegalList
          items={[
            "I retain copyright over every photo and video I create.",
            "When you book with me, you get a personal-use licence to the delivered gallery — print it, share it, post it, enjoy it.",
            "Commercial use or resale of the delivered work requires my written permission.",
            "Unless you tell me otherwise in writing before or at the time of booking, I may feature images or footage from your session in my portfolio, on this website, and in my own marketing.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Website content">
        <p>
          The text, images, and branding on {SITE_CONFIG.siteUrl} belong to
          Jaded Media / Olufunmbi Olajubu unless otherwise noted. Please
          don&apos;t reuse them without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          I take every reasonable precaution to deliver your shoot as
          planned, but things like equipment failure, illness, extreme
          weather, or other events outside my reasonable control can
          happen. In those cases, my liability is limited to a refund of
          amounts paid for the affected portion of the shoot, as described
          in the{" "}
          <Link
            href="/refund-policy"
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            Refund &amp; Cancellation Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the Province of New
          Brunswick and the laws of Canada applicable in it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          I may update these terms as the business or site changes. The
          &quot;last updated&quot; date at the top reflects the most recent
          version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Reach me at{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            {SITE_CONFIG.email}
          </a>{" "}
          or {SITE_CONFIG.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
