"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updatePassword(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length < 8) {
    redirect(
      "/admin/reset-password?error=Password must be at least 8 characters",
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/admin/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin?passwordReset=1");
}
