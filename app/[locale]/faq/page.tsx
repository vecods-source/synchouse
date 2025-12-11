"use client";

import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isRtlLocale, type Locale } from "@/i18n/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const questions = [
    { question: t("faq.questions.0.question"), answer: t("faq.questions.0.answer") },
    { question: t("faq.questions.1.question"), answer: t("faq.questions.1.answer") },
    { question: t("faq.questions.2.question"), answer: t("faq.questions.2.answer") },
    { question: t("faq.questions.3.question"), answer: t("faq.questions.3.answer") },
    { question: t("faq.questions.4.question"), answer: t("faq.questions.4.answer") },
    { question: t("faq.questions.5.question"), answer: t("faq.questions.5.answer") },
    { question: t("faq.questions.6.question"), answer: t("faq.questions.6.answer") },
  ];

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

          <h1 className={`text-4xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
            {t("faq.title")}
          </h1>

          <p className={`text-muted-foreground mb-12 text-lg ${isRTL ? "leading-loose" : ""}`}>
            {t("faq.subtitle")}
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6"
              >
                <AccordionTrigger className={`text-left ${isRTL ? "text-right leading-relaxed" : ""}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground ${isRTL ? "leading-loose text-right" : ""}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 p-8 bg-secondary rounded-2xl text-center">
            <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
              {t("faq.stillHaveQuestions")}
            </h2>
            <p className={`text-muted-foreground mb-6 ${isRTL ? "leading-loose" : ""}`}>
              {t("faq.contactUs")}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              {t("faq.contactButton")}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
