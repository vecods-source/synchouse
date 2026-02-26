"use client"

import { Database, ShoppingCart, Smartphone, Bot, Calendar, BarChart3 } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { isRtlLocale, type Locale } from "@/i18n/config"

type ServiceKey = "erp" | "crm" | "ecommerce" | "mobile" | "ai" | "appointment"

export function ServicesSection() {
  const t = useTranslations("services")
  const locale = useLocale() as Locale
  const isRTL = isRtlLocale(locale)

  const services: { key: ServiceKey; icon: typeof Database }[] = [
    { key: "erp", icon: Database },
    { key: "crm", icon: BarChart3 },
    { key: "ecommerce", icon: ShoppingCart },
    { key: "mobile", icon: Smartphone },
    { key: "ai", icon: Bot },
    { key: "appointment", icon: Calendar },
  ]

  return (
    <section id="services" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16 md:mb-20">
          <div className="mb-6 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
            {t("badge")}
          </div>
          <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}{" "}
            <span className="text-accent">{t("title2")}</span>
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:hidden px-[12.5vw]" dir={isRTL ? "rtl" : "ltr"}>
          {services.map((service) => (
            <div
              key={service.key}
              className={`group relative shrink-0 w-[75vw] snap-center rounded-2xl p-6 border border-border/30 bg-card/40 keep-card backdrop-blur-sm overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`relative mb-5 ${isRTL ? "mr-0 ml-auto" : ""}`}>
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20">
                  <service.icon className="h-5 w-5 text-accent" />
                </div>
              </div>
              <h3 className={`relative text-base font-semibold text-foreground mb-2 ${isRTL ? "leading-relaxed" : ""}`}>
                {t(`items.${service.key}.title`)}
              </h3>
              <p className={`relative text-sm text-muted-foreground/70 leading-relaxed ${isRTL ? "leading-loose" : ""}`}>
                {t(`items.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden sm:grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.key}
              className={`group relative rounded-2xl p-6 md:p-8 border border-border/30 bg-card/40 keep-card backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 ${isRTL ? "text-right" : "text-left"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
              <div className={`relative mb-6 ${isRTL ? "mr-0 ml-auto" : ""}`}>
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500">
                  <service.icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                </div>
              </div>
              <h3 className={`relative text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-3 ${isRTL ? "leading-relaxed" : ""}`}>
                {t(`items.${service.key}.title`)}
              </h3>
              <p className={`relative text-sm text-muted-foreground/70 leading-relaxed group-hover:text-muted-foreground transition-colors duration-300 ${isRTL ? "leading-loose" : ""}`}>
                {t(`items.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
