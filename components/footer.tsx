"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

export function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services.items");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-background text-foreground pb-20 md:pb-0 border-t border-border/40">
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-20 lg:px-12">
        {/* Main footer content */}
        <div
          className={`grid gap-8 md:gap-12 grid-cols-2 md:grid-cols-2 lg:grid-cols-5 lg:gap-12 ${isRTL ? "direction-rtl" : ""}`}
          style={isRTL ? { direction: "rtl" } : undefined}
        >
          {/* Brand section - spans full width on mobile, 1 col on desktop, order last in RTL */}
          <div
            className={`col-span-2 md:col-span-2 lg:col-span-1 ${isRTL ? "lg:order-last" : ""}`}
            style={{ direction: "ltr" }}
          >
            <div
              className={`w-full mb-4 md:mb-6 flex items-center gap-2 md:gap-3 ${isRTL ? "justify-end" : ""}`}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                alt="Synchouse"
                width={40}
                height={40}
                className="h-8 w-8 md:h-10 md:w-10 dark:invert"
              />
              <span
                className={`text-xl md:text-2xl font-bold ${isRTL ? "" : "font-mono"}`}
              >
                SYNCHOUSE
              </span>
            </div>
            <p
              className={`mb-6 md:mb-8 max-w-md text-xs md:text-sm leading-relaxed text-muted-foreground ${isRTL ? "text-right" : ""}`}
            >
              {t("description")}
            </p>
            <div className={`flex gap-3 md:gap-4 w-full ${isRTL ? "justify-end" : ""}`}>
              <a
                href="https://www.instagram.com/synchouse.qa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 md:h-11 md:w-11 items-center justify-center border-2 border-foreground bg-foreground text-background transition-colors hover:bg-foreground/90 pixel-corners"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          {/* Services section */}
          <div>
            <h3
              className={`mb-4 md:mb-6 text-xs md:text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}
            >
              {t("services")}
            </h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tServices("erp.title")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tServices("crm.title")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tServices("ecommerce.title")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tServices("mobile.title")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tServices("ai.title")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`mb-4 md:mb-6 text-xs md:text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}
            >
              {t("agency")}
            </h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleScroll(e, "#why-us")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3
              className={`mb-4 md:mb-6 text-xs md:text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}
            >
              {t("legal")}
            </h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3
              className={`mb-4 md:mb-6 text-xs md:text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}
            >
              {t("support")}
            </h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 md:mt-16 border-t-2 md:border-t-4 border-border pt-6 md:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-4">
            <p
              className={`text-xs md:text-sm text-muted-foreground text-center md:text-left ${isRTL ? "" : "font-mono"}`}
            >
              {t("copyright")}
            </p>
            <div
              className={`flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm md:gap-8 ${isRTL ? "" : "font-mono"}`}
            >
              <Link
                href={`/${locale}/privacy`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
