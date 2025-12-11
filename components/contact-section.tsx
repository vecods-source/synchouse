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
      className="border-b border-border/40 bg-background py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </div>
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}
            <br />
            <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>
        </div>

        {/* Contact Method Cards */}
        <div className={`grid gap-6 md:grid-cols-3 mb-12 ${isRTL ? "direction-rtl" : ""}`} style={isRTL ? { direction: 'rtl' } : undefined}>
          {/* WhatsApp Card */}
          <button
            onClick={handleWhatsAppClick}
            className="group rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg hover:border-[#25D366]/50 transition-all duration-300 text-center"
          >
            <div className="mb-4 mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="h-8 w-8 text-[#25D366]" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("whatsapp")}</h3>
            <p className="text-sm text-muted-foreground">{t("whatsappDesc")}</p>
          </button>

          {/* Call Card */}
          <button
            onClick={handleCallClick}
            className="group rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center"
          >
            <div className="mb-4 mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("phone")}</h3>
            <p className="text-sm text-muted-foreground">{t("phoneDesc")}</p>
          </button>

          {/* Email Card */}
          <button
            onClick={handleEmailClick}
            className="group rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 text-center"
          >
            <div className="mb-4 mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t("email")}</h3>
            <p className="text-sm text-muted-foreground">{t("emailDesc")}</p>
          </button>
        </div>

        {/* Location Banner */}
        <div className={`rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm p-6 flex flex-col md:flex-row items-center justify-center gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold">{t("location")}</span>
          </div>
          <div className={`flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-muted-foreground ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <span>{t("locationDoha")}</span>
            <span className="hidden md:inline">|</span>
            <span>{t("locationBerlin")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
