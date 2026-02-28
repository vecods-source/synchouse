"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Clock, Headphones } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { isRtlLocale, type Locale } from "@/i18n/config"
import { Spotlight } from "@/components/ui/spotlight"

function FeatureItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")
  const locale = useLocale() as Locale
  const isRTL = isRtlLocale(locale)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    { icon: Zap, label: t("features.fastDelivery") },
    { icon: Shield, label: t("features.secureCode") },
    { icon: Clock, label: t("features.support") },
    { icon: Headphones, label: t("features.communication") },
  ]

  return (
    <section className="relative overflow-hidden bg-background min-h-screen flex items-center pt-16 md:pt-0">
      {/* Spotlight Effects */}
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="#008080"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="#000080"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="#008080"
        />
      </div>

      {/* Aurora Background - Teal & Navy Blue */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Teal blob #008080 */}
        <div
          className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] opacity-50 dark:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, #008080 0%, transparent 70%)',
            animation: 'aurora1 8s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Navy blue blob #000080 */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[70%] h-[70%] opacity-50 dark:opacity-35 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000080 0%, transparent 70%)',
            animation: 'aurora2 10s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Teal blob bottom */}
        <div
          className="absolute bottom-0 left-1/4 w-[60%] h-[60%] opacity-40 dark:opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, #008080 0%, transparent 70%)',
            animation: 'aurora3 12s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Navy blue blob bottom right */}
        <div
          className="absolute -bottom-1/4 right-0 w-[50%] h-[50%] opacity-45 dark:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, #000080 0%, transparent 70%)',
            animation: 'aurora4 9s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Center blend */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] opacity-25 dark:opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #008080 0%, #000080 50%, transparent 80%)',
            animation: 'aurora5 15s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Aurora Animation Keyframes */}
      <style jsx>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(50px, -30px) rotate(5deg) scale(1.1); }
          50% { transform: translate(80px, 20px) rotate(-3deg) scale(1.05); }
          75% { transform: translate(-20px, 40px) rotate(-5deg) scale(0.95); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(-60px, 30px) rotate(-8deg) scale(1.15); }
          50% { transform: translate(-30px, -40px) rotate(5deg) scale(0.9); }
          75% { transform: translate(40px, -20px) rotate(3deg) scale(1.1); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(40px, -50px) rotate(10deg) scale(1.2); }
          66% { transform: translate(-50px, 30px) rotate(-8deg) scale(0.9); }
        }
        @keyframes aurora4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-40px, -50px) rotate(-10deg) scale(1.3); }
        }
        @keyframes aurora5 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.2; }
          33% { transform: translate(-45%, -55%) rotate(5deg) scale(1.1); opacity: 0.25; }
          66% { transform: translate(-55%, -45%) rotate(-5deg) scale(0.95); opacity: 0.15; }
        }
      `}</style>

      {/* Grid Background */}
      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-grid dark:bg-grid">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background mask-radial" />
      </div>

      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      {/* Decorative dots */}
      <div className="absolute left-10 top-20 h-2 w-2 bg-accent/30 animate-pulse-subtle" />
      <div
        className="absolute left-14 top-24 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute right-20 top-32 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute right-16 top-36 h-2 w-2 bg-foreground/10 animate-pulse-subtle"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-24 right-1/3 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className={`hero-title mb-4 md:mb-6 font-bold tracking-tight text-balance ${isRTL ? "leading-relaxed" : "leading-tight"}`}>
            {t("title1")}
            <br />
            <span className="text-accent">
              {t("title2")}
            </span>
          </h1>

          <p className="mb-6 md:mb-10 text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground text-pretty px-2">
            {t("description")}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" role="group" aria-label="Call to action buttons">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="relative w-full sm:w-auto bg-accent text-sm md:text-base font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-xl group focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={t("startProject")}
            >
              {t("startProject")}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-foreground/20 hidden md:block" aria-hidden="true" />
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              variant="outline"
              className="relative w-full sm:w-auto border-2 border-accent text-accent text-sm md:text-base font-semibold hover:bg-accent hover:text-white transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={t("viewServices")}
            >
              {t("viewServices")}
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent/20 hidden md:block" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6" role="list" aria-label="Key features">
            {features.map((feature, index) => (
              <div key={feature.label} className="flex items-center gap-4 md:gap-6">
                <FeatureItem icon={feature.icon} label={feature.label} />
                {index < features.length - 1 && (
                  <div className="hidden sm:block h-4 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
