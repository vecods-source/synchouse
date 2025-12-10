"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { SiTiktok, SiX } from "react-icons/si";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t, isRTL } = useLanguage();

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
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:px-12">
        {/* Main footer content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand section - spans full width on mobile, 2 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className={`mb-6 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                alt="Synchouse"
                width={40}
                height={40}
                className="h-10 w-10 invert"
              />
              <span className={`text-2xl font-bold ${isRTL ? "" : "font-mono"}`}>SYNCHOUSE</span>
            </div>
            <p className="mb-8 max-w-md text-base leading-relaxed text-background/80">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/synchouse.qa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/synchouse_qa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@synchouse.qa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="TikTok"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services section */}
          <div>
            <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
              {t.footer.services}
            </h3>
            <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.services.items.erp.title}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.services.items.crm.title}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.services.items.ecommerce.title}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.services.items.mobile.title}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.services.items.ai.title}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
              {t.footer.agency}
            </h3>
            <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleScroll(e, "#why-us")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.aboutUs}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
              {t.footer.support}
            </h3>
            <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <Link
                  href="/faq"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className={`mb-6 text-sm font-bold tracking-wider ${isRTL ? "" : "font-mono"}`}>
              {t.footer.legal}
            </h3>
            <ul className={`space-y-3 text-sm ${isRTL ? "" : "font-mono"}`}>
              <li>
                <Link
                  href="/privacy"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {t.footer.cookiePolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t-4 border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
            <p className={`text-sm text-background/60 ${isRTL ? "" : "font-mono"}`}>
              {t.footer.copyright}
            </p>
            <div className={`flex flex-wrap justify-center gap-6 text-sm md:gap-8 ${isRTL ? "" : "font-mono"}`}>
              <Link
                href="/privacy"
                className="text-background/60 hover:text-background transition-colors"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-background/60 hover:text-background transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                href="/cookies"
                className="text-background/60 hover:text-background transition-colors"
              >
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
