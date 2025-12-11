import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "../globals.css"

// Force dynamic rendering for all admin pages to avoid build-time Clerk errors
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin - Synchouse Outreach Tool",
  description: "AI-powered cold outreach automation tool",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
