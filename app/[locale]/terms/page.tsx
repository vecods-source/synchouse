"use client";

import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isRtlLocale, type Locale } from "@/i18n/config";

export default function TermsPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href={`/${locale}`}
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {t("legal.backHome")}
          </Link>

          <h1 className={`text-4xl font-bold mb-8 ${isRTL ? "leading-relaxed" : ""}`}>
            {t("legal.terms.title")}
          </h1>

          <p className={`text-muted-foreground mb-8 ${isRTL ? "leading-loose" : ""}`}>
            {t("legal.terms.lastUpdated")}: {t("legal.terms.date")}
          </p>

          <div className={`prose prose-lg max-w-none ${isRTL ? "leading-loose" : ""}`}>
            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t("legal.terms.sections.acceptance.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("legal.terms.sections.acceptance.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t("legal.terms.sections.services.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("legal.terms.sections.services.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t("legal.terms.sections.intellectual.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("legal.terms.sections.intellectual.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t("legal.terms.sections.liability.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("legal.terms.sections.liability.content")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t("legal.terms.sections.changes.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("legal.terms.sections.changes.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
