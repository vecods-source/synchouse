"use client";

import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  const { t, isRTL } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {t.legal.backHome}
          </Link>

          <h1 className={`text-4xl font-bold mb-8 ${isRTL ? "leading-relaxed" : ""}`}>
            {t.legal.cookies.title}
          </h1>

          <p className={`text-muted-foreground mb-8 ${isRTL ? "leading-loose" : ""}`}>
            {t.legal.cookies.lastUpdated}: {t.legal.cookies.date}
          </p>

          <div className={`prose prose-lg max-w-none ${isRTL ? "leading-loose" : ""}`}>
            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t.legal.cookies.sections.what.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.legal.cookies.sections.what.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t.legal.cookies.sections.how.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.legal.cookies.sections.how.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t.legal.cookies.sections.types.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.legal.cookies.sections.types.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${isRTL ? "leading-relaxed" : ""}`}>
                {t.legal.cookies.sections.manage.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.legal.cookies.sections.manage.content}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
