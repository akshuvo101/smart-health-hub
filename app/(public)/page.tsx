import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
