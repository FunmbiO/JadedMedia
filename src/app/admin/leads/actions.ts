"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { LeadStatus } from "@/lib/leads/types";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  if (!(await requireAdmin(supabase))) {
    throw new Error("You need to be signed in.");
  }

  const { error } = await supabase.from("leads").update({ status }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/leads");
}
