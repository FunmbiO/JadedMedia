import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalList, LegalSection } from "@/components/legal/legal-layout";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Jaded Media",
  description:
    "How Jaded Media collects, uses, and protects the personal information you share through this website.",
};

const LAST_UPDATED = "October 23, 2026";

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Privacy Policy" title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection heading="Who this policy covers">
        <p>
          Jaded Media is a trade name used by Olufunmbi Olajubu, a sole
          proprietor based in Moncton, New Brunswick, Canada. This policy
          explains what personal information this website ({SITE_CONFIG.siteUrl})
          collects, why, and what your rights are under Canadian privacy law
          — mainly the <em>Personal Information Protection and Electronic
          Documents Act</em> (PIPEDA), which governs how private-sector
          businesses handle personal information in Canada.
        </p>
      </LegalSection>

      <LegalSection heading="What I collect">
        <p>
          I only collect what I need to respond to you and, if we work
          together, deliver the service you booked. That&apos;s it — no
          government ID, no payment card details, and nothing beyond what
          you choose to give me through the contact form or a quote request:
        </p>
        <LegalList
          items={[
            "Your name and email address (required, so I can reply to you).",
            "Your phone number, if you choose to give it.",
            "What kind of shoot you're asking about, and the date, if you know it.",
            "A rough budget range, if you choose to share one.",
            "Whatever you write in the message or details field.",
          ]}
        />
        <p>
          If you log in to the admin dashboard (that&apos;s me, managing the
          site), Supabase also handles a login session — that&apos;s covered
          separately in the{" "}
          <Link href="/cookies" className="text-gold-soft underline underline-offset-2 hover:opacity-75">
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Why I collect it">
        <p>
          Solely to respond to your inquiry, put together a quote, and — if
          we book together — plan and deliver your shoot. I don&apos;t sell
          or rent your information to anyone, and I don&apos;t use it for
          marketing you haven&apos;t asked for.
        </p>
      </LegalSection>

      <LegalSection heading="Who else sees it">
        <p>
          I use a small number of service providers to run this site and
          respond to you. They process information on my behalf, under
          their own security and privacy commitments — they don&apos;t get
          to use it for their own purposes:
        </p>
        <LegalList
          items={[
            "Supabase — stores form submissions and portfolio data in a private database.",
            "Resend — delivers the email notification and confirmation you get after submitting a form.",
            "Vercel — hosts the site and provides basic, cookie-free traffic analytics.",
            "Cloudflare R2 — stores the video files shown in my portfolio (not anything you submit).",
          ]}
        />
        <p>
          Only I (Olufunmbi) can log in and read what you&apos;ve submitted.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site keeps cookie use to the minimum — see the full{" "}
          <Link href="/cookies" className="text-gold-soft underline underline-offset-2 hover:opacity-75">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
      </LegalSection>

      <LegalSection heading="How long I keep it">
        <p>
          I keep contact and quote submissions for as long as I reasonably
          need them for business and tax record-keeping, then delete them.
          You can ask me to delete your information sooner at any time (see
          “Your rights” below).
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Under PIPEDA, you can ask to see the personal information I hold
          about you, ask me to correct it if it&apos;s wrong, or withdraw
          your consent and ask me to delete it (unless I&apos;m required to
          keep it for legal or tax reasons). To do any of this, email{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            {SITE_CONFIG.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site isn&apos;t directed at children, and I don&apos;t
          knowingly collect personal information from anyone under 13
          through it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          I may update this policy as the site changes. The &quot;last
          updated&quot; date at the top will always reflect the most recent
          version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy or your information? Reach me at{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            {SITE_CONFIG.email}
          </a>{" "}
          or {SITE_CONFIG.phone}, based in {SITE_CONFIG.city}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
