"use client"

import { useEffect, useRef, useState } from "react"
import { CardGlow } from "@/components/card-glow"
import { t, type Lang } from "@/components/i18n"

// CUSTOM SOLUTION — a "tailored builder": modules toggle ON one by one, as if
// we're assembling the product around YOUR business. A dashed "+ your idea"
// slot stays open (anything can be added), and a fit bar fills as it's built.
// Pure CSS/JS; freezes fully assembled under reduced motion.

const isReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

// one icon per module, paired with the localized labels by index
const MODULE_ICONS = [
  // Bookings — calendar
  "M8 2v3M16 2v3M3.5 9h17M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  // Payments — card
  "M2 8h20M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM6 15h4",
  // Inventory — box
  "M21 8 12 3 3 8l9 5 9-5ZM3 8v8l9 5 9-5V8",
  // Customers — users
  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  // Reports — bar chart
  "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3",
]

export function CustomCard({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions.custom
  const [ref, inView] = useInView<HTMLDivElement>()
  const total = tr.modules.length
  const [on, setOn] = useState<number>(total) // how many modules are switched on; rest = all

  useEffect(() => {
    if (!inView || isReduced()) {
      setOn(total)
      return
    }
    setOn(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setOn(n)
      if (n >= total) window.clearInterval(id)
    }, 480)
    return () => window.clearInterval(id)
  }, [inView, total])

  return (
    <div ref={ref} className="group relative flex h-full flex-col overflow-hidden rounded-[5px] border border-black/[0.06] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <CardGlow />
      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[5px] bg-[#5437d9]/10 text-[#5437d9]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h7V3M14 3v7h7M21 14h-7v7M10 21v-7H3" /></svg>
      </span>
      <h3 className="relative z-10 mt-5 text-xl font-semibold tracking-tight text-[#0f0a1f] sm:text-2xl">{tr.title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-neutral-500">{tr.desc}</p>

      {/* the tailored builder mockup */}
      <div className="relative z-10 mt-6 rounded-[5px] bg-gradient-to-b from-[#f7f6fd] to-white p-4 ring-1 ring-black/[0.04]">
        {/* header — what we're building + a "made to measure" stamp */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-[#0f0a1f]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5437d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M3 7h7V3M14 3v7h7M21 14h-7v7M10 21v-7H3" /></svg>
            {tr.build}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5437d9]/10 px-2 py-0.5 text-[10px] font-bold text-[#5437d9]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3 3 18l3 3L17.7 9.3M14.7 6.3l2.6-2.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8l-2.6 2.6M14.7 6.3 17.7 9.3M8 11l1.5 1.5M11 8l1.5 1.5" /></svg>
            {tr.tag}
          </span>
        </div>

        {/* modules switch on one by one — you turn on exactly what your business needs */}
        <div className="mt-4 space-y-2">
          {tr.modules.map((label, i) => {
            const active = on > i
            return (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2 ring-1 transition-all duration-500"
                style={{
                  opacity: active ? 1 : 0.45,
                  transform: active ? "translateY(0)" : "translateY(4px)",
                  boxShadow: active ? "0 1px 0 rgba(84,55,217,0.04)" : "none",
                  // ring tints to brand purple once the module is on
                  ["--tw-ring-color" as string]: active ? "rgba(84,55,217,0.22)" : "rgba(0,0,0,0.05)",
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-300"
                  style={{ background: active ? "rgba(84,55,217,0.1)" : "rgba(0,0,0,0.04)", color: active ? "#5437d9" : "#9ca3af" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={MODULE_ICONS[i]} /></svg>
                </span>
                <span className={`flex-1 text-[12.5px] font-medium transition-colors duration-300 ${active ? "text-[#0f0a1f]" : "text-neutral-400"}`}>{label}</span>
                {/* a toggle that flips on — "picked for you" */}
                <span className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-300 ${active ? "bg-[#5437d9]" : "bg-neutral-200"}`}>
                  <span
                    className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all duration-300"
                    style={{ insetInlineStart: active ? "0.875rem" : "0.125rem" }}
                  />
                </span>
              </div>
            )
          })}

          {/* the open slot — anything custom can still be added */}
          <div className="flex items-center gap-2.5 rounded-lg border border-dashed border-[#5437d9]/35 px-3 py-2 text-[#5437d9]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#5437d9]/[0.07]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
            <span className="flex-1 text-[12.5px] font-semibold">{tr.add}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#5437d9]" style={{ animation: inView && !isReduced() ? "ping-soft 1.6s ease-out infinite" : undefined }} />
          </div>
        </div>

        {/* fit bar — grows as the build is tailored to your workflow */}
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-[#5437d9] transition-[width] duration-500 ease-out" style={{ width: `${(on / total) * 100}%` }} />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-neutral-500">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5437d9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            {tr.fit}
          </p>
        </div>
      </div>

      <a href="#contact" className="relative z-10 mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#5437d9]">
        {tr.cta}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
    </div>
  )
}
