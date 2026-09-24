"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Portfolio" },
  { href: "/admin/services", label: "Services" },
];

export function AdminNavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 border-b border-paper/10 px-6 md:px-10">
      {TABS.map((tab) => {
        const isActive =
          tab.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-3 font-sans text-[13px] font-semibold tracking-[0.02em] transition-colors ${
              isActive
                ? "border-b-2 border-gold text-paper"
                : "text-muted-on-ink hover:text-paper"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
