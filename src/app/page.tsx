import { Hero } from "@/components/home/hero";
import { PressStrip } from "@/components/home/press-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { Philosophy } from "@/components/home/philosophy";
import { Process } from "@/components/home/process";
import { Testimonial } from "@/components/home/testimonial";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <PressStrip />
      <FeaturedWork />
      <ServicesTeaser />
      <Philosophy />
      <Process />
      <Testimonial />
      <CtaBanner />
    </>
  );
}
