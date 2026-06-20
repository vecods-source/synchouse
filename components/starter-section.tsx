"use client"

import { useWhatsApp } from "@/components/whatsapp-gate"
import { DotPattern } from "@/components/ui/dot-pattern"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Highlighter } from "@/components/ui/highlighter"
import { BlurText } from "@/components/ui/blur-text"
import { cn } from "@/lib/utils"
import { t, type Lang } from "@/components/i18n"

// Minimal "find your package" section — a dot-pattern backdrop, an animated
// headline, three e-commerce price options, and the platforms we partner with.
const PARTNERS = [{ name: "Shopify", color: "#5E8E3E" }]

type Option = { name: string; price: string; desc: string; tag: string }

export function StarterSection({ lang }: { lang: Lang }) {
  const tr = t[lang].starter
  const { open } = useWhatsApp()

  return (
    <section id="starter" className="sticky top-0 flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 sm:py-32">
      {/* flickering side-grid — continues from the section above */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className="z-0 [mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)] fill-[#5437d9]/20 stroke-[#5437d9]/20"
      />
      <DotPattern className={cn("z-0 [mask-image:radial-gradient(440px_circle_at_center,white,transparent)] fill-[#5437d9]/25")} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#5437d9]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5437d9] ring-1 ring-[#5437d9]/15">
          {tr.startupOnly}
        </span>

        <h2 className="mx-auto mt-5 whitespace-nowrap text-[clamp(1.25rem,5vw,3rem)] font-semibold tracking-tight text-[#0f0a1f]">
          <Highlighter action="highlight" color="#d9ccff" padding={6} animationDuration={700} isView>
            {tr.title}
          </Highlighter>
        </h2>

        <BlurText className="mx-auto mt-4 max-w-xl text-balance text-lg text-neutral-500">{tr.sub}</BlurText>

        {/* price options */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tr.options.map((o) => (
            <OptionCard key={o.name} o={o} onClick={() => open({ title: o.name, brief: `${o.name} — ${o.price}` })} />
          ))}
        </div>

        {/* partners */}
        <p className="mt-12 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">{tr.partnersLabel}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PARTNERS.map((p) => (
            <span key={p.name} className="text-[18px] font-bold tracking-tight sm:text-[20px]" style={{ color: p.color }}>
              {p.name}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => open({ title: tr.cta, brief: tr.ctaBrief })}
          className="mt-10 inline-flex items-center gap-1.5 rounded-[5px] bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          {tr.cta} <span aria-hidden>{lang === "ar" ? "‹" : "›"}</span>
        </button>
      </div>
    </section>
  )
}

function OptionCard({ o, onClick }: { o: Option; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col rounded-[5px] border border-black/[0.07] bg-white p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-[#5437d9]/25"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold tracking-tight text-[#0f0a1f]">{o.name}</p>
        {o.tag && <span className="text-[13px] font-bold tracking-tight" style={{ color: "#5E8E3E" }}>{o.tag}</span>}
      </div>
      <p className="mt-3 text-[22px] font-bold tracking-tight text-[#5437d9]"><bdi>{o.price}</bdi></p>
      <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">{o.desc}</p>
    </button>
  )
}
