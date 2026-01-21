"use client"

import { useState } from "react"
import { Database, ShoppingCart, Smartphone, Bot, Calendar, BarChart3, AlertCircle, CheckCircle2, MessageCircle } from "lucide-react"
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

  const services: { key: ServiceKey; icon: typeof Database }[] = [
    { key: "erp", icon: Database },
    { key: "crm", icon: BarChart3 },
    { key: "ecommerce", icon: ShoppingCart },
    { key: "mobile", icon: Smartphone },
    { key: "ai", icon: Bot },
    { key: "appointment", icon: Calendar },
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

        <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => setSelectedService(service.key)}
              className={`group relative rounded-2xl p-6 md:p-8 border border-border/20 bg-card/30 keep-card hover:bg-card/60 hover:border-accent/20 transition-all duration-300 cursor-pointer active:scale-[0.98] text-${isRTL ? "right" : "left"}`}
            >
              <div className="mb-6">
                <service.icon className="h-6 w-6 text-accent" style={{ filter: 'drop-shadow(0 0 8px rgba(0,128,128,1)) drop-shadow(0 0 20px rgba(0,128,128,1)) drop-shadow(0 0 40px rgba(0,128,128,0.8)) drop-shadow(0 0 60px rgba(0,128,128,0.5))' }} />
              </div>

              <h3 className={`text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-3 ${isRTL ? "leading-relaxed" : ""}`}>
                {t(`items.${service.key}.title`)}
              </h3>

              <p className={`text-sm text-muted-foreground/70 leading-relaxed ${isRTL ? "leading-loose" : ""}`}>
                {t(`items.${service.key}.description`)}
              </p>
            </button>
          ))}
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
                  className="relative flex h-14 w-full overflow-hidden rounded-lg p-[1px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#008080_0%,#000080_50%,#008080_100%)]" />
                  <span className={`inline-flex h-full w-full items-center justify-center gap-3 rounded-lg bg-card/90 px-6 font-medium text-foreground backdrop-blur-3xl ${isRTL ? "flex-row-reverse" : ""}`}>
                    <MessageCircle className="h-6 w-6 text-accent" />
                    <span className={isRTL ? "leading-relaxed" : ""}>{t("modal.whatsappCTA")}</span>
                  </span>
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
