"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const handleWhatsAppClick = () => {
    const whatsappNumber = locale === "de" ? "4915215928643" : "97455600224";
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleCallClick = () => {
    const phoneNumber = locale === "de" ? "+4915215928643" : "+97455600224";
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const handleEmailClick = () => {
    window.open("mailto:synchouse26@gmail.com", "_self");
  };

  return (
    <section
      id="contact"
      className="border-b border-border/40 bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-16 text-center">
          <div className="mb-3 md:mb-4 inline-block rounded-full bg-primary/10 px-3 md:px-4 py-1.5 md:py-2">
            <span className="text-xs md:text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </div>
          <h2 className={`mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}
            <br />
            <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-sm md:text-lg text-muted-foreground text-pretty px-2 ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>
        </div>

        {/* Contact Method Cards */}
        <div
          className={`grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-3 mb-8 md:mb-12 ${isRTL ? "direction-rtl" : ""}`}
          style={isRTL ? { direction: 'rtl' } : undefined}
          role="list"
          aria-label="Contact methods"
        >
          {/* WhatsApp Card */}
          <button
            onClick={handleWhatsAppClick}
            className="group rounded-xl md:rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-5 md:p-8 shadow-sm hover:shadow-lg hover:border-[#25D366]/50 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            aria-label={`${t("whatsapp")} - ${t("whatsappDesc")}`}
            role="listitem"
          >
            <div className="mb-3 md:mb-4 mx-auto inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors" aria-hidden="true">
              <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-[#25D366]" />
            </div>
            <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-bold">{t("whatsapp")}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{t("whatsappDesc")}</p>
          </button>

          {/* Call Card */}
          <button
            onClick={handleCallClick}
            className="group rounded-xl md:rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-5 md:p-8 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`${t("phone")} - ${t("phoneDesc")}`}
            role="listitem"
          >
            <div className="mb-3 md:mb-4 mx-auto inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
              <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-bold">{t("phone")}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{t("phoneDesc")}</p>
          </button>

          {/* Email Card */}
          <button
            onClick={handleEmailClick}
            className="group rounded-xl md:rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-5 md:p-8 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`${t("email")} - ${t("emailDesc")}`}
            role="listitem"
          >
            <div className="mb-3 md:mb-4 mx-auto inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors" aria-hidden="true">
              <Mail className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
            </div>
            <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-bold">{t("email")}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{t("emailDesc")}</p>
          </button>
        </div>

        {/* Location Banner */}
        <div className={`rounded-xl md:rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-sm md:text-base font-semibold">{t("location")}</span>
          </div>
          <div className={`flex flex-row gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
            <span>{t("locationDoha")}</span>
            <span>|</span>
            <span>{t("locationBerlin")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
