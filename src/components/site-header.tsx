import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 md:px-16">
        <Link href="/" className="flex items-center gap-3.5">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-paper font-display text-lg italic text-ink"
          >
            JM
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[15px] font-bold tracking-[0.06em] text-paper">
              JADED MEDIA
            </span>
            <span className="mt-[3px] font-sans text-[10px] font-normal tracking-[0.22em] text-gold">
              PHOTO &amp; FILM STUDIO
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-11 md:flex">
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

        <Link
          href="/contact"
          className="rounded-full border border-gold px-6 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-gold-soft uppercase transition-colors hover:bg-gold hover:text-ink"
        >
          Book a Call
        </Link>
      </div>
    </header>
  );
}
