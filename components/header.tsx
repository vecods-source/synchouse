"use client"

import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { locales, localeNames, type Locale, isRtlLocale } from "@/i18n/config"
import { ChevronDown, Users, Briefcase, FolderOpen, Award, MessageCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
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
  const isRTL = isRtlLocale(locale)
  const { theme, setTheme } = useTheme()

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`

  const navigateToSection = (sectionId: string) => {
    if (isHomePage) {
      // On home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // On other pages, navigate to home with hash
      router.push(`/${locale}#${sectionId}`)
    }
  }

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  const renderLocaleName = (loc: Locale) => {
    if (loc === 'ar') {
      return <span style={{ fontFamily: 'var(--font-arabic), sans-serif' }}>{localeNames[loc]}</span>
    }
    return localeNames[loc]
  }

  const navItems = [
    { id: "about-us", label: t("aboutUs"), icon: Users },
    { id: "services", label: t("services"), icon: Briefcase },
    { id: "portfolio", label: t("portfolio"), icon: FolderOpen },
    { id: "why-us", label: t("whyUs"), icon: Award },
    { id: "contact", label: t("contact"), icon: MessageCircle },
  ]

  return (
    <>
      {/* Top Header */}
      <header
        className="fixed top-0 inset-x-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md"
        role="banner"
      >
        <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="Synchouse - Home">
            <span className="text-lg md:text-xl font-bold tracking-tight">Synchouse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className="text-sm font-medium hover:text-accent transition-colors duration-200"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-9 md:w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 md:h-9 px-2 md:px-3 gap-1">
                  <span className="text-xs md:text-sm font-medium">
                    {renderLocaleName(locale)}
                  </span>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 opacity-50" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px]">
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`text-sm px-3 py-2 ${locale === loc ? "bg-accent/10" : ""}`}
                  >
                    {renderLocaleName(loc)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop CTA Button */}
            <Button
              onClick={() => navigateToSection("contact")}
              className="hidden md:flex relative bg-accent font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-lg"
            >
              {t("getStarted")}
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-foreground/20" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className={`flex items-center justify-around h-16 px-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToSection(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-muted-foreground hover:text-accent active:text-accent transition-colors"
              aria-label={`Navigate to ${item.label} section`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
