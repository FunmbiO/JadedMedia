import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemById } from "@/lib/portfolio/queries";
import { PortfolioForm } from "@/components/admin/portfolio-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Portfolio Entry | Jaded Media Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPortfolioItemPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getPortfolioItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper italic md:px-10">
        Edit &ldquo;{item.title}&rdquo;
      </h1>
      <PortfolioForm item={item} />
    </div>
  );
}
