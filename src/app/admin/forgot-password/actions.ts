"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SITE_CONFIG } from "@/lib/site-config";

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    redirect("/admin/forgot-password?error=Enter your email");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_CONFIG.siteUrl}/admin/auth/confirm?next=/admin/reset-password`,
  });

  // Deliberately not surfacing the error to the client, even on failure:
  // revealing whether an email has an admin account would let someone
  // probe for valid addresses, so the response is "check your inbox"
  // either way. It IS logged server-side though — an email that's
  // supposed to exist and never arrives needs to be debuggable, the
  // same silent-failure mistake the Resend integration made earlier.
  if (error) {
    console.error(`Password reset email to ${email} failed:`, error.message);
  }

  redirect("/admin/forgot-password?sent=1");
}
