"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { isRtlLocale, type Locale } from "@/i18n/config"
import { X, Cookie } from "lucide-react"

const COOKIE_CONSENT_KEY = "synchouse-cookie-consent"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations("cookies")
  const locale = useLocale() as Locale
  const isRTL = isRtlLocale(locale)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-16 md:bottom-0 left-0 right-0 z-40 p-3 md:p-6 animate-in slide-in-from-bottom-full duration-500`}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        className={`mx-auto max-w-4xl rounded-xl md:rounded-2xl border border-border/40 bg-card/95 backdrop-blur-md p-4 md:p-6 shadow-2xl ${
          isRTL ? "text-right" : "text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className={`flex items-start gap-3 md:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Cookie className="h-4 w-4 md:h-5 md:w-5 text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 id="cookie-consent-title" className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              {t("title")}
            </h3>
            <p id="cookie-consent-description" className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              {t("description")}
            </p>

            <div className={`flex flex-wrap gap-2 md:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button
                onClick={acceptCookies}
                className="bg-accent hover:bg-accent/90 text-xs md:text-sm h-8 md:h-10 px-3 md:px-4"
              >
                {t("accept")}
              </Button>
              <Button
                onClick={declineCookies}
                variant="outline"
                className="text-xs md:text-sm h-8 md:h-10 px-3 md:px-4"
              >
                {t("decline")}
              </Button>
            </div>
          </div>

          <button
            onClick={declineCookies}
            className="flex-shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
            aria-label={t("close")}
          >
            <X className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
