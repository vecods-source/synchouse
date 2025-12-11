"use client"

import { useState } from "react"
import { Database, ShoppingCart, Smartphone, Bot, Calendar, BarChart3, ArrowRight, ArrowLeft, Sparkles, AlertCircle, CheckCircle2, Building2, Users, Rocket, MessageCircle } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { isRtlLocale, type Locale } from "@/i18n/config"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ServiceKey = "erp" | "crm" | "ecommerce" | "mobile" | "ai" | "appointment"

export function ServicesSection() {
  const t = useTranslations("services")
  const locale = useLocale() as Locale
  const isRTL = isRtlLocale(locale)
  const [selectedService, setSelectedService] = useState<ServiceKey | null>(null)

  const services: { key: ServiceKey; icon: typeof Database; popular: boolean }[] = [
    { key: "erp", icon: Database, popular: false },
    { key: "crm", icon: BarChart3, popular: false },
    { key: "ecommerce", icon: ShoppingCart, popular: true },
    { key: "mobile", icon: Smartphone, popular: true },
    { key: "ai", icon: Bot, popular: false },
    { key: "appointment", icon: Calendar, popular: false },
  ]

  const getWhatsAppLink = (service?: string) => {
    const phone = locale === "de" ? "4915215928643" : "97455600224"
    const message = encodeURIComponent(
      service
        ? t(`modal.whatsappMessage`, { service })
        : t("pricing.whatsappMessage")
    )
    return `https://wa.me/${phone}?text=${message}`
  }

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="services" className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
            <span className="text-sm font-semibold text-accent">{t("badge")}</span>
          </div>
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => setSelectedService(service.key)}
              className={`group relative rounded-2xl border-2 p-8 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer active:scale-[0.98] ${
                service.popular
                  ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 hover:border-accent ring-2 ring-accent/20"
                  : "border-border/50 bg-card hover:border-accent hover:bg-accent/5"
              } text-${isRTL ? "right" : "left"}`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex items-center gap-1 rounded-full bg-accent px-3 py-1`}>
                  <Sparkles className="h-3 w-3 text-white" />
                  <span className="text-xs font-semibold text-white">{t("popular")}</span>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

              {/* Icon container */}
              <div className={`relative mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${
                service.popular
                  ? "bg-accent border-accent group-hover:bg-accent/90"
                  : "bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20 group-hover:from-accent group-hover:to-accent/80 group-hover:border-accent"
              }`}>
                <service.icon className={`h-8 w-8 transition-colors duration-300 ${
                  service.popular
                    ? "text-white"
                    : "text-accent group-hover:text-white"
                }`} />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 ${
                  service.popular ? "text-accent" : "group-hover:text-accent"
                } ${isRTL ? "leading-relaxed" : ""}`}>
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className={`text-muted-foreground mb-4 ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                  {t(`items.${service.key}.description`)}
                </p>

                {/* Arrow indicator */}
                <div className={`flex items-center gap-2 text-accent font-medium transition-all duration-300 ${
                  service.popular ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                } ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm">{t("learnMore")}</span>
                  <ArrowIcon className={`h-4 w-4 transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Flexible Pricing Section */}
        <div className="mt-16">
          <div className={`rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-8 md:p-10 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className={`text-2xl md:text-3xl font-bold text-accent mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                  {t("pricing.title")}
                </h3>
                <p className={`text-muted-foreground max-w-2xl mx-auto ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                  {t("pricing.description")}
                </p>
              </div>

              {/* Business Size Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Rocket className="h-7 w-7 text-accent" />
                  </div>
                  <span className={`text-lg font-semibold ${isRTL ? "leading-relaxed" : ""}`}>{t("pricing.startup")}</span>
                  <p className={`text-sm text-muted-foreground text-center ${isRTL ? "leading-loose" : ""}`}>
                    {t("pricing.startupDesc")}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-accent" />
                  </div>
                  <span className={`text-lg font-semibold ${isRTL ? "leading-relaxed" : ""}`}>{t("pricing.smallBusiness")}</span>
                  <p className={`text-sm text-muted-foreground text-center ${isRTL ? "leading-loose" : ""}`}>
                    {t("pricing.smallBusinessDesc")}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-accent" />
                  </div>
                  <span className={`text-lg font-semibold ${isRTL ? "leading-relaxed" : ""}`}>{t("pricing.enterprise")}</span>
                  <p className={`text-sm text-muted-foreground text-center ${isRTL ? "leading-loose" : ""}`}>
                    {t("pricing.enterpriseDesc")}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className={`text-muted-foreground mb-6 ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                  {t("pricing.flexiblePricing")}
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-3 py-4 px-8 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className={isRTL ? "leading-relaxed" : ""}>{t("pricing.whatsappCTA")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={selectedService !== null} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent
          className={`sm:max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? "text-right" : "text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {selectedService && (
            <>
              <DialogHeader className={isRTL ? "text-right" : "text-left"}>
                <div className={`flex items-center gap-3 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                    {selectedService === "erp" && <Database className="h-6 w-6 text-white" />}
                    {selectedService === "crm" && <BarChart3 className="h-6 w-6 text-white" />}
                    {selectedService === "ecommerce" && <ShoppingCart className="h-6 w-6 text-white" />}
                    {selectedService === "mobile" && <Smartphone className="h-6 w-6 text-white" />}
                    {selectedService === "ai" && <Bot className="h-6 w-6 text-white" />}
                    {selectedService === "appointment" && <Calendar className="h-6 w-6 text-white" />}
                  </div>
                  <DialogTitle className={`text-2xl ${isRTL ? "leading-relaxed" : ""}`}>
                    {t(`items.${selectedService}.title`)}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Problem Section */}
                <div className={`rounded-xl bg-red-500/10 border border-red-500/20 p-5 ${isRTL ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h4 className={`font-bold text-red-500 ${isRTL ? "leading-relaxed" : ""}`}>{t("modal.problem")}</h4>
                  </div>
                  <p className={`text-muted-foreground ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                    {t(`items.${selectedService}.problem`)}
                  </p>
                </div>

                {/* Solution Section */}
                <div className={`rounded-xl bg-green-500/10 border border-green-500/20 p-5 ${isRTL ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h4 className={`font-bold text-green-500 ${isRTL ? "leading-relaxed" : ""}`}>{t("modal.solution")}</h4>
                  </div>
                  <p className={`text-muted-foreground ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                    {t(`items.${selectedService}.solution`)}
                  </p>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={getWhatsAppLink(t(`items.${selectedService}.title`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className={isRTL ? "leading-relaxed" : ""}>{t("modal.whatsappCTA")}</span>
                </a>

                <p className={`text-center text-sm text-muted-foreground ${isRTL ? "leading-loose" : ""}`}>
                  {t("modal.responseTime")}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
