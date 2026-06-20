"use client"

// AI-agent showcase: a clean chat on the left (assistant-app style, no third-party
// branding) + the agent's live reasoning trace on the right. The customer writes,
// the agent "thinks" (and its reasoning streams in on the side), then it streams a
// reply. Two scenarios loop. Reduced motion shows it settled.

import { useEffect, useState } from "react"
import { t, type Lang } from "@/components/i18n"

type Msg = { from: string; text: string }
type Trace = { fn: string; result: string; state: string }

const UI = {
  en: { placeholder: "Message the agent…", online: "Online" },
  ar: { placeholder: "راسل الوكيل…", online: "متصل" },
}

// per step: visible chat messages, the "thinking" beat, and how many reasoning
// rows are revealed on the side.
const PHASES = [
  { msgs: 1, think: false, r: 0, ms: 900 },
  { msgs: 1, think: true, r: 3, ms: 1500 }, // thinking → understand · reason · detect
  { msgs: 2, think: false, r: 4, ms: 2800 }, // reply + "generated" marker
  { msgs: 3, think: false, r: 4, ms: 1500 },
  { msgs: 3, think: true, r: 6, ms: 1500 }, // thinking → reason · act
  { msgs: 4, think: false, r: 7, ms: 2800 }, // reply + marker
  { msgs: 4, think: false, r: 8, ms: 2400 }, // monitor (live), then loop
]
const CPS = 55

export function ShowcaseDuo({ lang }: { lang: Lang }) {
  const duo = t[lang].solutions.duo
  const ui = UI[lang]
  const count = duo.scenarios.length
  const [scen, setScen] = useState(0)
  const [phase, setPhase] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduced(true)
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => {
      if (phase >= PHASES.length - 1) {
        setScen((s) => (s + 1) % count)
        setPhase(0)
      } else {
        setPhase((p) => p + 1)
      }
    }, PHASES[phase].ms)
    return () => window.clearTimeout(id)
  }, [phase, reduced, count])

  const sc = duo.scenarios[scen]
  const visible = reduced ? sc.chat.length : PHASES[phase].msgs
  const thinking = !reduced && PHASES[phase].think
  const rCount = reduced ? sc.reasoning.length : PHASES[phase].r

  return (
    <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
      {/* chat */}
      <div className="flex h-[440px] sm:h-[520px] flex-col overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.07]">
        <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-3.5">
          <Avatar />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold tracking-tight text-[#0f0a1f]">{duo.agent}</p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {ui.online}
            </p>
          </div>
        </div>

        <div key={scen} className="flex flex-1 flex-col justify-end gap-4 overflow-hidden px-5 py-5">
          {sc.chat.slice(0, visible).map((m, i) =>
            m.from === "agent" ? <Assistant key={i} text={m.text} reduced={reduced} /> : <UserMsg key={i} text={m.text} />,
          )}
          {thinking && <Thinking />}
        </div>
      </div>

      {/* reasoning trace — compact on phones (shorter, bottom-anchored so the
          live/active reasoning stays in view while older steps scroll off top) */}
      <div className="flex h-[300px] sm:h-[520px] flex-col gap-2 overflow-hidden rounded-[14px] bg-[#fafafe] p-4 sm:p-5 ring-1 ring-black/[0.07]">
        <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
          <span className="relative flex h-1.5 w-1.5">
            <span data-anim className="absolute inset-0 rounded-full bg-[#7c5cff]" style={{ animation: "ping-soft 1.6s ease-out infinite" }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
          </span>
          {duo.runLabel}
        </p>
        <div className="mt-1 space-y-1.5 overflow-hidden max-sm:flex max-sm:flex-1 max-sm:flex-col max-sm:justify-end max-sm:gap-1.5 max-sm:space-y-0">
          {sc.reasoning.map((c, i) => (
            <RRow key={i} c={c} shown={i < rCount} />
          ))}
        </div>
      </div>
    </div>
  )
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="flex justify-end" style={{ animation: "pop-in 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
      <div className="max-w-[82%] rounded-2xl rounded-se-sm bg-neutral-100 px-4 py-2.5 text-[13px] leading-relaxed text-[#0f0a1f]">{text}</div>
    </div>
  )
}

function Assistant({ text, reduced }: { text: string; reduced: boolean }) {
  const [k, setK] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (reduced) {
      setK(text.length)
      return
    }
    let raf = 0
    let start = 0
    const tick = (ts: number) => {
      if (!start) start = ts
      const c = Math.min(text.length, Math.floor(((ts - start) / 1000) * CPS))
      setK(c)
      if (c < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, reduced])

  const typing = k < text.length
  return (
    <div className="flex gap-3" style={{ animation: "pop-in 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
      <Avatar small />
      <p className="min-w-0 flex-1 pt-0.5 text-[13px] leading-relaxed text-[#0f0a1f]">
        {text.slice(0, k)}
        {typing && <span data-anim className="ms-px inline-block h-[1.05em] w-[2px] -translate-y-[1px] bg-[#5437d9] align-middle" style={{ animation: "cursor-blink 1s step-end infinite" }} />}
      </p>
    </div>
  )
}

function Thinking() {
  return (
    <div className="flex gap-3" style={{ animation: "pop-in 0.3s ease-out both" }}>
      <Avatar small />
      <div className="flex items-center gap-1 pt-2">
        {[0, 0.16, 0.32].map((d) => (
          <span key={d} data-anim className="h-1.5 w-1.5 rounded-full bg-neutral-400" style={{ animation: `typing-bounce 1.2s ease-in-out ${d}s infinite` }} />
        ))}
      </div>
    </div>
  )
}

function RRow({ c, shown }: { c: Trace; shown: boolean }) {
  const reveal = `transition-all duration-500 ease-out ${shown ? "opacity-100 translate-y-0" : "translate-y-1.5 opacity-0"}`

  if (c.fn === "") {
    return (
      <div className={`flex items-center gap-2 py-0.5 ${reveal}`}>
        <span className="h-px flex-1 bg-black/10" />
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#5437d9]/[0.08] px-2.5 py-1 text-[9px] font-semibold text-[#5437d9] ring-1 ring-[#5437d9]/15">
          <Spark className="h-2.5 w-2.5" />
          {c.result}
        </span>
        <span className="h-px flex-1 bg-black/10" />
      </div>
    )
  }

  const done = c.state === "done"
  const active = c.state === "active"
  return (
    <div className={`flex gap-2.5 rounded-[6px] px-2.5 py-2 ring-1 ${active ? "bg-[#5437d9]/[0.06] ring-[#5437d9]/20" : "bg-white ring-black/[0.05]"} ${reveal}`}>
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${done ? "bg-emerald-50 text-emerald-600" : active ? "bg-[#5437d9]/10 text-[#5437d9]" : "bg-neutral-100 text-neutral-300"}`}>
        {done ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : active ? (
          <span data-anim className="block h-3 w-3 rounded-full border-2 border-[#5437d9]/25 border-t-[#5437d9]" style={{ animation: "spin 0.8s linear infinite" }} />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <code dir="ltr" className="font-mono text-[11px] font-medium tracking-tight text-[#0f0a1f]">
          {c.fn}<span className="text-neutral-300">()</span>
        </code>
        <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">{c.result}</p>
      </div>
    </div>
  )
}

function Avatar({ small }: { small?: boolean }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8a6bff] to-[#5437d9] text-white ${small ? "h-7 w-7" : "h-9 w-9"}`}>
      <Spark className={small ? "h-3.5 w-3.5" : "h-[18px] w-[18px]"} />
    </span>
  )
}

function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    </svg>
  )
}
