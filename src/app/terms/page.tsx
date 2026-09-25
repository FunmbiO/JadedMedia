import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Jaded Media",
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-28 text-center">
      <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        Terms of Service
      </span>
      <h1 className="font-display text-3xl font-normal text-paper italic sm:text-4xl">
        Coming soon.
      </h1>
    </div>
  );
}
