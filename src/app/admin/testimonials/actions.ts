"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { PORTFOLIO_IMAGES_BUCKET } from "@/lib/supabase/storage-bucket";

export type TestimonialFormPayload = {
  quote: string;
  name: string;
  clientType: string;
  photoUrl: string;
  sortOrder: number;
  published: boolean;
};

function toRow(payload: TestimonialFormPayload) {
  return {
    quote: payload.quote,
    name: payload.name,
    client_type: payload.clientType,
    photo_url: payload.photoUrl || null,
    sort_order: payload.sortOrder,
    published: payload.published,
  };
}

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// Shares the Portfolio Images bucket — same path-from-public-URL trick as
// the portfolio admin actions use for cover/gallery image cleanup.
function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${encodeURIComponent(PORTFOLIO_IMAGES_BUCKET)}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

async function removePhotoIfUnused(
  supabase: Awaited<ReturnType<typeof createClient>>,
  previousUrl: string | null | undefined,
  nextUrl: string,
) {
  if (!previousUrl || previousUrl === nextUrl) return;
  const path = storagePathFromUrl(previousUrl);
  if (!path) return;

  const { error } = await supabase.storage.from(PORTFOLIO_IMAGES_BUCKET).remove([path]);
  if (error) {
    console.error("Failed to remove old testimonial photo:", error.message);
  }
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

  const { data: previous } = await supabase
    .from("testimonials")
    .select("photo_url")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("testimonials")
    .update(toRow(payload))
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  await removePhotoIfUnused(supabase, previous?.photo_url, payload.photoUrl);

  revalidateTestimonialPaths();
  return {};
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("photo_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (testimonial?.photo_url) {
    const path = storagePathFromUrl(testimonial.photo_url);
    if (path) {
      const { error: storageError } = await supabase.storage
        .from(PORTFOLIO_IMAGES_BUCKET)
        .remove([path]);
      if (storageError) {
        console.error("Failed to remove deleted testimonial's photo:", storageError.message);
      }
    }
  }

  revalidateTestimonialPaths();
}
