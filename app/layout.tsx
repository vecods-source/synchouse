import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { WhatsAppProvider } from "@/components/whatsapp-gate"
import "./globals.css"

const poppins = localFont({
  src: [
    { path: "../brand/fonts/en/Poppins-Light.woff2", weight: "300", style: "normal" },
    { path: "../brand/fonts/en/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "../brand/fonts/en/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "../brand/fonts/en/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../brand/fonts/en/Poppins-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
})

const plexArabic = localFont({
  src: [
    { path: "../brand/fonts/IBMPlexSansArabic-Light.woff2", weight: "300", style: "normal" },
    { path: "../brand/fonts/IBMPlexSansArabic-Regular.woff2", weight: "400", style: "normal" },
    { path: "../brand/fonts/IBMPlexSansArabic-Medium.woff2", weight: "500", style: "normal" },
    { path: "../brand/fonts/IBMPlexSansArabic-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../brand/fonts/IBMPlexSansArabic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://shara.qa"),
  title: { default: "Shara — Software that ships", template: "%s · Shara" },
  description:
    "Shara is a Qatar software company. We design, build and ship web and mobile apps — fixed price, full ownership, and support after launch.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    title: "Shara — Software that ships",
    description: "Built in Qatar. Owned by you.",
    url: "https://shara.qa",
    siteName: "Shara",
    locale: "en_US",
    type: "website",
    images: ["/koba.png"],
  },
  icons: {
    icon: "/logo/logo-dark.png",
    apple: "/logo/logo-dark.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${plexArabic.variable}`}>
      <body>
        <WhatsAppProvider>{children}</WhatsAppProvider>
      </body>
    </html>
  )
}
