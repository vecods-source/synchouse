"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations("accessibility")

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-accent hover:bg-accent/90 shadow-lg transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      size="icon"
      aria-label={t("scrollToTop")}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </Button>
  )
}
