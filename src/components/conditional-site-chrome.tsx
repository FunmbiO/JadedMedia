"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * The public nav/footer make no sense around the admin dashboard (its own
 * layout provides admin-appropriate chrome instead) — this is the one spot
 * in the root layout that needs to know which route it's on.
 *
 * header/footer are passed in as already-rendered elements, not imported
 * and called here directly: SiteFooter is an async Server Component (it
 * reads site_content), and a Client Component can't await one itself —
 * only the Server Component that builds this JSX (the root layout) can.
 */
export function ConditionalSiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex flex-1 flex-col">{children}</main>
      {footer}
    </>
  );
}
