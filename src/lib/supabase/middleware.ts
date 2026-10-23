import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;
const r2Hostname =
  process.env.R2_PUBLIC_HOSTNAME ??
  (process.env.R2_PUBLIC_BASE_URL
    ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
    : undefined);

/**
 * A fresh nonce every request, so Next's own inline hydration scripts
 * (and nothing else) are allowed to run under an otherwise strict
 * script-src — the standard documented pattern for CSP + nonces with the
 * App Router. 'strict-dynamic' lets scripts *loaded by* a nonce'd script
 * (Next's chunk loading) run too, without widening script-src itself.
 */
function buildCsp(nonce: string): string {
  const supabaseOrigin = supabaseHostname ? `https://${supabaseHostname}` : "";
  const r2Origin = r2Hostname ? `https://${r2Hostname}` : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: ${supabaseOrigin} ${r2Origin}`,
    `media-src 'self' ${r2Origin}`,
    `connect-src 'self' ${supabaseOrigin}`,
    "font-src 'self'",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

/**
 * Refreshes the Supabase auth session cookie on every request, gates
 * /admin/* behind it, and sets a per-request CSP nonce. Runs in
 * middleware because Server Components can't write cookies themselves —
 * the session would silently go stale without this.
 */
export async function updateSession(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  let supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });
  supabaseResponse.headers.set("Content-Security-Policy", csp);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          });
          supabaseResponse.headers.set("Content-Security-Policy", csp);
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";
  // The password-reset flow (request → email link → confirm → set new
  // password) has to work without an existing session — that's the whole
  // point of it — so these stay reachable even when `user` is null.
  const isPublicAuthRoute =
    isLoginRoute ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password" ||
    pathname === "/admin/auth/confirm";

  if (!user && isAdminRoute && !isPublicAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (user && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
