import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Kufi_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notokufiarabic/v21/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v3obPnLSmf5yD.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var isArabic = path.startsWith('/ar') || path === '/ar';
                if (isArabic) {
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${notoKufiArabic.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
