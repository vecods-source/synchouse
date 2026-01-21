"use client";

import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isRtlLocale, type Locale } from "@/i18n/config";

export default function PrivacyPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href={`/${locale}`}
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors`}
          >
            {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {t("legal.backHome")}
          </Link>

          <h1 className={`font-bold mb-6 ${isRTL ? "text-2xl md:text-4xl leading-relaxed" : "text-3xl md:text-5xl"}`}>
            {t("legal.privacy.title")}
          </h1>

          <p className={`text-muted-foreground mb-8 ${isRTL ? "text-sm md:text-base leading-loose" : "text-base md:text-lg"}`}>
            {t("legal.privacy.lastUpdated")}: {t("legal.privacy.date")}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
                {t("legal.privacy.sections.intro.title")}
              </h2>
              <p className={`text-muted-foreground ${isRTL ? "text-xs md:text-sm leading-loose" : "text-sm md:text-base"}`}>
                {t("legal.privacy.sections.intro.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
                {t("legal.privacy.sections.dataCollection.title")}
              </h2>
              <p className={`text-muted-foreground ${isRTL ? "text-xs md:text-sm leading-loose" : "text-sm md:text-base"}`}>
                {t("legal.privacy.sections.dataCollection.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
                {t("legal.privacy.sections.dataUse.title")}
              </h2>
              <p className={`text-muted-foreground ${isRTL ? "text-xs md:text-sm leading-loose" : "text-sm md:text-base"}`}>
                {t("legal.privacy.sections.dataUse.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
                {t("legal.privacy.sections.dataSecurity.title")}
              </h2>
              <p className={`text-muted-foreground ${isRTL ? "text-xs md:text-sm leading-loose" : "text-sm md:text-base"}`}>
                {t("legal.privacy.sections.dataSecurity.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
                {t("legal.privacy.sections.contact.title")}
              </h2>
              <p className={`text-muted-foreground ${isRTL ? "text-xs md:text-sm leading-loose" : "text-sm md:text-base"}`}>
                {t("legal.privacy.sections.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
