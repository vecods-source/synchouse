import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale, isRtlLocale } from "@/i18n/config"
import { LocaleInitializer } from "@/components/locale-initializer"
import { Toaster } from "@/components/ui/toaster"

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
    <NextIntlClientProvider messages={messages}>
      <LocaleInitializer locale={locale} isRTL={isRTL} />
      {children}
      <Toaster />
    </NextIntlClientProvider>
  )
}
