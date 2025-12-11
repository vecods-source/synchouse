"use client"

import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { locales, localeFlags, type Locale } from "@/i18n/config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const t = useTranslations("header")
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-border/40 bg-background/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">Synchouse</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            {t("services")}
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            {t("whyUs")}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            {t("contact")}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <span className="text-lg">
                  {localeFlags[locale]}
                </span>
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-0">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`justify-center text-xl px-3 ${locale === loc ? "bg-accent/10" : ""}`}
                >
                  {localeFlags[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => scrollToSection("contact")}
            className="relative bg-accent font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-lg"
          >
            {t("getStarted")}
            <span className="absolute -right-1 -top-1 h-2 w-2 bg-foreground/20" />
          </Button>
        </div>
      </div>
    </header>
  )
}
