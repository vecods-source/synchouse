"use client"

// A live GPS-tracking story, laid out like the Stripe "embed" mockup: a big MAP
// browser window with a compact tracking CARD collapsed over its left edge. The
// map is a street grid with the track glowing along the roads. Every ~2s one
// x/y coordinate travels the 90° dotted connector from map to card and fades.
// The map canvas is always LTR.

import { useEffect, useState } from "react"
import { t, type Lang } from "@/components/i18n"

// The tracked route, in the map's own 660×400 px space — it follows the street
// grid with rounded turns, like a navigation track. Shared by the drawn route
// and the marker's motion path so the marker tracks it 100%.
const ROUTE = "M120,360 L120,212 Q120,200 132,200 L288,200 Q300,200 300,188 L300,102 Q300,90 312,90 L560,90"

// The connector, in the 840×490 composition space — links the two windows edge
// to edge (never crossing inside either): from the map window's top edge, up and
// over with 90° bends, down onto the card's top edge.
const CURVE = "M560,28 L560,15 Q560,9 554,9 L166,9 Q160,9 160,15 L160,108"

// Live (x, y) coordinates that travel the connector, one at a time.
const COORDS = ["(312, 196)", "(348, 174)", "(401, 132)", "(486, 96)"]

export function TrackingFlow({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions.track
  // fire one coordinate transfer every ~2 seconds
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setTick((n) => n + 1), 2200)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="relative flex min-h-[280px] items-center justify-center overflow-visible sm:min-h-[380px]">
      {/* fixed-size composition, scaled to fit the row on any screen */}
      <div className="origin-center scale-[0.3] sm:scale-[0.58] md:scale-[0.78] lg:scale-100">
        <div className="relative h-[490px] w-[840px]">
          {/* ── MAP window — large, anchored right ── */}
          <div className="absolute right-0 top-7 z-10">
            <Window url={tr.mapUrl} className="w-[660px]">
              <MapCanvas tr={tr} />
            </Window>
          </div>

          {/* ── tracking card — collapsed over the window's left edge ── */}
          <div className="absolute left-0 top-[108px] z-30 w-[250px] rounded-[5px] bg-white p-5 shadow-[0_26px_60px_-30px_rgba(15,10,31,0.22)] ring-1 ring-black/[0.06]">
            <Panel tr={tr} />
          </div>

          {/* ── 90° dotted connector + one coordinate every ~2s ── */}
          <Connector tick={tick} />
        </div>
      </div>
    </div>
  )
}

type Track = {
  mapUrl: string; panelUrl: string; stream: string; live: string; title: string; unit: string
  eta: string; etaVal: string; speed: string; speedVal: string; dist: string; distVal: string
  coords: string; origin: string; dest: string; picked: string; transit: string; arriving: string
}

/* ── Browser chrome — matches the checkout window, plus a maximize button ── */
function Window({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
  return (
    <div dir="ltr" className={`flex shrink-0 flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_30px_70px_-34px_rgba(15,10,31,0.22)] ring-1 ring-black/10 ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#f4f4f6] px-4 py-2.5">
        <div className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
        </div>
        <div className="mx-auto flex w-[52%] min-w-0 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-[5px] text-[10px] font-medium text-neutral-500 ring-1 ring-black/[0.06]">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-500">
            <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-black/[0.04] text-neutral-400">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" /></svg>
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Street map with the track glowing along the roads ── */
function MapCanvas({ tr }: { tr: Track }) {
  return (
    <div className="relative h-[400px] w-[660px] overflow-hidden bg-[#e9edf3]">
      <svg viewBox="0 0 660 400" width="660" height="400" className="absolute inset-0" fill="none">
        {/* city blocks — faint fills between the roads */}
        <g fill="#eef1f6">
          <rect x="14" y="14" width="92" height="62" rx="3" /><rect x="134" y="14" width="152" height="62" rx="3" /><rect x="314" y="14" width="132" height="62" rx="3" /><rect x="474" y="14" width="172" height="62" rx="3" />
          <rect x="14" y="104" width="92" height="82" rx="3" /><rect x="134" y="104" width="152" height="82" rx="3" /><rect x="314" y="104" width="132" height="82" rx="3" /><rect x="474" y="104" width="172" height="82" rx="3" />
          <rect x="14" y="214" width="92" height="82" rx="3" /><rect x="134" y="214" width="152" height="82" rx="3" /><rect x="314" y="214" width="132" height="82" rx="3" /><rect x="474" y="214" width="172" height="82" rx="3" />
          <rect x="14" y="324" width="92" height="62" rx="3" /><rect x="134" y="324" width="152" height="62" rx="3" /><rect x="314" y="324" width="132" height="62" rx="3" /><rect x="474" y="324" width="172" height="62" rx="3" />
        </g>

        {/* streets */}
        <g stroke="#dde3ec" strokeLinecap="round">
          <g strokeWidth="4" stroke="#e4e9f0">
            <path d="M0,150 H660" /><path d="M0,260 H660" /><path d="M210,0 V400" /><path d="M390,0 V400" /><path d="M520,0 V400" />
          </g>
          <g strokeWidth="8">
            <path d="M0,90 H660" /><path d="M0,200 H660" /><path d="M0,310 H660" />
            <path d="M120,0 V400" /><path d="M300,0 V400" /><path d="M460,0 V400" /><path d="M580,0 V400" />
          </g>
          {/* a diagonal avenue */}
          <path d="M-20,18 L680,332" strokeWidth="7" />
        </g>

        {/* the tracked route — a strong purple glow along the streets, flickering */}
        <g data-glow style={{ animation: "glow-flick 2.6s ease-in-out infinite" }}>
          <path d={ROUTE} stroke="#7c5cff" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" opacity="0.26" style={{ filter: "blur(11px)" }} />
          <path d={ROUTE} stroke="#9d86ff" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" style={{ filter: "blur(5px)" }} />
        </g>

        {/* origin */}
        <circle cx="120" cy="360" r="7" fill="#fff" stroke="#7c5cff" strokeWidth="3" />
        <circle cx="120" cy="360" r="2.5" fill="#7c5cff" />

        {/* destination — futuristic focus reticle */}
        <g transform="translate(560,90)" style={{ filter: "drop-shadow(0 0 5px rgba(124,92,255,0.9))" }}>
          <g stroke="#7c5cff" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M-13,-8 V-13 H-8" /><path d="M8,-13 H13 V-8" /><path d="M13,8 V13 H8" /><path d="M-8,13 H-13 V8" />
          </g>
          <circle cx="0" cy="0" r="6.5" fill="none" stroke="#7c5cff" strokeWidth="1.4" opacity="0.65" />
          <path d="M0,-4 L4,0 L0,4 L-4,0 Z" fill="#7c5cff" />
        </g>
      </svg>

      {/* the live vehicle — glides along ROUTE via motion path */}
      <div className="pointer-events-none absolute inset-0">
        <span
          aria-hidden
          data-signal
          className="absolute left-0 top-0 block h-0 w-0 will-change-transform"
          style={{ offsetPath: `path('${ROUTE}')`, offsetRotate: "0deg", animation: "gps-move 8s ease-in-out infinite" }}
        >
          <span data-anim className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c5cff]/25" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
          <span className="absolute left-0 top-0 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#7c5cff] shadow-[0_2px_8px_rgba(124,92,255,0.6)]" />
        </span>
      </div>

      {/* reticle pulse */}
      <span className="pointer-events-none absolute" style={{ left: 560, top: 90 }}>
        <span data-anim className="absolute -left-[15px] -top-[15px] h-[30px] w-[30px] rounded-full border border-[#7c5cff]/40" style={{ animation: "ping-soft 2.2s ease-out infinite" }} />
      </span>

      <span className="absolute left-[522px] top-[44px] rounded-md bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-neutral-600 shadow-sm ring-1 ring-black/[0.05]">{tr.dest}</span>
    </div>
  )
}

/* ── 90° dotted connector; one coordinate travels map → card per tick ── */
function Connector({ tick }: { tick: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40">
      <svg viewBox="0 0 840 490" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none">
        <path
          data-signal
          d={CURVE}
          stroke="#5437d9"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
          style={{ strokeDasharray: "2 5", animation: "dash-flow 0.9s linear infinite" }}
        />
      </svg>

      {/* source node on the map's top edge */}
      <span className="absolute" style={{ left: 560, top: 28 }}>
        <span data-anim className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-[#5437d9]/25" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
        <span className="absolute -left-[4px] -top-[4px] h-2 w-2 rounded-full bg-[#5437d9] ring-2 ring-white" />
      </span>

      {/* one coordinate per tick — travels the curve then fades */}
      <span
        key={tick}
        aria-hidden
        data-signal
        className="absolute left-0 top-0 block h-0 w-0 will-change-transform"
        style={{ offsetPath: `path('${CURVE}')`, offsetRotate: "0deg", animation: "flow-curve 2s linear both" }}
      >
        <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-[15px] bg-white px-1.5 py-[3px] text-[8px] font-bold tabular-nums text-[#0f0a1f] shadow-[0_6px_16px_-6px_rgba(15,10,31,0.5)] ring-1 ring-black/[0.06]">
          <span className="h-1 w-1 rounded-full bg-[#5437d9]" />
          {COORDS[tick % COORDS.length]}
        </span>
      </span>
    </div>
  )
}

/* ── The tracking card content ── */
function Panel({ tr }: { tr: Track }) {
  return (
    <div className="flex flex-col gap-3 text-[#0f0a1f]">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold tracking-tight">{tr.title}</p>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span data-anim className="absolute inset-0 rounded-full bg-emerald-400" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {tr.live}
        </span>
      </div>
      <p className="-mt-2 text-[10px] text-neutral-400">{tr.unit}</p>

      <div className="rounded-[5px] bg-[#f7f6fd] p-3 ring-1 ring-black/[0.04]">
        <p className="text-[9px] font-medium text-neutral-400">{tr.eta}</p>
        <p className="text-[14px] font-bold tracking-tight">{tr.etaVal}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
          <div className="h-full w-[64%] rounded-full bg-[#5437d9]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat label={tr.speed} value={tr.speedVal} />
        <Stat label={tr.dist} value={tr.distVal} />
      </div>

      <div className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[9px] text-neutral-500 ring-1 ring-black/[0.04]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-500"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
        <span className="font-medium tabular-nums">{tr.coords}</span>
      </div>

      <div className="space-y-2">
        <Stop state="done" label={tr.picked} />
        <Stop state="active" label={tr.transit} />
        <Stop state="todo" label={`${tr.dest} · ${tr.arriving}`} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-neutral-50 px-2.5 py-2 ring-1 ring-black/[0.04]">
      <p className="text-[11px] font-bold tracking-tight">{value}</p>
      <p className="text-[8px] font-medium uppercase tracking-wide text-neutral-400">{label}</p>
    </div>
  )
}

function Stop({ state, label }: { state: "done" | "active" | "todo"; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {state === "done" && (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
        </span>
      )}
      {state === "active" && (
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <span data-anim className="absolute h-2.5 w-2.5 rounded-full bg-[#5437d9]/30" style={{ animation: "ping-soft 1.6s ease-out infinite" }} />
          <span className="relative h-2 w-2 rounded-full bg-[#5437d9]" />
        </span>
      )}
      {state === "todo" && <span className="h-3.5 w-3.5 rounded-full border-2 border-neutral-200" />}
      <span className={`text-[10px] ${state === "todo" ? "text-neutral-400" : "font-medium text-[#0f0a1f]"}`}>{label}</span>
    </div>
  )
}
