"use client"

import { Database, ShoppingCart, Smartphone, Bot, Calendar, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ServicesSection() {
  const { t, isRTL } = useLanguage()

  const services = [
    {
      icon: Database,
      title: t.services.items.erp.title,
      description: t.services.items.erp.description,
    },
    {
      icon: BarChart3,
      title: t.services.items.crm.title,
      description: t.services.items.crm.description,
    },
    {
      icon: ShoppingCart,
      title: t.services.items.ecommerce.title,
      description: t.services.items.ecommerce.description,
    },
    {
      icon: Smartphone,
      title: t.services.items.mobile.title,
      description: t.services.items.mobile.description,
    },
    {
      icon: Bot,
      title: t.services.items.ai.title,
      description: t.services.items.ai.description,
    },
    {
      icon: Calendar,
      title: t.services.items.appointment.title,
      description: t.services.items.appointment.description,
    },
  ]

  return (
    <section id="services" className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
            <span className="text-sm font-semibold text-accent">{t.services.badge}</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
            {t.services.title1}
            <br />
            {t.services.title2}
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t.services.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-md transition-all duration-200 hover:shadow-xl hover:border-accent/30"
            >
              <div className="absolute right-4 top-4 h-2 w-2 bg-accent/20 group-hover:bg-accent/40 transition-colors" />

              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
                <service.icon className="h-7 w-7 text-accent" />
              </div>

              <h3 className={`mb-3 text-xl font-bold ${isRTL ? "leading-relaxed" : ""}`}>{service.title}</h3>
              <p className={`text-muted-foreground ${isRTL ? "leading-loose" : "leading-relaxed"}`}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
