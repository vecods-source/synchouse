"use client"

import { useWhatsApp } from "@/components/whatsapp-gate"
import { CardGlow } from "@/components/card-glow"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import { t, type Lang } from "@/components/i18n"

// "What we provide" — luxury-minimal cards (icon + title + text, no mockups).
// The grid pattern lives in the section background and only shows on the sides,
// not behind the cards.

export function ServicesSection({ lang }: { lang: Lang }) {
  const tr = t[lang].services
  const plans = t[lang].solutions.care.plans
  const { open } = useWhatsApp()

  return (
    <section id="services" className="relative w-full overflow-hidden bg-white px-4 py-24 sm:py-32">
      {/* grid sits behind everything, masked to the left/right edges so it reads
          as side decoration, never behind the cards */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)]",
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
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {plans.map((p, i) => (
                <PackageCard
                  key={p.name}
                  p={p}
                  gold={i === plans.length - 1}
                  goldLabel={lang === "ar" ? "مميّز" : "Premium"}
                  onClick={() => open({ title: `${tr.care.title} · ${p.name}`, brief: tr.care.brief })}
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

function PackageCard({ p, gold, goldLabel, onClick }: { p: { name: string; tag: string; extra: string; features: readonly string[] }; gold: boolean; goldLabel: string; onClick: () => void }) {
  const featured = p.tag !== "" && !gold
  const tone = gold
    ? "bg-gradient-to-b from-[#fcf6e6] to-white ring-[#c9a740]/50"
    : featured
      ? "bg-[#5437d9]/[0.06] ring-[#5437d9]/30"
      : "bg-white ring-black/[0.06]"
  const tick = gold ? "bg-[#c9a740]/20 text-[#9a7b1f]" : "bg-emerald-100 text-emerald-600"
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col rounded-[5px] p-5 text-start ring-1 transition-transform duration-300 hover:-translate-y-0.5 ${tone}`}
    >
      <div className="flex items-center gap-2">
        <p className="text-[15px] font-bold tracking-tight text-[#0f0a1f]">{p.name}</p>
        {featured && <span className="rounded-full bg-[#5437d9] px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-white">{p.tag}</span>}
        {gold && <span className="rounded-full bg-gradient-to-r from-[#d8b54a] to-[#a87f23] px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-wide text-white shadow-[0_2px_8px_-3px_rgba(168,127,35,0.85)]">{goldLabel}</span>}
      </div>
      {p.extra && (
        <div className="mt-3 flex items-start gap-1.5 rounded-[5px] bg-[#5437d9]/10 px-2.5 py-2 text-[11px] font-semibold leading-snug text-[#5437d9]">
          <PkgPlus className="mt-px h-3 w-3 shrink-0" />
          <span>{p.extra}</span>
        </div>
      )}
      <ul className={`mt-3.5 space-y-2.5 border-t pt-3.5 ${gold ? "border-[#c9a740]/25" : "border-black/[0.06]"}`}>
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[12.5px] font-medium leading-snug text-[#0f0a1f]">
            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tick}`}>
              <PkgTick className="h-2.5 w-2.5" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </button>
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
