"use client"

import { useEffect, useState } from "react"
import { PaymentsMock } from "@/components/payments-mock"
import { AdminBrowser } from "@/components/admin-browser"
import { ShowcaseDuo } from "@/components/showcase-duo"
import { CardGlow } from "@/components/card-glow"
import { t, type Lang } from "@/components/i18n"

// A looping story on the left card: phone pays → admin stock drops & order logs.
const STEP_MS = [1100, 1300, 1200, 1700, 1800, 1300]
const STEPS = STEP_MS.length

export function PaymentFlow({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions
  const [step, setStep] = useState(0)

  // drive the loop
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(5)
      return
    }
    const id = window.setTimeout(() => setStep((s) => (s + 1) % STEPS), STEP_MS[step])
    return () => window.clearTimeout(id)
  }, [step])

  const phoneStage = step === 1 ? 1 : step >= 2 ? 2 : 0

  return (
    <div className="grid gap-6 md:grid-cols-7">
      {/* LEFT — online & in person */}
      <Card title={tr.cardA} className="md:col-span-5">
        <div className="relative min-h-[440px] sm:min-h-[520px]">
          {/* product browser — checkout; form fully visible, summary cropped on the right.
             pushed further right on small screens so it clears the phone */}
          <div className="absolute left-[62%] top-8 z-10 origin-top-left scale-[0.6] sm:left-[33%] sm:top-16 sm:scale-[0.82]">
            <AdminBrowser a={tr.admin} step={step} />
          </div>
          {/* phone mockup — big window on mobile; its inner content scales down (see PaymentsMock) */}
          <div className="absolute top-10 left-1 z-20 w-[12rem] origin-top-left scale-[0.95] sm:left-12 sm:top-16 sm:w-[13.5rem] sm:scale-[0.82]">
            <PaymentsMock tr={tr} bare stage={phoneStage} />
          </div>
        </div>
      </Card>

      {/* RIGHT — maintenance / care plans */}
      <Card title={tr.cardB} className="md:col-span-2" center>
        <CarePanel c={tr.care.monitor} />
      </Card>
    </div>
  )
}

// FULL ROW — two-browser showcase (landing page + product dashboard).
// Rendered separately so it can sit at the bottom of the section.
export function ShowcaseCard({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions
  return (
    <Card title={tr.cardC}>
      <ShowcaseDuo lang={lang} />
    </Card>
  )
}

type LogLine = { time: string; tag: string; msg: string; tone: string }
type CareTr = { live: string; uptime: string; logs: readonly LogLine[] }

const TONES: Record<string, string> = {
  ok: "bg-emerald-50 text-emerald-600",
  info: "bg-[#5437d9]/10 text-[#5437d9]",
  deploy: "bg-amber-50 text-amber-600",
  muted: "bg-neutral-100 text-neutral-400",
}

// After-sales as a live service monitor: a log feed that streams in (health
// checks, auto-scaling, hotfixes, replies, backups) then loops — "we're always
// watching". No icons; just CSS, a live pulse, and colour-coded log lines.
function CarePanel({ c }: { c: CareTr }) {
  const total = c.logs.length
  const [n, setN] = useState(total)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(total)
      return
    }
    setN(0)
    let cur = 0
    const id = window.setInterval(() => {
      cur = cur >= total ? 0 : cur + 1 // refill, then clear and replay
      setN(cur)
    }, 950)
    return () => window.clearInterval(id)
  }, [total])

  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[10px] bg-[#fbfbfe] ring-1 ring-black/[0.07]">
      {/* monitor header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-3.5 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0f0a1f]">
          <span className="relative flex h-1.5 w-1.5">
            <span data-anim className="absolute inset-0 rounded-full bg-emerald-400" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {c.live}
        </span>
        <span className="font-mono text-[9px] text-neutral-400">{c.uptime}</span>
      </div>

      {/* log feed — all lines reserve their space; visibility streams in */}
      <div className="space-y-1 p-3">
        {c.logs.map((l, i) => {
          const shown = i < n
          const latest = i === n - 1
          return (
            <div
              key={i}
              dir="ltr"
              className={`flex items-center gap-2 rounded-[5px] px-2 py-1.5 font-mono text-[10px] transition-all duration-300 ${latest ? "bg-[#5437d9]/[0.04]" : ""} ${shown ? "opacity-100 translate-y-0" : "translate-y-1 opacity-0"}`}
            >
              <span className="shrink-0 tabular-nums text-neutral-400">{l.time}</span>
              <span className={`shrink-0 rounded-[4px] px-1.5 py-0.5 text-[8px] font-bold tracking-wide ${TONES[l.tone] ?? TONES.muted}`}>{l.tag}</span>
              <span className="min-w-0 flex-1 truncate text-neutral-600">{l.msg}</span>
              {latest && <span data-anim className="ms-auto h-2.5 w-1 shrink-0 bg-[#5437d9]" style={{ animation: "cursor-blink 1s step-end infinite" }} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Card({ title, children, className, center, fadeBottom }: { title: string; children: React.ReactNode; className?: string; center?: boolean; fadeBottom?: boolean }) {
  return (
    <div className={`relative flex h-full flex-col overflow-hidden rounded-[5px] border border-black/5 bg-white p-7 sm:p-8 ${className ?? ""}`}>
      <CardGlow />
      <h3 className="relative z-10 max-w-[85%] text-[clamp(17px,1.9vw,24px)] font-medium leading-snug tracking-tight text-[#0f0a1f]">{title}</h3>
      <div className={`relative z-10 mt-6 flex-1 ${center ? "flex items-center justify-center" : ""}`}>{children}</div>
      {/* soft bottom fade so peeking devices dissolve into the card instead of being hard-cut */}
      {fadeBottom && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-24 bg-gradient-to-t from-white via-white/85 to-transparent" />
      )}
    </div>
  )
}
