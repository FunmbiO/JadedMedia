import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy | Jaded Media",
  description:
    "What cookies and tracking jadedmedia.ca actually uses — and why there's no cookie banner.",
};

const LAST_UPDATED = "October 23, 2026";

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Cookie Policy" title="Cookie Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection heading="The short version">
        <p>
          This site keeps cookies to a minimum: one login cookie for my own
          admin dashboard, and a basic, cookie-free analytics script. There
          are no advertising cookies, no cross-site tracking, and nothing
          that follows you to other websites.
        </p>
      </LegalSection>

      <LegalSection heading="What's actually used">
        <p>
          <strong className="text-paper">Essential — login session.</strong>{" "}
          When I (Olufunmbi) log in to manage the site through{" "}
          <code className="rounded bg-paper/10 px-1.5 py-0.5 text-[13px]">/admin</code>,
          Supabase sets a session cookie so I stay logged in. It&apos;s only
          ever set when someone actually logs in — it doesn&apos;t apply to
          you browsing the public site, and it&apos;s strictly necessary for
          that login to work at all.
        </p>
        <p>
          <strong className="text-paper">Analytics — page views.</strong>{" "}
          This site uses Vercel Web Analytics to see which pages get
          visited, in aggregate. It&apos;s built to work without setting a
          cookie or any persistent identifier, and it doesn&apos;t track you
          across other websites.
        </p>
      </LegalSection>

      <LegalSection heading="What's not used">
        <p>
          No advertising pixels, no social-media tracking widgets, no
          cross-site identifiers. Fonts and video are served directly from
          this site rather than embedded from a third party, so there&apos;s
          nothing else loading in your browser that could set a cookie.
        </p>
      </LegalSection>

      <LegalSection heading="Why there's no cookie banner">
        <p>
          Under Canadian privacy law (PIPEDA), what&apos;s required is clear
          disclosure of what you collect and why — not a consent pop-up —
          and strictly-necessary cookies like a login session are exempt
          from consent requirements everywhere, including stricter regimes
          like the EU&apos;s. Since nothing on this site tracks or profiles
          visitors, a banner would add friction without adding any real
          protection. If that ever changes — say, if advertising pixels get
          added down the line — this policy (and a proper consent tool)
          will be updated first.
        </p>
      </LegalSection>

      <LegalSection heading="Controlling cookies yourself">
        <p>
          You can clear or block cookies at any time in your browser&apos;s
          settings (usually under Privacy or Security). Since the only
          cookie this site can set is the admin login session, blocking
          cookies has no effect on browsing the public site — it would only
          stop someone from staying logged in to the admin dashboard.
        </p>
      </LegalSection>

      <LegalSection heading="More on your information">
        <p>
          For how personal information submitted through forms on this site
          is collected and used, see the{" "}
          <Link href="/privacy" className="text-gold-soft underline underline-offset-2 hover:opacity-75">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy? Reach me at{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-gold-soft underline underline-offset-2 hover:opacity-75"
          >
            {SITE_CONFIG.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
