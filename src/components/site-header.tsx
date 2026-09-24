"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 md:px-16">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3.5"
        >
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-paper p-1.5"
          >
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-full w-full object-contain"
              quality={100}
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[15px] font-bold tracking-[0.06em] text-paper">
              JADED MEDIA
            </span>
            <span className="mt-[3px] font-sans text-[10px] font-normal tracking-[0.22em] text-gold">
              PHOTO &amp; FILM
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-11 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12.5px] font-medium tracking-[0.12em] text-paper/85 uppercase transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              aria-hidden
              className={`block h-px w-5 bg-paper transition-transform ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-px w-5 bg-paper transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-px w-5 bg-paper transition-transform ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="shrink-0 rounded-full border border-gold px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] whitespace-nowrap text-gold-soft uppercase transition-colors hover:bg-gold hover:text-ink sm:px-6"
          >
            Book a Call
          </Link>
        </div>
      </div>

      {isMenuOpen &&
        createPortal(
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="fixed inset-x-0 top-24 bottom-0 z-50 flex flex-col gap-1 overflow-y-auto bg-ink px-6 py-8 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-paper/10 py-4 font-display text-2xl text-paper italic"
              >
                {link.label}
              </Link>
            ))}
          </nav>,
          document.body,
        )}
    </header>
  );
}
