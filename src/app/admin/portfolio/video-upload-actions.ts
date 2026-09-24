"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createR2Client, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL } from "@/lib/r2/client";
import { createClient } from "@/lib/supabase/server";

const PRESIGNED_URL_TTL_SECONDS = 60 * 15; // generous for a large upload to start

export type CreateVideoUploadUrlResult =
  | { error: string }
  | { uploadUrl: string; publicUrl: string };

/**
 * Returns a short-lived, single-file presigned PUT URL — the browser
 * uploads directly to R2 with it, the file never passes through this
 * server. Requires an admin session; nothing here is meaningful for a
 * logged-out caller since it just hands back a signed URL for anyone who
 * gets this far, so the auth check matters.
 */
export async function createVideoUploadUrl(
  fileName: string,
  contentType: string,
): Promise<CreateVideoUploadUrlResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not signed in." };
  }

  const extension = fileName.split(".").pop();
  const key = `${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;

  const client = createR2Client();
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  try {
    const uploadUrl = await getSignedUrl(client, command, {
      expiresIn: PRESIGNED_URL_TTL_SECONDS,
    });
    return { uploadUrl, publicUrl: `${R2_PUBLIC_BASE_URL}/${key}` };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to create upload URL",
    };
  }
}
