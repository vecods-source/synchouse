import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ScrollProgress } from "@/components/scroll-progress"
import { PageLoader } from "@/components/page-loader"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PageLoader />
      <ScrollProgress />
      <Header />
      <div className="pt-20">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
