import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

/**
 * R2 is S3-compatible, so the AWS SDK works against it directly — just
 * point the endpoint at the account's R2 URL. Credentials are the API
 * token's Access Key ID/Secret, never exposed to the browser.
 */
export function createR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
export const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL!;
