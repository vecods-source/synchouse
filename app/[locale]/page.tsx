import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechStackSection />
        <PortfolioSection />
        <WhyUsSection />
        <ContactSection />
        <Footer />
      </main>
      <ScrollToTop />
      <CookieConsent />
    </>
  )
}
