import type { Metadata } from "next";
import { FaqForm } from "@/components/admin/faq-form";

export const metadata: Metadata = {
  title: "New Question | Jaded Media Admin",
};

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper md:px-10">
        New Question
      </h1>
      <FaqForm />
    </div>
  );
}
