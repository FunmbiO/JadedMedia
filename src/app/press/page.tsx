import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press | Jaded Media",
};

export default function PressPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-28 text-center">
      <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        Press
      </span>
      <h1 className="font-accent text-3xl font-normal text-paper sm:text-4xl">
        Coming soon.
      </h1>
    </div>
  );
}
