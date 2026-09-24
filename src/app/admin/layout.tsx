import type { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/actions";
import { AdminNavTabs } from "@/components/admin/admin-nav-tabs";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-full flex-col bg-ink text-paper">
      <header className="flex items-center justify-between border-b border-paper/10 px-6 py-4 md:px-10">
        <Link
          href="/admin"
          className="font-sans text-sm font-bold tracking-[0.06em] text-paper"
        >
          JADED MEDIA <span className="text-gold-soft">&mdash; Admin</span>
        </Link>
        {user && (
          <form action={logout}>
            <button
              type="submit"
              className="font-sans text-[12px] font-semibold text-muted-on-ink transition-colors hover:text-paper"
            >
              Sign Out
            </button>
          </form>
        )}
      </header>
      {user && <AdminNavTabs />}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
