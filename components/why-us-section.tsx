"use client";

import { Zap, Shield, Headphones } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { motion } from "framer-motion";

export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const reasons = [
    {
      icon: Zap,
      title: t("reasons.fastDelivery.title"),
      description: t("reasons.fastDelivery.description"),
      gradient: "from-accent/20 via-accent/5 to-transparent",
    },
    {
      icon: Shield,
      title: t("reasons.security.title"),
      description: t("reasons.security.description"),
      gradient: "from-accent/20 via-accent/5 to-transparent",
    },
    {
      icon: Headphones,
      title: t("reasons.support.title"),
      description: t("reasons.support.description"),
      gradient: "from-accent/20 via-accent/5 to-transparent",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="why-us" className="relative bg-muted/20 py-20 md:py-32 overflow-hidden">

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="mb-6 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent backdrop-blur-sm">
              {t("badge")}
            </div>
            <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isRTL ? "leading-relaxed" : ""}`}>
              {t("title1")}{" "}
              <span className="text-accent">{t("title2")}</span>
            </h2>
          </motion.div>

          {/* 3 key points - cards with glassmorphism */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className={`group relative ${isRTL ? "text-right" : ""}`}
              >
                {/* Card */}
                <div
                  className={`relative flex items-start gap-5 md:gap-6 p-6 md:p-8 rounded-2xl border border-border/30 bg-card/30 keep-card backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-card/50 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isRTL ? "bg-gradient-to-l" : ""}`}
                  />

                  {/* Icon container */}
                  <div className="relative shrink-0">
                    <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 border border-accent/20 group-hover:border-accent/40 group-hover:bg-accent/20 transition-all duration-500">
                      <reason.icon
                        className="h-5 w-5 md:h-6 md:w-6 text-accent transition-transform duration-500 group-hover:scale-110"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(0,128,128,0.6))' }}
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 pt-1">
                    <h3 className={`text-base md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-accent ${isRTL ? "leading-relaxed" : ""}`}>
                      {reason.title}
                    </h3>
                    <p className={`text-sm text-muted-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground ${isRTL ? "leading-loose" : ""}`}>
                      {reason.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
