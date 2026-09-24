import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/services/queries";
import { ServiceForm } from "@/components/admin/service-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Service | Jaded Media Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper italic md:px-10">
        Edit &ldquo;{service.title}&rdquo;
      </h1>
      <ServiceForm service={service} />
    </div>
  );
}
