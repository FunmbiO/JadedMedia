import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jaded Media",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-28 text-center">
      <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        Privacy Policy
      </span>
      <h1 className="font-display text-3xl font-normal text-paper italic sm:text-4xl">
        Coming soon.
      </h1>
    </div>
  );
}
