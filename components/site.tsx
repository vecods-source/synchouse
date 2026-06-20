import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { BackboneSection } from "@/components/backbone-section"
import { InfraSection } from "@/components/infra-section"
import { ServicesSection } from "@/components/services-section"
import { WorkSection } from "@/components/work-section"
import { SolutionsSection } from "@/components/solutions-section"
import { IntegrationsSection } from "@/components/integrations-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { StarterSection } from "@/components/starter-section"
import { ContactSection } from "@/components/contact-section"
import { Reveal } from "@/components/reveal"
import { dir, type Lang } from "@/components/i18n"

// The whole single-page site, rendered for a given locale. Used by / (en) and /ar.
export function Site({ lang }: { lang: Lang }) {
  return (
    <div lang={lang} dir={dir(lang)}>
      <Navbar lang={lang} />
      <main>
        {/* Hero pins; everything below scrolls up over it (overlap scroll) */}
        <HeroSection lang={lang} />
        <div className="relative z-10 bg-white">
          <Reveal>
            <SolutionsSection lang={lang} />
          </Reveal>
          <Reveal>
            <IntegrationsSection lang={lang} />
          </Reveal>
          <Reveal>
            <TechStackSection lang={lang} />
          </Reveal>
          <Reveal>
            <BackboneSection lang={lang} />
          </Reveal>
          <Reveal>
            <ServicesSection lang={lang} />
          </Reveal>
          <Reveal>
            <InfraSection lang={lang} />
          </Reveal>
          <Reveal>
            <WorkSection lang={lang} />
          </Reveal>
          {/* last three pin & scroll over each other (like the hero overlap) */}
          <ShowcaseSection lang={lang} />
          <StarterSection lang={lang} />
          <ContactSection lang={lang} />
          <div className="relative z-20">
            <Footer lang={lang} />
          </div>
        </div>
      </main>
    </div>
  )
}
