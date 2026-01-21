"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { isRtlLocale, type Locale } from "@/i18n/config";

export function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services.items");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navigateToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/${locale}${sectionId}`);
    }
  };

  return (
    <footer className="bg-background text-foreground pb-20 md:pb-0 border-t border-border/40">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-20">
        {/* Mobile Footer - Minimal */}
        <div className="md:hidden">
          <div className={`flex flex-col items-center text-center gap-4 ${isRTL ? "direction-rtl" : ""}`} style={isRTL ? { direction: "rtl" } : undefined}>
            {/* Brand */}
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                alt="Synchouse"
                width={32}
                height={32}
                className="h-6 w-6 dark:invert"
              />
              <span className={`text-lg font-bold ${isRTL ? "" : "font-mono"}`}>
                SYNCHOUSE
              </span>
            </div>

            {/* Social */}
            <a
              href="https://www.instagram.com/synchouse.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center border border-foreground bg-foreground text-background transition-colors hover:bg-foreground/90 rounded"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>

            {/* Quick Links */}
            <div className={`flex flex-wrap items-center justify-center gap-3 text-xs ${isRTL ? "" : "font-mono"}`}>
              <Link href={`/${locale}/about`} className="text-muted-foreground hover:text-foreground">
                {t("aboutUs")}
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link href={`/${locale}/privacy`} className="text-muted-foreground hover:text-foreground">
                {t("privacy")}
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link href={`/${locale}/terms`} className="text-muted-foreground hover:text-foreground">
                {t("terms")}
              </Link>
            </div>

            {/* Copyright */}
            <p className={`text-xs text-muted-foreground ${isRTL ? "" : "font-mono"}`}>
              {t("copyright")}
            </p>
          </div>
        </div>

        {/* Desktop Footer - Full */}
        <div className="hidden md:block">
          <div
            className={`grid gap-12 grid-cols-2 lg:grid-cols-5 lg:gap-12 ${isRTL ? "direction-rtl" : ""}`}
            style={isRTL ? { direction: "rtl" } : undefined}
          >
            {/* Brand section */}
            <div
              className={`lg:col-span-1 ${isRTL ? "col-span-1 order-first" : "col-span-2"}`}
              style={{ direction: "ltr" }}
            >
              <div
                className={`w-full mb-6 flex items-center gap-3 ${isRTL ? "justify-end" : ""}`}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                  alt="Synchouse"
                  width={40}
                  height={40}
                  className="h-10 w-10 dark:invert"
                />
                <span className={`text-2xl font-bold ${isRTL ? "" : "font-mono"}`}>
                  SYNCHOUSE
                </span>
              </div>
              <p
                className={`mb-8 max-w-md text-sm leading-relaxed text-muted-foreground ${isRTL ? "text-right" : ""}`}
              >
                {t("description")}
              </p>
              <div className={`flex gap-4 w-full ${isRTL ? "justify-end" : ""}`}>
                <a
                  href="https://www.instagram.com/synchouse.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border-2 border-foreground bg-foreground text-background transition-colors hover:bg-foreground/90 pixel-corners"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services section */}
            <div>
              <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
                {t("services")}
              </h3>
              <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
                <li>
                  <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tServices("erp.title")}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tServices("crm.title")}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tServices("ecommerce.title")}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tServices("mobile.title")}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => navigateToSection(e, "#services")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {tServices("ai.title")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Agency section */}
            <div>
              <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
                {t("agency")}
              </h3>
              <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
                <li>
                  <Link href={`/${locale}/about`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => navigateToSection(e, "#contact")} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("contact")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal section */}
            <div>
              <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
                {t("legal")}
              </h3>
              <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
                <li>
                  <Link href={`/${locale}/privacy`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/terms`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("termsOfService")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support section */}
            <div>
              <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
                {t("support")}
              </h3>
              <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
                <li>
                  <Link href={`/${locale}/faq`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {t("faq")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar - Desktop only */}
          <div className="mt-16 border-t-4 border-border pt-8">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className={`flex flex-row items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p className={`text-sm text-muted-foreground ${isRTL ? "" : "font-mono"}`}>
                  {t("copyright")}
                </p>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className={`text-xs text-muted-foreground ${isRTL ? "" : "font-mono"}`}>
                    {t("availableForProjects")}
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-8 text-sm ${isRTL ? "" : "font-mono"}`}>
                <Link href={`/${locale}/privacy`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("privacy")}
                </Link>
                <Link href={`/${locale}/terms`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("terms")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
