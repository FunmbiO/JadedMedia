"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

export type FaqFormPayload = {
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
};

function toRow(payload: FaqFormPayload) {
  return {
    question: payload.question,
    answer: payload.answer,
    sort_order: payload.sortOrder,
    published: payload.published,
  };
}

function revalidateFaqPaths() {
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
}

export async function createFaq(payload: FaqFormPayload): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!(await requireAdmin(supabase))) {
    return { error: "You need to be signed in." };
  }

  const { error } = await supabase.from("faqs").insert(toRow(payload));

  if (error) {
    return { error: error.message };
  }

  revalidateFaqPaths();
  return {};
}

export async function updateFaq(
  id: string,
  payload: FaqFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  if (!(await requireAdmin(supabase))) {
    return { error: "You need to be signed in." };
  }

  const { error } = await supabase.from("faqs").update(toRow(payload)).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateFaqPaths();
  return {};
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  if (!(await requireAdmin(supabase))) {
    throw new Error("You need to be signed in.");
  }

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFaqPaths();
}
