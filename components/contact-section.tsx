"use client";

import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  return (
    <section id="contact" className="bg-background py-24 md:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-8 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
            {t("badge")}
          </div>

          <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}{" "}
            <span className="text-accent">{t("title2")}</span>
          </h2>

          <p className={`text-sm md:text-base text-muted-foreground mb-10 md:mb-12 leading-relaxed ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>

          <WhatsAppButton label={t("cta")} />

          <p className="mt-8 text-xs text-muted-foreground/70">
            {t("responseTime")}
          </p>
        </div>
      </div>
    </section>
  );
}
