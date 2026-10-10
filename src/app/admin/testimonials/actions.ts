"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type TestimonialFormPayload = {
  quote: string;
  name: string;
  clientType: string;
  sortOrder: number;
  published: boolean;
};

function toRow(payload: TestimonialFormPayload) {
  return {
    quote: payload.quote,
    name: payload.name,
    client_type: payload.clientType,
    sort_order: payload.sortOrder,
    published: payload.published,
  };
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(
  payload: TestimonialFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(toRow(payload));

  if (error) {
    return { error: error.message };
  }

  revalidateTestimonialPaths();
  return {};
}

export async function updateTestimonial(
  id: string,
  payload: TestimonialFormPayload,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update(toRow(payload))
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateTestimonialPaths();
  return {};
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTestimonialPaths();
}
