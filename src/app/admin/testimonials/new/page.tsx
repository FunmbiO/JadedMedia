import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const metadata: Metadata = {
  title: "New Testimonial | Jaded Media Admin",
};

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper md:px-10">
        New Testimonial
      </h1>
      <TestimonialForm />
    </div>
  );
}
