"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ServiceFormPayload = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  sortOrder: number;
  published: boolean;
};

function toRow(payload: ServiceFormPayload) {
  return {
    slug: payload.slug,
    title: payload.title,
    description: payload.description,
    bullets: payload.bullets.filter((bullet) => bullet.trim().length > 0),
    sort_order: payload.sortOrder,
    published: payload.published,
  };
}

function revalidateServicesPaths() {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

// Return a result object rather than calling redirect() here: this action
// is invoked programmatically from a client component (not a <form action>),
// and redirect()'s special throw is easy to accidentally swallow in that
// call site's try/catch. The form navigates itself on success instead.
export async function createService(
  payload: ServiceFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("services").insert(toRow(payload));

  if (error) {
    return { error: error.message };
  }

  revalidateServicesPaths();
  return {};
}

export async function updateService(
  id: string,
  payload: ServiceFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update(toRow(payload))
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateServicesPaths();
  return {};
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateServicesPaths();
}
