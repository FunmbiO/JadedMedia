import { getPublishedTestimonials } from "@/lib/testimonials/queries";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";

/**
 * Hidden entirely until at least one is published via /admin/testimonials
 * — no more permanent "[add testimonial -- later]" placeholder. The data
 * fetch stays server-side; the actual prev/next interaction lives in the
 * client TestimonialCarousel below it.
 */
export async function Testimonial() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-beige-deep px-6 py-24 md:px-16 md:py-36">
      <TestimonialCarousel testimonials={testimonials} />
    </section>
  );
}
