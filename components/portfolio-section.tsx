"use client";

import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

const industries = ["ecommerce", "enterprise", "education", "fintech", "logistics", "hospitality"];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  return (
    <section id="portfolio" className="bg-background py-16 md:py-20 border-y border-border/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-6 block">
            {t("badge")}
          </span>
          <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            {industries.map((industry, index) => (
              <span key={industry} className="flex items-center gap-8">
                <span className="text-sm text-foreground/60">
                  {t(`industries.${industry}.title`)}
                </span>
                {index < industries.length - 1 && (
                  <span className="text-border/30 hidden sm:inline">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
