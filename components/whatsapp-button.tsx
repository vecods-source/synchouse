"use client";

import { MessageCircle, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

interface WhatsAppButtonProps {
  label: string;
}

export function WhatsAppButton({ label }: WhatsAppButtonProps) {
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);
  const whatsappNumber = locale === "de" ? "4915215928643" : "97455600224";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex h-12 md:h-14 items-center justify-center gap-3 rounded-full bg-accent px-8 md:px-10 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.03] active:scale-[0.97] ${isRTL ? "flex-row-reverse" : ""}`}
    >
      <MessageCircle className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110" />
      <span>{label}</span>
      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
    </a>
  );
}
