import type { Metadata } from "next";
import { PortfolioForm } from "@/components/admin/portfolio-form";

export const metadata: Metadata = {
  title: "New Portfolio Entry | Jaded Media Admin",
};

export default function NewPortfolioItemPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper italic md:px-10">
        New Portfolio Entry
      </h1>
      <PortfolioForm />
    </div>
  );
}
