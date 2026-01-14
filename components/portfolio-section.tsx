"use client";

import { ShoppingBag, Building2, GraduationCap, Landmark, Truck, Utensils } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

const industries = [
  { id: "ecommerce", icon: ShoppingBag },
  { id: "enterprise", icon: Building2 },
  { id: "education", icon: GraduationCap },
  { id: "fintech", icon: Landmark },
  { id: "logistics", icon: Truck },
  { id: "hospitality", icon: Utensils },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="portfolio"
      className="border-b-4 border-foreground bg-secondary py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block border-4 border-foreground bg-foreground px-4 py-2 pixel-corners">
            <span className={`text-sm font-bold text-background ${isRTL ? "" : "font-mono"}`}>
              {t("badge")}
            </span>
          </div>
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance ${isRTL ? "leading-relaxed" : "font-mono"}`}>
            {t("title1")}
            <br />
            <span className="text-accent">{t("title2")}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group border-4 border-foreground bg-card p-6 pixel-corners transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-4 border-foreground bg-background pixel-corners group-hover:bg-accent-foreground group-hover:text-accent transition-colors">
                  <industry.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg group-hover:text-accent-foreground transition-colors ${isRTL ? "" : "font-mono"}`}>
                    {t(`industries.${industry.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/80 transition-colors">
                    {t(`industries.${industry.id}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className={`mb-4 text-muted-foreground ${isRTL ? "leading-loose" : ""}`}>
            {t("cta.description")}
          </p>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className={`inline-flex items-center gap-2 bg-foreground text-background hover:bg-accent hover:text-accent-foreground border-4 border-foreground px-6 py-3 text-sm font-bold pixel-corners transition-colors ${isRTL ? "" : "font-mono"}`}
          >
            {t("cta.button")}
          </a>
        </div>
      </div>
    </section>
  );
}
