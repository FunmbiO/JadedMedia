import { createClient } from "@/lib/supabase/client";
import { PORTFOLIO_IMAGES_BUCKET } from "@/lib/supabase/storage-bucket";

/**
 * Uploads directly from the browser to Supabase Storage (not proxied
 * through a Server Action) so large images don't hit Vercel's serverless
 * function body-size limit. Relies on the authenticated-role storage
 * policy from migration 0005 — fails for a logged-out caller.
 */
export async function uploadPortfolioImage(file: File): Promise<string> {
  const supabase = createClient();
  const extension = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;

  const { error } = await supabase.storage
    .from(PORTFOLIO_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(PORTFOLIO_IMAGES_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}
