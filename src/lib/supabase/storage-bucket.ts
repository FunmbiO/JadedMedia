// Shared between the client-side uploader (lib/supabase/storage.ts) and
// server-side cleanup (admin portfolio actions) so both sides agree on the
// bucket name without the server importing the browser Supabase client.
export const PORTFOLIO_IMAGES_BUCKET = "Portfolio Images";
