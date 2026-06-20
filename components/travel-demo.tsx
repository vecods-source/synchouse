"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Poppins } from "next/font/google"

// CONCEPT 3 — Before vs After, a travel card.
// BEFORE = a replica of the reference (image #6): a pretty but flawed card —
// centered title + a long centered paragraph, a low-contrast extra-light type,
// the action competing with the price. AFTER = the redesign (clarity, hierarchy).

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], display: "swap" })

const E = "cubic-bezier(0.32, 0.72, 0, 1)"
const W = 280
const H = 398

// ───────────────────────── BEFORE (matches image #6) ─────────────────────────
const DESC = "Experience a premium family vacation in the heart of Qatar with unforgettable moments, iconic landmarks, beautiful city views, world-class attractions, comfortable stays, guided experiences, and memorable journeys designed for families who want luxury."

function BeforeCard() {
  return (
    <div className={`relative flex flex-col overflow-hidden bg-white ${poppins.className}`} style={{ width: W, height: H, borderRadius: 5, boxShadow: "0 22px 50px -26px rgba(40,40,40,0.25)" }}>
      {/* heart, top-right */}
      <div className="absolute z-10 flex items-center justify-center" style={{ right: 14, top: 14, width: 28, height: 28, borderRadius: 999, background: "rgba(40,40,40,0.06)" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="1.7"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
      </div>

      {/* diorama — centered, top padding, white fade circle around it */}
      <div className="relative shrink-0 overflow-hidden" style={{ height: 182 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/doha-bad.webp" alt="Doha Corniche" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", display: "block" }} />
      </div>

      {/* content — title + description sit high, clear space above the buttons */}
      <div className="flex flex-1 flex-col px-5 text-center">
        {/* title + desc — vertically centered group */}
        <div className="flex flex-1 flex-col justify-center">
          <h3 style={{ fontWeight: 200, fontSize: 27, letterSpacing: "0.02em", color: "#34302a" }}>Qatar</h3>
          <p style={{ fontWeight: 300, fontSize: 8.6, lineHeight: 1.7, color: "#857f75", marginTop: 8 }}>{DESC}</p>
        </div>

        {/* explore + price footer */}
        <div className="flex items-center justify-center gap-5" style={{ paddingBottom: 22 }}>
          <span className="flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5437d9,#7c5cff)", color: "#fff", fontWeight: 400, fontSize: 10.5, letterSpacing: "0.04em", padding: "8px 20px", borderRadius: 5 }}>Explore</span>
          <span style={{ fontWeight: 500, fontSize: 17, color: "#34302a" }}>QAR 899</span>
        </div>
      </div>
    </div>
  )
}

// ───────────────────────── AFTER (clean redesign) ─────────────────────────
function Badge({ bg, color, children }: { bg: string; color: string; children: ReactNode }) {
  return <span style={{ background: bg, color, fontSize: 8, fontWeight: 500, padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>{children}</span>
}

function AfterCard({ on }: { on: boolean }) {
  // a detailed staggered reveal: image → title → copy → price → rating → badges → CTA
  const r = (i: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
    transition: `opacity 0.5s ease ${0.05 + i * 0.1}s, transform 0.65s ${E} ${0.05 + i * 0.1}s`,
  })
  const badges = ["Top rated", "Guided tour", "Family-friendly"]
  return (
    <div className={`relative flex flex-col overflow-hidden bg-white ${poppins.className}`} style={{ width: W, height: H, borderRadius: 5, border: "1px solid #ececec", boxShadow: "0 20px 44px -22px rgba(15,10,31,0.3)" }}>
      {/* bookmark, top-right */}
      <div className="absolute z-20 flex items-center justify-center" style={{ ...r(0.5), right: 14, top: 14, width: 30, height: 30, borderRadius: 999, background: "#fff", border: "1px solid #e3e3e3" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#4a4a4a" aria-hidden><path d="M6 2h12a1 1 0 0 1 1 1v18.5a.5.5 0 0 1-.78.42L12 18.2l-6.22 3.72A.5.5 0 0 1 5 21.5V3a1 1 0 0 1 1-1z" /></svg>
      </div>

      {/* image fills the band */}
      <div className="relative shrink-0 overflow-hidden" style={{ ...r(0), height: 182 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/doha-good.webp" alt="Doha skyline" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", display: "block" }} />
      </div>

      {/* content — even spacing, button pinned bottom */}
      <div className="flex flex-1 flex-col px-5">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p style={{ ...r(1), fontSize: 20, fontWeight: 300, letterSpacing: "0.01em", color: "#34302a" }}>Doha</p>
              <p style={{ ...r(2), fontSize: 8.6, fontWeight: 300, lineHeight: 1.45, color: "#857f75", marginTop: 3 }}>Experience a premium family<br />vacation in the heart of Doha.</p>
            </div>
            <div className="shrink-0 text-right">
              <p style={{ ...r(3), fontSize: 14, fontWeight: 500, color: "#34302a", lineHeight: 1 }}>QAR&nbsp;899<span style={{ fontSize: 8, fontWeight: 400, color: "#9a958c" }}>/day</span></p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full" style={{ ...r(4), background: "#f3efe6", border: "1px solid #e6ddc9", padding: "1.5px 7px" }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#e0a93a"><path d="M12 2l3 6.5 7 .6-5.3 4.6L18.5 21 12 17.3 5.5 21l1.8-7.3L2 9.1l7-.6z" /></svg>
                <span style={{ fontSize: 8, fontWeight: 500, color: "#34302a" }}>4.5</span>
              </span>
            </div>
          </div>

          {/* filled badges — pop in one after another */}
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
            {badges.map((b, i) => (
              <span key={b} className="inline-flex" style={r(5 + i * 0.4)}>
                <Badge bg="#eee9e0" color="#6b6256">{b}</Badge>
              </span>
            ))}
          </div>
        </div>

        {/* View Details button */}
        <div style={{ ...r(6.4), paddingBottom: 22 }}>
          <span className="flex w-full items-center justify-center gap-1.5" style={{ background: "linear-gradient(135deg,#5437d9,#7c5cff)", color: "#fff", fontWeight: 400, fontSize: 11.5, letterSpacing: "0.04em", padding: "11px 0", borderRadius: 5 }}>
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </div>
  )
}

const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// The "Design" step of Idea → product: on its turn the rough "before" card
// holds for 2s, the list of fixes shows for 2s while enhancing, then the
// enhanced "after" design reveals and rests ~5s before the tab auto-advances.
// Driven by `live` (the active Design tab); `replay` re-runs it on tab click.
const FIXES: { en: string; ar: string }[] = [
  { en: "Clear pricing context", ar: "سياق سعري واضح" },
  { en: "Concise copy", ar: "نص مختصر" },
  { en: "Stronger hierarchy", ar: "تسلسل بصري أقوى" },
  { en: "One clear action", ar: "إجراء واحد واضح" },
  { en: "Trust at a glance", ar: "ثقة من النظرة الأولى" },
]

// 0 = before · 1 = fixes (text) · 2 = enhanced (after)
type Phase = 0 | 1 | 2

export function DesignMorph({ live, replay, lang = "en" }: { live: boolean; replay: number; lang?: "en" | "ar" }) {
  const ar = lang === "ar"
  const [phase, setPhase] = useState<Phase>(2) // rest on the enhanced design
  const [fixN, setFixN] = useState(FIXES.length) // how many fixes have been applied
  const timers = useRef<number[]>([])

  useEffect(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    if (!live || prefersReduced()) {
      setPhase(2)
      return
    }
    setPhase(0) // start on the rough "before"
    timers.current.push(
      window.setTimeout(() => setPhase(1), 2000), // 2s on the bad UI → show the fixes text
      window.setTimeout(() => setPhase(2), 4000), // 2s enhancing → reveal the enhanced UI (rests ~5s)
    )
    return () => { timers.current.forEach((id) => window.clearTimeout(id)) }
  }, [live, replay])

  // the fixes tick in one by one while the text is showing
  useEffect(() => {
    if (phase !== 1) {
      setFixN(FIXES.length)
      return
    }
    setFixN(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setFixN(n)
      if (n >= FIXES.length) window.clearInterval(id)
    }, 340)
    return () => window.clearInterval(id)
  }, [phase])

  return (
    <div className="relative origin-center scale-[0.82] sm:scale-100" style={{ width: W, height: H }}>
      {/* before — fades away (no blur) */}
      <div className="absolute inset-0" style={{ opacity: phase === 0 ? 1 : 0, transition: "opacity 0.55s ease" }}><BeforeCard /></div>
      {/* after — the enhanced UI, revealed last */}
      <div className="absolute inset-0" style={{ opacity: phase === 2 ? 1 : 0, transition: "opacity 0.5s ease" }}><AfterCard on={phase === 2} /></div>

      {/* fixes overlay — the things being fixed, on a clean card, ~2s */}
      <div
        dir={ar ? "rtl" : "ltr"}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{ opacity: phase === 1 ? 1 : 0, transition: "opacity 0.4s ease", background: "#fff", borderRadius: 5 }}
      >
        <div className="flex items-center gap-1.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#5437d9" style={{ animation: "spin 1.1s linear infinite" }} aria-hidden><path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9z" /></svg>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.02em", color: "#5437d9" }}>{ar ? "جارٍ التحسين…" : "Enhancing…"}</span>
        </div>
        <div className="space-y-1.5">
          {FIXES.map((f, i) => {
            const done = fixN > i
            return (
              <div key={f.en} className="flex items-center gap-2" style={{ fontSize: 10, opacity: fixN >= i ? 1 : 0.3, transition: "opacity 0.25s ease" }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#12a25e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <span className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-[#5437d9]/25 border-t-[#5437d9]" />
                )}
                <span style={{ fontWeight: 500, color: done ? "#12a25e" : "#5b5470" }}>{ar ? f.ar : f.en}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
