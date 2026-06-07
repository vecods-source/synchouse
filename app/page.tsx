import { HeroSection } from "@/components/hero-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ServicesSection } from "@/components/services-section"
import { WorkSliderAuto } from "@/components/work-slider-auto"
import { ProcessSection } from "@/components/process-section"
import { StarterSection } from "@/components/starter-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <WorkSliderAuto />
      <ProcessSection />
      <StarterSection />
      <ContactSection />
    </main>
  )
}
