"use client"

import Link from "next/link"
import { MEETING_HREF, PROJECTS, type WorkProject } from "./work-data"

// OPTION A — a single row of project cards that glides continuously,
// left to right, and pauses when you hover. Smooth, calm, "always moving".
export function WorkSliderAuto() {
  const loop = [...PROJECTS, ...PROJECTS]
  return (
    <section id="work" className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <Header />

      <div className="group relative mt-14">
        <div
          data-marquee
          className="flex w-max gap-5 will-change-transform group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee-x 70s linear infinite" }}
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
  return (
    <div className="mx-auto mt-16 flex max-w-xl flex-col items-center px-6 text-center">
      <p className="text-balance text-xl font-medium tracking-tight text-[#0f0a1f] sm:text-2xl">
        Want to know more?
      </p>
      <p className="mt-3 text-balance text-base text-neutral-500">
        We’ll walk you through any of these — and what we’d build for you.
      </p>
      <Link
        href={MEETING_HREF}
        className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
      >
        Ask for a meeting <span aria-hidden>›</span>
      </Link>
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
