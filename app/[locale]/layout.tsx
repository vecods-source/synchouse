import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Kufi_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale, isRtlLocale } from "@/i18n/config"
import "../globals.css"

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Synchouse - Digital Solutions Synchronized",
  description:
    "Enterprise-grade software solutions including ERP, CRM, E-Commerce, Mobile Apps, AI Agents, and Appointment Management Systems",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png",
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const isRTL = isRtlLocale(locale as Locale)

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className="scroll-smooth">
      <body
        className={`${isRTL ? "" : "font-sans"} ${GeistSans.variable} ${GeistMono.variable} ${notoKufiArabic.variable} antialiased`}
        style={isRTL ? { fontFamily: "var(--font-arabic), sans-serif" } : undefined}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
