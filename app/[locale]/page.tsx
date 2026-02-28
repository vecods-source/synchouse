import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { setRequestLocale } from "next-intl/server"
import dynamic from "next/dynamic"

const AboutSection = dynamic(() => import("@/components/about-section").then(m => m.AboutSection))
const ServicesSection = dynamic(() => import("@/components/services-section").then(m => m.ServicesSection))
const TechStackSection = dynamic(() => import("@/components/tech-stack-section").then(m => m.TechStackSection))
const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(m => m.PortfolioSection))
const WhyUsSection = dynamic(() => import("@/components/why-us-section").then(m => m.WhyUsSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(m => m.ContactSection))
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer))

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
