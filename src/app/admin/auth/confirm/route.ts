import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing point for the password-reset email link. Supabase's own
 * confirmation URL verifies the token server-side and redirects here with
 * `token_hash`/`type` query params — exchanging those for a real session
 * (via cookies) is what actually lets `/admin/reset-password` update the
 * password afterward.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const rawNext = searchParams.get("next") ?? "/admin/reset-password";
  // Always an internal path, never an off-site redirect target — the
  // `${origin}${next}` construction below already makes an absolute
  // attacker URL non-exploitable, but this keeps it that way even if a
  // future refactor drops that prefix.
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : "/admin/reset-password";

  if (tokenHash && type === "recovery") {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/admin/login?error=${encodeURIComponent(
      "That reset link is invalid or has expired.",
    )}`,
  );
}
