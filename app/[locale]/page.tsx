import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ScrollProgress } from "@/components/scroll-progress"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <HeroSection />
      <ServicesSection />
      <TechStackSection />
      <PortfolioSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
