"use client";

import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    key: "lazla",
    logo: "/logos/lazla.png",
    url: "https://lazla.qa",
  },
  {
    key: "osoul",
    logo: "/logos/osoul.png",
    url: "https://osoulqatar.com",
  },
  {
    key: "qbf",
    logo: "/logos/qbf.png",
    url: null,
  },
  {
    key: "bitaqa",
    logo: "/logos/bitaqa.png",
    url: "https://apps.apple.com/qa/app/bitaqa-%D8%A8%D8%B7%D8%A7%D9%82%D8%A9/id6758865506",
  },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

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
    <section id="portfolio" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
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
          <p className={`mt-4 text-sm md:text-base text-muted-foreground/70 max-w-2xl mx-auto ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
            {t("description")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {projects.map((project) => {
            const Wrapper = project.url ? "a" : "div";
            const wrapperProps = project.url
              ? { href: project.url, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div key={project.key} variants={itemVariants}>
                <Wrapper
                  {...wrapperProps}
                  dir={isRTL ? "rtl" : "ltr"}
                  className="group relative flex items-start gap-5 md:gap-6 p-6 md:p-8 rounded-2xl border border-border/30 bg-card/30 keep-card backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-card/50"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isRTL ? "bg-gradient-to-l" : ""}`}
                  />

                  {/* Logo */}
                  <div className="relative shrink-0">
                    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/5 border border-border/20 group-hover:border-accent/40 transition-all duration-500 overflow-hidden">
                      <Image
                        src={project.logo}
                        alt={t(`projects.${project.key}.name`)}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="object-contain w-10 h-10 md:w-12 md:h-12"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 group-hover:text-accent ${isRTL ? "leading-relaxed" : ""}`}>
                        {t(`projects.${project.key}.name`)}
                      </h3>
                      {project.url && (
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-accent transition-colors duration-300" />
                      )}
                    </div>
                    <span className={`inline-block text-[11px] font-medium uppercase tracking-wider text-accent/70 mb-2 ${isRTL ? "leading-relaxed" : ""}`}>
                      {t(`projects.${project.key}.type`)}
                    </span>
                    <p className={`text-sm text-muted-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground ${isRTL ? "leading-loose" : ""}`}>
                      {t(`projects.${project.key}.description`)}
                    </p>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
