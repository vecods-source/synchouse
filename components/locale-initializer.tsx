"use client"

import { useEffect } from "react"

interface LocaleInitializerProps {
  locale: string
  isRTL: boolean
}

export function LocaleInitializer({ locale, isRTL }: LocaleInitializerProps) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = isRTL ? "rtl" : "ltr"

    if (isRTL) {
      document.body.style.fontFamily = "var(--font-arabic), sans-serif"
      document.body.classList.remove("font-sans")
    } else {
      document.body.style.fontFamily = ""
      document.body.classList.add("font-sans")
    }
  }, [locale, isRTL])

  return null
}
