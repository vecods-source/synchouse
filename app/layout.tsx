import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

export const metadata: Metadata = {
  title: "Shara",
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
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
