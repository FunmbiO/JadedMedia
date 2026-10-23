import type { ReactNode } from "react";

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-14 px-6 py-20 md:px-16 md:py-28">
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl font-normal text-paper sm:text-5xl">
          {title}
        </h1>
        <p className="font-sans text-xs font-light text-muted-on-ink">
          Last updated {lastUpdated}
        </p>
        {intro && (
          <p className="font-sans text-base leading-relaxed font-light text-muted-on-ink">
            {intro}
          </p>
        )}
      </div>

      <div className="flex max-w-3xl flex-col gap-10">{children}</div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-accent text-xl text-paper">{heading}</h2>
      <div className="flex flex-col gap-3 font-sans text-[14.5px] leading-relaxed font-light text-muted-on-ink">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {items.map((item, index) => (
        <li key={index} className="list-disc marker:text-gold-soft">
          {item}
        </li>
      ))}
    </ul>
  );
}
