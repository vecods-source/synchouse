import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
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
