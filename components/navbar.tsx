"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useWhatsApp } from "@/components/whatsapp-gate"
import { t, type Lang } from "@/components/i18n"

export function Navbar({ lang }: { lang: Lang }) {
  const { open: openGate } = useWhatsApp()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const nav = t[lang].nav
  const home = lang === "ar" ? "/ar" : "/"
  const otherHref = lang === "ar" ? "/" : "/ar"
  const links = [
    { label: nav.services, href: "#services" },
    { label: nav.work, href: "#work" },
    { label: nav.process, href: "#process" },
    { label: nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onChange)
    return () => {
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onChange)
    }
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          {/* Left: logo + links */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href={home} aria-label="Shara home" className="relative z-50 flex items-center" onClick={close}>
              <Image src="/logo/logo-dark.png" alt="Shara" width={36} height={36} className="h-9 w-9" priority />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-7 md:flex lg:gap-10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] font-normal text-neutral-600 transition-colors hover:text-neutral-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: language toggle + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={otherHref}
              className="rounded-[5px] border border-black/10 px-3.5 py-2 text-[14px] font-medium text-neutral-600 transition-colors hover:border-[#5437d9]/40 hover:text-[#5437d9]"
            >
              {nav.other}
            </Link>
            <button
              type="button"
              onClick={() => openGate()}
              className="rounded-[5px] bg-[#5437d9] px-5 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
            >
              {nav.start}
            </button>
          </div>

          {/* Mobile burger toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-50 -mx-2 flex h-10 w-10 items-center justify-center text-neutral-800 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-white transition-opacity duration-300 ease-out md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col overflow-y-auto px-4 pt-20 pb-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="border-b border-black/5 py-4 text-[22px] font-medium tracking-tight text-neutral-900 transition-colors hover:text-neutral-500"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              close()
              openGate()
            }}
            className="mt-8 block w-full rounded-[5px] bg-[#5437d9] px-5 py-3 text-center text-[14px] font-medium tracking-tight text-white transition-opacity hover:opacity-90"
          >
            {nav.start}
          </button>
          <Link
            href={otherHref}
            onClick={close}
            className="mt-5 block text-center text-[13px] font-medium text-neutral-500 transition-colors hover:text-[#5437d9]"
          >
            {nav.other}
          </Link>
        </nav>
      </div>
    </>
  )
}
