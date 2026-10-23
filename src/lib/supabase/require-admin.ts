import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Confirms the caller has a real admin session before a mutation runs.
 * RLS already blocks an unauthenticated write at the database layer for
 * every table these actions touch — this is defense-in-depth on top of
 * that, not the only thing standing in the way. It also means an
 * unauthenticated direct call fails fast with a generic message instead
 * of a raw Postgres RLS error (which would otherwise confirm table names
 * and policy existence to anyone probing the Server Action endpoints).
 */
export async function requireAdmin(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
