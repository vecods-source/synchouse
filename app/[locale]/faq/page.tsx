"use client";

import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href={`/${locale}`}
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors`}
          >
            {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {t("legal.backHome")}
          </Link>

          <h1 className={`font-bold mb-6 ${isRTL ? "text-2xl md:text-4xl leading-relaxed" : "text-3xl md:text-5xl"}`}>
            {t("faq.title")}
          </h1>

          <p className={`text-muted-foreground mb-12 ${isRTL ? "text-sm md:text-lg leading-loose" : "text-base md:text-xl"}`}>
            {t("faq.subtitle")}
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6"
              >
                <AccordionTrigger className={`${isRTL ? "text-right" : "text-left"}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground ${isRTL ? "text-right" : ""}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 p-8 keep-card bg-secondary rounded-2xl text-center">
            <h2 className={`font-bold mb-4 ${isRTL ? "text-lg md:text-xl leading-relaxed" : "text-xl md:text-2xl"}`}>
              {t("faq.stillHaveQuestions")}
            </h2>
            <p className={`text-muted-foreground mb-6 ${isRTL ? "text-sm md:text-base leading-loose" : "text-base md:text-lg"}`}>
              {t("faq.contactUs")}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#008080_0%,#000080_50%,#008080_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center gap-2 rounded-lg bg-card px-8 text-sm font-medium text-foreground backdrop-blur-3xl">
                {t("faq.contactButton")}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
