import type { Metadata } from "next";
import Link from "next/link";
import { getAllTestimonialsForAdmin } from "@/lib/testimonials/queries";
import { DeleteTestimonialButton } from "@/components/admin/delete-testimonial-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | Jaded Media Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div className="flex flex-col gap-8 px-6 py-10 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-paper">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-gold px-5 py-2.5 font-sans text-[12px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          + Add Testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <p className="font-sans text-sm text-muted-on-ink">
          No testimonials yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-wrap items-center gap-4 py-4">
              <span className="w-10 shrink-0 font-display text-sm text-gold-soft">
                {String(testimonial.sortOrder).padStart(2, "0")}
              </span>

              <div className="flex min-w-40 flex-1 flex-col gap-1">
                <span className="font-sans text-sm font-semibold text-paper">
                  {testimonial.name || "(no name)"}
                </span>
                <span className="max-w-xl truncate font-sans text-xs text-muted-on-ink">
                  {testimonial.quote}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {testimonial.published ? (
                  <span className="rounded-full bg-sage/20 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-sage uppercase">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-paper/10 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-on-ink uppercase">
                    Draft
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/testimonials/${testimonial.id}/edit`}
                  className="font-sans text-[12px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
                >
                  Edit
                </Link>
                <DeleteTestimonialButton id={testimonial.id} name={testimonial.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
