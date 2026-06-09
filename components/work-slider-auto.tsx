"use client"

import { useEffect, useRef, type PointerEvent as RPointerEvent } from "react"
import { PROJECTS, type WorkProject } from "./work-data"
import { useWhatsApp } from "@/components/whatsapp-gate"

// OPTION A — project cards that glide continuously, but it's a real scroll
// container: pauses on hover or while you hold/touch it, and you can swipe
// (phone) or drag (desktop) to scroll through it manually.
export function WorkSliderAuto() {
  const loop = [...PROJECTS, ...PROJECTS]
  const ref = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const pos = useRef(0) // float accumulator (scrollLeft rounds to int and would stall)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    pos.current = el.scrollLeft
    let raf = 0
    const step = () => {
      const node = ref.current
      if (node) {
        if (!paused.current && !drag.current.active) {
          const half = node.scrollWidth / 2 || 1
          pos.current += 0.7
          if (pos.current >= half) pos.current -= half // seamless loop (list is duplicated)
          node.scrollLeft = pos.current
        } else {
          pos.current = node.scrollLeft // stay in sync while paused / dragging / swiping
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    paused.current = true
    if (e.pointerType === "mouse" && ref.current) {
      drag.current = { active: true, startX: e.clientX, startScroll: ref.current.scrollLeft }
    }
  }
  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !ref.current) return
    ref.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
  }
  const endPress = () => {
    drag.current.active = false
    paused.current = false
  }

  return (
    <section id="work" className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <Header />

      <div className="relative mt-14">
        <div
          ref={ref}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => {
            if (!drag.current.active) paused.current = false
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPress}
          onPointerCancel={endPress}
          className="flex cursor-grab select-none gap-5 overflow-x-auto active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((p, i) => (
            <Card key={`${p.slug}-${i}`} p={p} />
          ))}
        </div>

        {/* edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>

      <Cta />
    </section>
  )
}

function Card({ p }: { p: WorkProject }) {
  return (
    <article className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-[#5437d9]/12 bg-white p-6 sm:w-[340px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo p={p} className="h-7 w-7" />
          <span className="text-[14px] font-semibold text-[#0f0a1f]">{p.name}</span>
        </div>
        <StatusDot status={p.status} />
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5437d9]">
        {p.category}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{p.tagline}</p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {p.features.slice(0, 3).map((f) => (
          <li
            key={f}
            className="rounded-md border border-[#5437d9]/12 bg-[#5437d9]/[0.04] px-2.5 py-1 text-[12px] font-medium text-[#3b2b85]"
          >
            {f}
          </li>
        ))}
      </ul>
    </article>
  )
}

/* ── shared bits, reused by all three options ── */

export function Header() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
        Our work
      </p>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">
        Real projects, start to ship
      </h2>
      <p className="mt-4 max-w-2xl text-balance text-lg text-neutral-500">
        A growing shelf of products we’ve designed, built and shipped.
      </p>
    </div>
  )
}

export function Cta() {
  const { open } = useWhatsApp()
  return (
    <div className="mx-auto mt-16 flex max-w-xl flex-col items-center px-6 text-center">
      <p className="text-balance text-xl font-medium tracking-tight text-[#0f0a1f] sm:text-2xl">
        Want to know more?
      </p>
      <p className="mt-3 text-balance text-base text-neutral-500">
        We’ll walk you through any of these — and what we’d build for you.
      </p>
      <button
        type="button"
        onClick={() => open({ title: "Ask for a meeting", brief: "I’d like a quick call about a project." })}
        className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
      >
        Ask for a meeting <span aria-hidden>›</span>
      </button>
    </div>
  )
}

export function Logo({ p, className = "" }: { p: WorkProject; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/our work/logos/${p.logo}.png`}
      alt={p.name}
      className={`object-contain ${className}`}
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden"
      }}
    />
  )
}

export function StatusDot({ status }: { status: WorkProject["status"] }) {
  return (
    <span
      title={status === "live" ? "Live" : "In development"}
      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
        status === "live"
          ? "bg-[#5437d9] shadow-[0_0_6px_1px_rgba(84,55,217,0.5)]"
          : "border border-neutral-400"
      }`}
    />
  )
}
