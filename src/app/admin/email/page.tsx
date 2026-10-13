import type { Metadata } from "next";
import { formatFromAddress } from "@/lib/email/resend-client";
import { SendEmailForm } from "@/components/admin/send-email-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Email | Jaded Media Admin",
};

export default function AdminEmailPage() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const senderDisplay = fromEmail ? formatFromAddress(fromEmail) : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 px-6 pt-10 md:px-10">
        <h1 className="font-display text-2xl text-paper">Send an Email</h1>
        <p className="max-w-2xl font-sans text-sm font-light text-muted-on-ink">
          A one-off branded email to any address — not a bulk send. Good for
          sending a gallery link, a quick update, or anything that doesn&apos;t
          fit the automatic templates.
        </p>
      </div>
      <SendEmailForm senderDisplay={senderDisplay} />
    </div>
  );
}
