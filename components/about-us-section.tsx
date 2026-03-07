"use client";

import { MapPin, DollarSign, Wrench, ShieldCheck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function AboutUsSection() {
  const t = useTranslations("aboutUs");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const highlights = [
    {
      icon: MapPin,
      title: t("highlights.local.title"),
      description: t("highlights.local.description"),
    },
    {
      icon: DollarSign,
      title: t("highlights.pricing.title"),
      description: t("highlights.pricing.description"),
    },
    {
      icon: Wrench,
      title: t("highlights.maintenance.title"),
      description: t("highlights.maintenance.description"),
    },
    {
      icon: ShieldCheck,
      title: t("highlights.guarantee.title"),
      description: t("highlights.guarantee.description"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="about-us" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="mb-6 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent backdrop-blur-sm">
              {t("badge")}
            </div>
            <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${isRTL ? "leading-relaxed" : ""}`}>
              {t("title1")}{" "}
              <span className="text-accent">{t("title2")}</span>
            </h2>
            <p className={`text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto ${isRTL ? "leading-loose" : ""}`}>
              {t("description")}
            </p>
          </motion.div>

          {/* Highlight cards — 2x2 grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className={`group relative ${isRTL ? "text-right" : ""}`}
              >
                <div
                  className={`relative flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-2xl border border-border/30 bg-card/30 keep-card backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-card/50 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isRTL ? "bg-gradient-to-l" : ""}`}
                  />

                  {/* Icon */}
                  <div className="relative shrink-0">
                    <div className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl bg-accent/10 border border-accent/20 group-hover:border-accent/40 group-hover:bg-accent/20 transition-all duration-500">
                      <item.icon
                        className="h-5 w-5 text-accent transition-transform duration-500 group-hover:scale-110"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0,128,128,0.3))' }}
                      />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 pt-0.5">
                    <h3 className={`text-sm md:text-base font-semibold mb-1.5 transition-colors duration-300 group-hover:text-accent ${isRTL ? "leading-relaxed" : ""}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs md:text-sm text-muted-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground ${isRTL ? "leading-loose" : ""}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <WhatsAppButton label={t("cta")} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
