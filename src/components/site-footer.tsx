import Image from "next/image";
import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
] as const;

const STUDIO_LINKS = [
  { href: "/about#process", label: "Our Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
  { href: "/press", label: "Press" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink-3">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-10 md:px-16 md:pt-22">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-paper p-1"
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-sans text-sm font-bold tracking-[0.06em] text-paper">
                JADED MEDIA
              </span>
            </Link>
            <p className="max-w-64 font-sans text-[13.5px] leading-relaxed font-light text-muted-on-ink">
              A photography &amp; videography studio for weddings, cars, and
              brands worth remembering.
            </p>
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-3.5">
            <span className="mb-1.5 font-sans text-[11px] tracking-[0.14em] text-muted-on-ink/80 uppercase">
              Explore
            </span>
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[13.5px] text-paper/80 transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Studio" className="flex flex-col gap-3.5">
            <span className="mb-1.5 font-sans text-[11px] tracking-[0.14em] text-muted-on-ink/80 uppercase">
              Studio
            </span>
            {STUDIO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[13.5px] text-paper/80 transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3.5">
            <span className="mb-1.5 font-sans text-[11px] tracking-[0.14em] text-muted-on-ink/80 uppercase">
              Contact
            </span>
            <span className="font-sans text-[13.5px] text-paper/80">
              [Add studio email]
            </span>
            <span className="font-sans text-[13.5px] text-paper/80">
              [Add studio phone number]
            </span>
            <span className="font-sans text-[13.5px] text-paper/80">
              [Add studio city]
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-sans text-xs text-muted-on-ink/70">
            © {new Date().getFullYear()} Jaded Media. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-muted-on-ink/70 transition-opacity hover:opacity-70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-muted-on-ink/70 transition-opacity hover:opacity-70"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
