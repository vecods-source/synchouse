"use client"

import { usePathname } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { t } from "@/components/i18n"

// A global gate shown before every WhatsApp redirect: asks budget, brief and
// when to start, then opens WhatsApp pre-filled with the answers. Locale-aware.

const WHATSAPP = "https://wa.me/97466012332"

type OpenOpts = { title?: string; brief?: string }

const Ctx = createContext<{ open: (o?: OpenOpts) => void }>({ open: () => {} })
export const useWhatsApp = () => useContext(Ctx)

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lang = pathname?.startsWith("/ar") ? "ar" : "en"
  const g = t[lang].gate

  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [brief, setBrief] = useState("")
  const [budget, setBudget] = useState("")
  const [when, setWhen] = useState("")

  const open = useCallback((o?: OpenOpts) => {
    setTitle(o?.title ?? "")
    setBrief(o?.brief ?? "")
    setBudget("")
    setWhen("")
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const send = () => {
    const lines: string[] = [g.intro]
    if (brief.trim()) lines.push(`• ${brief.trim()}`)
    if (budget) lines.push(`• ${g.budgetMsg}: ${budget}`)
    if (when) lines.push(`• ${g.startMsg}: ${when}`)
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener")
    setIsOpen(false)
  }

  return (
    <Ctx.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div
            aria-hidden
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title || g.title}
            dir={lang === "ar" ? "rtl" : "ltr"}
            data-pop
            className="relative w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-[5px] sm:p-8"
            style={{ animation: "pop-in 0.3s ease-out both" }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>

            <h3 className="text-[22px] font-semibold tracking-tight text-[#0f0a1f]">{title || g.title}</h3>
            <p className="mt-1.5 text-[14px] text-neutral-500">{g.sub}</p>

            {/* Budget */}
            <p className="mt-6 text-[13px] font-medium text-[#0f0a1f]">{g.budget}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {g.budgets.map((b) => (
                <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(b)} />
              ))}
            </div>

            {/* Brief */}
            <p className="mt-5 text-[13px] font-medium text-[#0f0a1f]">{g.brief}</p>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={3}
              placeholder={g.briefPh}
              className="mt-2.5 w-full resize-none rounded-[5px] bg-neutral-100 px-4 py-3 text-[14px] text-[#0f0a1f] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#5437d9]/30"
            />

            {/* When */}
            <p className="mt-5 text-[13px] font-medium text-[#0f0a1f]">{g.when}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {g.whens.map((w) => (
                <Chip key={w} label={w} active={when === w} onClick={() => setWhen(w)} />
              ))}
            </div>

            <button
              type="button"
              onClick={send}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#25D366] px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .103 5.36.1 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.946-5.361 11.949-11.893a11.821 11.821 0 00-3.421-8.452z" />
              </svg>
              {g.cta}
            </button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        active ? "bg-[#5437d9] text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {label}
    </button>
  )
}

// Drop-in trigger for server components: a button styled by `className` that
// opens the gate (optionally pre-filling the brief / title).
export function WhatsAppButton({
  children,
  className,
  brief,
  title,
}: {
  children: ReactNode
  className?: string
  brief?: string
  title?: string
}) {
  const { open } = useWhatsApp()
  return (
    <button type="button" className={className} onClick={() => open({ brief, title })}>
      {children}
    </button>
  )
}
