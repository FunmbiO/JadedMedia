import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/testimonials/queries";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Testimonial | Jaded Media Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper md:px-10">
        Edit testimonial from &ldquo;{testimonial.name}&rdquo;
      </h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
