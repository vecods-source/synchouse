"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const whatsappNumber = locale === "de" ? "4915215928643" : "97455600224";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;


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

          <p className={`text-sm md:text-base text-muted-foreground/70 mb-10 md:mb-12 leading-relaxed ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-12 md:h-14 overflow-hidden rounded-full p-[1px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#008080_0%,#000080_50%,#008080_100%)]" />
            <span className={`inline-flex h-full w-full items-center justify-center gap-3 rounded-full bg-card px-8 md:px-10 text-sm md:text-base font-medium text-foreground backdrop-blur-3xl ${isRTL ? "flex-row-reverse" : ""}`}>
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-accent" />
              {t("cta")}
            </span>
          </a>

          <p className="mt-8 text-xs text-muted-foreground/50">
            {t("responseTime")}
          </p>
        </div>
      </div>
    </section>
  );
}
