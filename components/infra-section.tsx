import { t, type Lang } from "@/components/i18n"
import { WhatsAppButton } from "@/components/whatsapp-gate"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

// Dark "connects to everything" section with an orchestration diagram: Shara in the
// centre, wired to the systems a business already runs, its integrations, dashboards
// and AI agents. Coordinate space is 1000×600; the container locks that aspect so the
// %-positioned nodes line up with the SVG connectors.
const LOGOS = ["stripe.svg", "openai.svg", "mastercard.svg", "visa.svg", "applewallet.svg", "googlewallet.svg"]

const CONNECTORS = [
  "M300,90 V135",
  "M430,90 V135",
  "M560,90 V135",
  "M690,90 V135",
  "M300,135 H690",
  "M430,135 V178",
  "M600,135 V178",
  "M430,212 V250 H500 V288",
  "M600,212 V250 H500",
  "M195,320 H305",
  "M375,320 H462",
  "M538,320 H665",
  "M735,320 H872",
  "M500,352 V455",
]

// x,y are in the 1000×600 space → converted to % so nodes sit on the SVG lines.
function pos(x: number, y: number) {
  return { left: `${(x / 1000) * 100}%`, top: `${(y / 600) * 100}%` }
}

function Node({
  x,
  y,
  children,
  tone = "ghost",
}: {
  x: number
  y: number
  children: React.ReactNode
  tone?: "ghost" | "purple" | "center"
}) {
  const base = "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md font-normal"
  const tones = {
    ghost: "border border-black/[0.07] bg-white px-3.5 py-1.5 text-xs text-[#0f0a1f] sm:text-sm",
    purple: "border border-transparent bg-[#5437d9] px-3.5 py-1.5 text-xs text-white sm:text-sm",
    center: "rounded-[6px] bg-gradient-to-br from-[#6b4ff0] to-[#4a2fc7] px-5 py-3.5 text-sm font-normal text-white ring-1 ring-white/20 sm:text-base",
  }
  return (
    <div style={pos(x, y)} className={`${base} ${tones[tone]}`}>
      {children}
    </div>
  )
}

export function InfraSection({ lang }: { lang: Lang }) {
  const tr = t[lang].infra

  return (
    <section id="infra" className="relative w-full overflow-hidden bg-white px-4 py-24 sm:py-32">
      {/* animated grid on the sides — continues from the neighbouring sections */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className="z-0 [mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)] fill-[#5437d9]/20 stroke-[#5437d9]/20"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Block 1 — headline + CTAs */}
        <div className="max-w-4xl">
          <h2 className="text-balance text-2xl font-light leading-snug tracking-tight sm:text-[28px]">
            <span className="text-[#0f0a1f]">{tr.title1}</span>
            <span className="text-neutral-400">{tr.title2}</span>
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton className="inline-flex items-center justify-center gap-1.5 rounded-[5px] bg-[#5437d9] px-6 py-3 text-sm font-normal text-white transition-opacity hover:opacity-90">
              {tr.ctaPrimary}
              <span aria-hidden>→</span>
            </WhatsAppButton>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-[5px] border border-black/10 bg-white px-6 py-3 text-sm font-normal text-[#0f0a1f] transition-colors hover:bg-neutral-50"
            >
              {tr.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Diagram — full orchestration map (tablet / desktop only; it relies on
            fixed-coordinate nodes that can't reflow onto a phone) */}
        <div className="relative mx-auto mt-16 hidden aspect-[5/3] w-full max-w-5xl md:block">
          {/* connectors */}
          <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {CONNECTORS.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="rgba(84,55,217,0.4)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="1 7"
              />
            ))}
          </svg>


          {/* top systems */}
          <Node x={300} y={70}>{tr.systems[0]}</Node>
          <Node x={430} y={70}>{tr.systems[1]}</Node>
          <Node x={560} y={70}>{tr.systems[2]}</Node>
          <Node x={690} y={70}>{tr.systems[3]}</Node>

          {/* purple bridge nodes */}
          <Node x={430} y={195} tone="purple">{tr.apis}</Node>
          <Node x={600} y={195} tone="purple">{tr.webhooks}</Node>

          {/* logo cluster (left) */}
          <div style={pos(130, 320)} className="absolute -translate-x-1/2 -translate-y-1/2">
            <div className="grid grid-cols-2 gap-1.5 rounded-[6px] border border-black/[0.07] bg-white p-1.5">
              {LOGOS.map((f) => (
                <span key={f} className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-50 ring-1 ring-black/[0.05] sm:h-10 sm:w-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brands/${f}`} alt="" className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
                </span>
              ))}
            </div>
          </div>

          <Node x={340} y={320}>{tr.integrations}</Node>

          {/* centre — Shara mark, forced to solid white on the purple node */}
          <Node x={500} y={320} tone="center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-dark.png" alt={tr.center} className="h-5 w-auto [filter:brightness(0)_invert(1)] sm:h-6" />
          </Node>

          {/* right — dashboards → dashboard glyph */}
          <Node x={700} y={320} tone="purple">{tr.dashboards}</Node>
          <div style={pos(890, 320)} className="absolute -translate-x-1/2 -translate-y-1/2">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-black/[0.07] sm:h-12 sm:w-12">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#5437d9]" fill="currentColor" aria-hidden>
                <rect x="3" y="3" width="8" height="8" rx="1.5" />
                <rect x="13" y="3" width="8" height="5" rx="1.5" opacity="0.55" />
                <rect x="13" y="10" width="8" height="11" rx="1.5" />
                <rect x="3" y="13" width="8" height="8" rx="1.5" opacity="0.55" />
              </svg>
            </span>
          </div>

          {/* bottom — AI agents */}
          <Node x={500} y={455} tone="purple">{tr.automation}</Node>
        </div>

        {/* Diagram — phone version: the same idea (systems → Shara → capabilities
            → your tools) stacked vertically so every label stays readable */}
        <MobileDiagram tr={tr} />
      </div>
    </section>
  )
}

// A stacked, reflowable version of the orchestration diagram for phones.
function MobileDiagram({ tr }: { tr: (typeof t)[Lang]["infra"] }) {
  return (
    <div className="mt-12 md:hidden">
      <div className="mx-auto max-w-sm rounded-2xl border border-black/[0.07] bg-white p-5">
        {/* systems that feed in */}
        <div className="grid grid-cols-2 gap-2">
          {tr.systems.map((label) => (
            <span
              key={label}
              className="flex items-center justify-center rounded-md border border-black/[0.07] bg-white px-3 py-2 text-center text-xs text-[#0f0a1f]"
            >
              {label}
            </span>
          ))}
        </div>

        <Wire />

        {/* Shara hub */}
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center rounded-[6px] bg-gradient-to-br from-[#6b4ff0] to-[#4a2fc7] px-6 py-3.5 ring-1 ring-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-dark.png" alt={tr.center} className="h-5 w-auto [filter:brightness(0)_invert(1)]" />
          </div>
        </div>

        <Wire />

        {/* capabilities it powers */}
        <div className="grid grid-cols-2 gap-2">
          {[tr.apis, tr.webhooks, tr.dashboards, tr.automation].map((label) => (
            <span
              key={label}
              className="flex items-center justify-center rounded-md bg-[#5437d9] px-3 py-2 text-center text-xs text-white"
            >
              {label}
            </span>
          ))}
        </div>

        {/* the tools it connects to */}
        <div className="mt-5 border-t border-black/[0.06] pt-4">
          <p className="mb-2.5 text-center text-[11px] font-medium text-neutral-400">{tr.integrations}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {LOGOS.map((f) => (
              <span key={f} className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-50 ring-1 ring-black/[0.05]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brands/${f}`} alt="" className="h-5 w-5 object-contain" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// short dotted connector between the stacked rows
function Wire() {
  return <div className="mx-auto my-3 h-5 w-px [background-image:repeating-linear-gradient(to_bottom,rgba(84,55,217,0.45)_0_2px,transparent_2px_8px)]" />
}
