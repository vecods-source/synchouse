"use client"

import { Fragment, useEffect, useState } from "react"
import { PROJECTS, type WorkProject } from "@/components/work-data"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { t, type Lang } from "@/components/i18n"
import { useWhatsApp } from "@/components/whatsapp-gate"

// The portfolio is intentionally kept under wraps until this date. Instead of the
// real work we show a pixeled skeleton + a live reveal countdown. The real bento
// is preserved below as <WorkBento/> (not rendered).
//
// ▶ RESTORE WHEN REVEALING: in WorkSection, replace the
//   <WorkSkeleton/> + <WorkLock/> block with  <WorkBento lang={lang} />
const REVEAL_AT = new Date("2026-07-20T00:00:00").getTime()

export function WorkSection({ lang }: { lang: Lang }) {
  const tr = t[lang].work

  // tick every second so the countdown stays live
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="work" className="relative w-full overflow-hidden bg-white px-4 py-24 sm:py-32">
      {/* flickering grid, masked to the left/right edges (sides only) */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className="z-0 [mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)] fill-[#5437d9]/20 stroke-[#5437d9]/20"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
            {tr.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">{tr.title}</h2>
          <p className="mt-4 max-w-xl text-balance text-lg text-neutral-500">{tr.lede}</p>
        </div>

        {/* Portfolio under wraps — pixeled skeleton + reveal countdown.
            RESTORE: replace this block with  <WorkBento lang={lang} /> */}
        <div className="relative">
          <WorkSkeleton />
          <WorkLock now={now} lang={lang} />
        </div>
      </div>
    </section>
  )
}

// Pixeled skeleton placeholder shown while the portfolio is hidden — a mosaic of
// small light blocks per tile (pixelated, not blurred), in the same bento shape.
const PIXEL_SHADES = ["#eef0f6", "#e7e9f3", "#f1eefb", "#e4def5", "#edf0f7", "#e9e4f4", "#efeaf9"]

function PixelFill({ cols, rows }: { cols: number; rows: number }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid animate-pulse"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} style={{ background: PIXEL_SHADES[(i * 37) % PIXEL_SHADES.length] }} />
      ))}
    </div>
  )
}

function SkeletonTile({ big = false }: { big?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[5px] border border-black/[0.07] bg-white ${big ? "col-span-2 row-span-2" : ""}`}>
      <PixelFill cols={big ? 14 : 8} rows={big ? 10 : 6} />
    </div>
  )
}

function WorkSkeleton() {
  return (
    <div className="mt-12 grid auto-rows-[10.5rem] grid-cols-2 gap-4 sm:grid-cols-4">
      <SkeletonTile big />
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonTile key={i} />
      ))}
    </div>
  )
}

// Locked overlay over the pixeled skeleton: a padlock, a live countdown to the
// reveal, and a nudge to come see the work in person.
function WorkLock({ now, lang }: { now: number | null; lang: Lang }) {
  const { open } = useWhatsApp()
  const ar = lang === "ar"
  const rem = now === null ? null : Math.max(0, REVEAL_AT - now)
  const parts =
    rem === null
      ? null
      : {
          d: Math.floor(rem / 86400000),
          h: Math.floor((rem % 86400000) / 3600000),
          m: Math.floor((rem % 3600000) / 60000),
          s: Math.floor((rem % 60000) / 1000),
        }
  const units: [number | null, string][] = [
    [parts?.d ?? null, ar ? "يوم" : "days"],
    [parts?.h ?? null, ar ? "ساعة" : "hrs"],
    [parts?.m ?? null, ar ? "دقيقة" : "min"],
    [parts?.s ?? null, ar ? "ثانية" : "sec"],
  ]
  const brief = ar ? "أريد أن أرى أعمالكم" : "I'd like to see your work"
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center rounded-[16px] bg-white/65 px-8 py-7 text-center ring-1 ring-black/[0.05] backdrop-blur-md">
        {/* kicker */}
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5437d9]">
          <span className="h-1 w-1 rounded-full bg-[#5437d9]" />
          {ar ? "تحت الستار" : "Under wraps"}
        </span>

        {/* creative minimal countdown — airy numerals, accent colons, no boxes */}
        <div dir="ltr" className="mt-5 flex items-end justify-center gap-2 sm:gap-3">
          {units.map((u, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="pb-6 text-2xl font-extralight text-[#5437d9]/40 sm:text-3xl">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extralight leading-none tracking-tight tabular-nums text-[#0f0a1f] sm:text-5xl">
                  <bdi>{u[0] === null ? "––" : String(u[0]).padStart(2, "0")}</bdi>
                </span>
                <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">{u[1]}</span>
              </div>
            </Fragment>
          ))}
        </div>

        {/* line + minimal text CTA */}
        <p className="mt-6 text-sm text-neutral-500">
          {ar ? "دراسات الحالة الكاملة — تُكشف قريبًا." : "Full case studies — revealing soon."}
        </p>
        <button
          type="button"
          onClick={() => open({ title: brief, brief })}
          className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5437d9]"
        >
          {ar ? "أو شاهدها على الطبيعة" : "Or see it in person"}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">{ar ? "←" : "→"}</span>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   REAL PORTFOLIO — kept ready to bring back. Not rendered while under wraps.
   To reveal: render <WorkBento lang={lang} /> from WorkSection (see note above).
   ───────────────────────────────────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WorkBento({ lang }: { lang: Lang }) {
  return (
    <>
      {/* Bento mosaic */}
      <div className="mt-12 grid auto-rows-[10.5rem] grid-cols-2 gap-4 sm:grid-cols-4">
        {PROJECTS.map((p, i) => {
          const big = i === 0
          const Wrapper = p.url ? "a" : "div"
          const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {}
          return (
            <Wrapper
              key={p.slug}
              {...linkProps}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[5px] border border-black/[0.07] bg-white p-5 transition-all duration-300 hover:border-[#5437d9]/25 hover:shadow-[0_20px_44px_-24px_rgba(84,55,217,0.55)] ${
                big ? "col-span-2 row-span-2" : ""
              }`}
            >
              {/* animated grid texture, strongest near the logo corner */}
              <AnimatedGridPattern
                numSquares={big ? 24 : 10}
                maxOpacity={0.13}
                duration={3}
                repeatDelay={1}
                width={28}
                height={28}
                className="fill-[#5437d9]/25 stroke-[#5437d9]/20 [mask-image:radial-gradient(130%_120%_at_100%_100%,#000,transparent_72%)]"
              />

              {/* monochrome logo watermark, embossed with a soft shadow */}
              <img
                src={`/our work/logos/${p.logoFile ?? `${p.logo}.png`}`}
                alt=""
                aria-hidden
                className={`pointer-events-none absolute -bottom-5 end-[-1.25rem] object-contain opacity-[0.07] grayscale transition-all duration-500 group-hover:opacity-[0.12] ${big ? "h-56 w-56" : "h-32 w-32"}`}
                style={{ filter: "grayscale(1) drop-shadow(0 10px 16px rgba(15,10,31,0.5))" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />

              {/* soft brand glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[5px] bg-[radial-gradient(120%_90%_at_50%_0%,rgba(84,55,217,0.08),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
                  <Logo p={p} className={big ? "h-7 w-7" : "h-5 w-5"} />
                </span>
                {p.url ? (
                  <span aria-hidden className="text-[15px] text-neutral-300 transition-all duration-300 group-hover:text-[#5437d9] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    {lang === "ar" ? "↖" : "↗"}
                  </span>
                ) : (
                  <Dot live={p.status === "live"} />
                )}
              </div>

              <div className="relative">
                <h3 className={`font-semibold tracking-tight text-[#0f0a1f] ${big ? "text-2xl" : "text-[15px]"}`}>{p.name}</h3>
                {big && <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-neutral-500">{p.tagline[lang]}</p>}
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#5437d9]">{p.category[lang]}</p>
                {big && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <li key={f.en} className="rounded-full bg-[#5437d9]/[0.07] px-2.5 py-1 text-[11px] font-medium text-[#5437d9] ring-1 ring-[#5437d9]/10">
                        {f[lang]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Wrapper>
          )
        })}
      </div>

      <Cta lang={lang} />
    </>
  )
}

function Cta({ lang }: { lang: Lang }) {
  const { open } = useWhatsApp()
  const tr = t[lang].work
  return (
    <div className="mx-auto mt-16 flex max-w-xl flex-col items-center text-center">
      <p className="text-balance text-xl font-medium tracking-tight text-[#0f0a1f] sm:text-2xl">{tr.more}</p>
      <p className="mt-3 text-balance text-base text-neutral-500">{tr.moreLede}</p>
      <button
        type="button"
        onClick={() => open({ title: tr.meeting, brief: tr.meeting })}
        className="mt-7 inline-flex items-center gap-1.5 rounded-[5px] bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
      >
        {tr.meeting} <span aria-hidden>{lang === "ar" ? "‹" : "›"}</span>
      </button>
    </div>
  )
}

function Logo({ p, className = "" }: { p: WorkProject; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/our work/logos/${p.logoFile ?? `${p.logo}.png`}`}
      alt={p.name}
      className={`object-contain ${className}`}
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden"
      }}
    />
  )
}

function Dot({ live }: { live: boolean }) {
  return (
    <span
      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
        live ? "bg-[#5437d9] shadow-[0_0_6px_1px_rgba(84,55,217,0.5)]" : "border border-neutral-400"
      }`}
    />
  )
}
