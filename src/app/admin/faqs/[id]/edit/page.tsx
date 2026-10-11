import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFaqById } from "@/lib/faqs/queries";
import { FaqForm } from "@/components/admin/faq-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Question | Jaded Media Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper md:px-10">
        Edit &ldquo;{faq.question}&rdquo;
      </h1>
      <FaqForm faq={faq} />
    </div>
  );
}
