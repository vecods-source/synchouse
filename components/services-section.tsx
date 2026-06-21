"use client"

import { useState } from "react"
import Link from "next/link"
import { useWhatsApp } from "@/components/whatsapp-gate"
import { CardGlow } from "@/components/card-glow"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import { t, type Lang } from "@/components/i18n"

// "What we provide" — luxury-minimal cards (icon + title + text, no mockups).
// The grid pattern lives in the section background and only shows on the sides,
// not behind the cards.

// each maintenance package has its own detail page at /maintenance/<slug>
const PLAN_SLUGS = ["basic", "care", "pro"]

export function ServicesSection({ lang }: { lang: Lang }) {
  const tr = t[lang].services
  const care = t[lang].solutions.care
  const plans = care.plans
  const { open } = useWhatsApp()
  const [yearly, setYearly] = useState(false)
  const labels = { from: care.fromLabel, cta: care.ctaLabel, perYear: care.perYear }
  const planBase = lang === "ar" ? "/ar/maintenance" : "/maintenance"

  return (
    <section id="services" className="relative w-full overflow-hidden bg-white px-4 py-28 sm:py-32">
      {/* grid sits behind everything, masked to the left/right edges so it reads
          as side decoration, never behind the cards */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:linear-gradient(to_right,#000,transparent_8%,transparent_92%,#000)] md:[mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)]",
          "inset-0 h-full",
          "fill-[#5437d9]/20 stroke-[#5437d9]/20",
        )}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
          {tr.eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">{tr.title}</h2>
        <p className="mt-4 max-w-xl text-balance text-lg text-neutral-500">{tr.lede}</p>

        {/* row 1 — web + apps, minimal */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ServiceCard lang={lang} title={tr.web.title} desc={tr.web.desc} onClick={() => open({ title: tr.web.title, brief: tr.web.brief })} />
          <ServiceCard lang={lang} title={tr.mobile.title} desc={tr.mobile.desc} onClick={() => open({ title: tr.mobile.title, brief: tr.mobile.brief })} />
        </div>

        {/* row 2 — full-width maintenance packages */}
        <div className="relative mt-5 overflow-hidden rounded-[5px] border border-black/[0.06] bg-white p-6 sm:p-8">
          <CardGlow />
          <div className="relative z-10">
            <h3 className="text-xl font-semibold tracking-tight text-[#0f0a1f]">{tr.care.title}</h3>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-neutral-500">{tr.care.desc}</p>

            {/* monthly / yearly billing switcher — centred focal control with a
                savings bubble pinned to the yearly tab (overlapping its corner) */}
            <div className="mt-10 flex flex-col items-center text-center">
              <div className="relative inline-flex rounded-full bg-neutral-100 p-1.5 ring-1 ring-black/[0.08]">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  aria-pressed={!yearly}
                  className={`rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors sm:px-7 sm:py-2 sm:text-[14px] ${!yearly ? "bg-white text-[#5437d9] shadow-md" : "text-neutral-500 hover:text-neutral-800"}`}
                >
                  {care.billMonthly}
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  aria-pressed={yearly}
                  className={`rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors sm:px-7 sm:py-2 sm:text-[14px] ${yearly ? "bg-[#5437d9] text-white shadow-md" : "text-neutral-500 hover:text-neutral-800"}`}
                >
                  {care.billYearly}
                </button>
                {/* savings bubble — sits inside the switcher and extends past its top-end corner */}
                <span className="pointer-events-none absolute -top-3 end-[-8px] z-10 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-[9px] font-bold uppercase leading-none tracking-wide text-white ring-2 ring-white sm:-top-3.5 sm:end-[-14px] sm:px-3 sm:py-1.5 sm:text-[11px]">
                  <PkgTick className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {care.yearlyNote}
                </span>
              </div>
              <p className="mt-4 inline-flex items-center justify-center gap-1.5 text-balance text-[12px] font-semibold text-emerald-600 sm:text-[13px]">
                <PkgGift className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                {care.freeMonthNote}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {plans.map((p, i) => (
                <PackageCard
                  key={p.name}
                  p={p}
                  gold={i === plans.length - 1}
                  goldLabel={lang === "ar" ? "مميّز" : "Premium"}
                  labels={labels}
                  yearly={yearly}
                  billedYearly={care.billedYearly}
                  href={`${planBase}/${PLAN_SLUGS[i]}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ lang, title, desc, onClick }: { lang: Lang; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-full flex-col overflow-hidden rounded-[5px] border border-black/[0.07] bg-white p-7 text-start transition-all duration-300 hover:-translate-y-1 hover:border-[#5437d9]/25 sm:p-9"
    >
      <CardGlow />
      {/* corner arrow */}
      <span className="absolute end-7 top-7 z-10 text-[15px] text-neutral-300 transition-all duration-300 group-hover:text-[#5437d9] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
        {lang === "ar" ? "↖" : "↗"}
      </span>
      <h3 className="relative z-10 text-2xl font-semibold tracking-tight text-[#0f0a1f]">{title}</h3>
      <p className="relative z-10 mt-3 max-w-sm text-[14px] leading-relaxed text-neutral-500">{desc}</p>
    </button>
  )
}

type Detail = { t: string; k?: "inc" | "new" | "sla" }
type Plan = { name: string; price: string; per: string; priceYear: string; priceYearWas: string; priceYearMonthly: string; tag: string; extra: string; features: readonly string[]; details: readonly Detail[] }
type PkgLabels = { from: string; cta: string; perYear: string }

function PackageCard({ p, gold, goldLabel, labels, yearly, billedYearly, href }: { p: Plan; gold: boolean; goldLabel: string; labels: PkgLabels; yearly: boolean; billedYearly: string; href: string }) {
  const featured = p.tag !== "" && !gold
  const tone = gold
    ? "bg-gradient-to-b from-[#fcf6e6] to-white ring-[#c9a740]/50"
    : featured
      ? "bg-[#5437d9]/[0.06] ring-[#5437d9]/30"
      : "bg-white ring-black/[0.06]"
  const tick = gold ? "bg-[#c9a740]/20 text-[#9a7b1f]" : "bg-emerald-100 text-emerald-600"
  const accentBg = gold ? "bg-[#c9a740]/15 text-[#9a7b1f]" : "bg-[#5437d9]/10 text-[#5437d9]"
  // yearly is shown as a monthly-style price (per-month, billed yearly); the full
  // before/after totals live on the package detail page.
  const price = yearly ? p.priceYearMonthly : p.price
  return (
    <div className={`flex flex-col rounded-[5px] p-5 text-start ring-1 ${tone}`}>
      <div className="flex items-center gap-2">
        <p className="text-[15px] font-bold tracking-tight text-[#0f0a1f]">{p.name}</p>
        {featured && <span className="rounded-full bg-[#5437d9] px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-white">{p.tag}</span>}
        {gold && <span className="rounded-full bg-gradient-to-r from-[#d8b54a] to-[#a87f23] px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-white shadow-[0_2px_8px_-3px_rgba(168,127,35,0.85)]">{goldLabel}</span>}
      </div>

      {/* starts-from price — always per month; yearly just lowers it (billed yearly) */}
      <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-[10.5px] font-medium uppercase tracking-wide text-neutral-400">{labels.from}</span>
        <span className="text-[20px] font-bold tracking-tight text-[#0f0a1f]"><bdi>{price}</bdi></span>
        <span className="text-[12px] font-medium text-neutral-400">{p.per}</span>
      </p>
      {yearly && <p className="mt-0.5 text-[10.5px] font-medium text-emerald-600">{billedYearly}</p>}

      {p.extra && (
        <div className={`mt-3 flex items-start gap-1.5 rounded-[5px] px-2.5 py-2 text-[11px] font-semibold leading-snug ${accentBg}`}>
          <PkgPlus className="mt-px h-3 w-3 shrink-0" />
          <span>{p.extra}</span>
        </div>
      )}

      {/* mobile: just the key differences (full list lives on the detail page) */}
      <ul className={`mt-3.5 mb-5 space-y-2.5 border-t pt-3.5 sm:hidden ${gold ? "border-[#c9a740]/25" : "border-black/[0.06]"}`}>
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[12.5px] font-medium leading-snug text-[#0f0a1f]">
            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tick}`}>
              <PkgTick className="h-2.5 w-2.5" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* sm+: the full feature list with the inherited-bundle chip */}
      <ul className={`mb-5 mt-3.5 hidden space-y-2.5 border-t pt-3.5 sm:block ${gold ? "border-[#c9a740]/25" : "border-black/[0.06]"}`}>
        {p.details.map((d) =>
          d.k === "inc" ? (
            // "Everything in <lower tier>" — the inherited bundle, shown as a chip
            <li key={d.t} className={`flex items-center gap-2 rounded-[5px] px-2.5 py-1.5 text-[12px] font-bold ${accentBg}`}>
              <PkgStack className="h-3.5 w-3.5 shrink-0" />
              <span>{d.t}</span>
            </li>
          ) : (
            <li key={d.t} className="flex items-start gap-2.5 text-[12.5px] font-medium leading-snug text-[#0f0a1f]">
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tick}`}>
                <PkgTick className="h-2.5 w-2.5" />
              </span>
              <span>{d.t}</span>
            </li>
          ),
        )}
      </ul>

      {/* CTA — opens the package's detail page */}
      <Link
        href={href}
        className={`mt-auto inline-flex items-center justify-center gap-1.5 rounded-[5px] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 ${gold ? "bg-gradient-to-r from-[#c9a740] to-[#a87f23]" : "bg-[#5437d9]"}`}
      >
        {labels.cta}
        <span aria-hidden>›</span>
      </Link>
    </div>
  )
}

function PkgStack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function PkgGift({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function PkgTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PkgPlus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
