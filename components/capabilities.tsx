"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { CardGlow } from "@/components/card-glow"
import { DesignMorph } from "@/components/travel-demo"
import { t, type Lang } from "@/components/i18n"

// Three capability cards that animate ONE AT A TIME, in order, then loop:
// terminal types → scalability runs → idea storyboard → back to the terminal.
// A card rests in its finished state until its turn comes round again.
// Pure CSS/JS; freezes to the final state under reduced motion.

const DUR = [4800, 4800] // ms each card "owns" the stage: tests, scale
const isReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function useInView<T extends HTMLElement>(threshold = 0.3) {
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

export function Capabilities({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions.caps
  const [ref, inView] = useInView<HTMLDivElement>()
  const [step, setStep] = useState(0) // whose turn it is to animate

  useEffect(() => {
    if (!inView || isReduced()) return
    const id = window.setTimeout(() => setStep((s) => (s + 1) % 2), DUR[step])
    return () => window.clearTimeout(id)
  }, [inView, step])

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card title={tr.tests.title}>
        <TestVisual active={inView && step === 0} s={tr.tests} />
      </Card>
      <Card title={tr.scale.title}>
        <ScaleVisual active={inView && step === 1} sc={tr.scale} />
      </Card>
    </div>
  )
}

// The "Idea to product" card, standalone (lives in its own row below the others).
export function IdeaCard({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions.caps
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="group relative flex h-full flex-col overflow-hidden rounded-[5px] border border-black/[0.06] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <CardGlow />
      <h3 className="relative z-10 text-xl font-semibold tracking-tight text-[#0f0a1f] sm:text-2xl">{tr.idea.title}</h3>
      <div className="relative z-10 mt-6 flex min-h-[440px] flex-1 flex-col sm:min-h-[520px]">
        <IdeaVisual active={inView} idea={tr.idea} lang={lang} />
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[5px] border border-black/[0.06] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <CardGlow />
      <h3 className="relative z-10 text-xl font-semibold tracking-tight text-[#0f0a1f] sm:text-2xl">{title}</h3>
      <div className="relative z-10 mt-6 flex min-h-[440px] flex-1 flex-col sm:min-h-[520px]">
        {children}
      </div>
    </div>
  )
}

const PANEL = "flex h-full flex-col rounded-[5px] bg-gradient-to-b from-[#f7f6fd] to-white p-4 ring-1 ring-black/[0.04]"

/* ════════════════════════════════════════════════════════════════
   TESTING — a unit-test runner: on its turn the cases tick green one
   by one (the active one spins), then it rests all-passed with the
   coverage. Clean light panel, not a terminal.
   ════════════════════════════════════════════════════════════════ */
type TestStrings = { suite: string; cases: readonly string[]; running: string; ok: string; passed: string; coverage: string }
const TEST_MS = [8, 12, 6, 21, 9, 14, 5, 17] // little per-case run times, for realism

function TestVisual({ active, s }: { active: boolean; s: TestStrings }) {
  const total = s.cases.length
  const [done, setDone] = useState(total) // how many cases have passed; rest = all
  const running = active && !isReduced()

  useEffect(() => {
    if (!running) {
      setDone(total)
      return
    }
    setDone(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setDone(n)
      if (n >= total) window.clearInterval(id)
    }, 440)
    return () => window.clearInterval(id)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const allDone = done >= total

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[5px] bg-white ring-1 ring-black/[0.05]">
      {/* header: the suite file + run/pass status */}
      <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5437d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
          <span className="truncate font-mono text-[12px] font-medium text-[#0f0a1f]">{s.suite}</span>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${allDone ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
          {allDone ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> : <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-300 border-t-amber-500" />}
          {allDone ? s.ok : s.running}
        </span>
      </div>

      {/* the test cases tick green one-by-one */}
      <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
        {s.cases.map((c, i) => {
          const passed = done > i
          const isRunning = running && done === i
          return (
            <div key={c} className={`flex items-center gap-2.5 transition-opacity duration-300 ${passed || isRunning ? "opacity-100" : "opacity-35"}`}>
              {passed ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
              ) : isRunning ? (
                <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#5437d9]/25 border-t-[#5437d9]" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-neutral-200" />
              )}
              <span className="flex-1 truncate text-[12px] text-[#0f0a1f]">{c}</span>
              {passed && <span className="shrink-0 font-mono text-[10px] font-medium text-emerald-600"><bdi>{TEST_MS[i] ?? 9}ms</bdi></span>}
            </div>
          )
        })}
      </div>

      {/* footer: progress + passed count + coverage */}
      <div className="border-t border-black/[0.05] px-4 py-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full rounded-full bg-emerald-500 transition-[width] duration-500 ease-out" style={{ width: `${(done / total) * 100}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-medium">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            {s.passed}
          </span>
          <span className="text-neutral-400">{s.coverage}</span>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   SCALABILITY — a live throughput chart climbs through a traffic
   surge while the capacity ceiling AUTO-SCALES up to keep headroom.
   The line draws on its turn, the ceiling steps up at peak, then it
   rests full, balanced and healthy.
   ════════════════════════════════════════════════════════════════ */
const RATE_FROM = 1840
const RATE_TO = 12480

// Catmull-Rom → cubic bezier: a smooth curve through the data points.
function smooth(pts: readonly (readonly [number, number])[]) {
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d
}

// throughput load (% of a 100 scale): a smooth climb, a surge near the end, settle
const CURVE = [6, 8, 7, 11, 15, 13, 19, 24, 22, 30, 36, 33, 42, 50, 46, 58, 66, 62, 78, 86, 80, 72, 76, 74, 77]
const PTS = CURVE.map((v, i) => [(i / (CURVE.length - 1)) * 100, 50 - (v / 100) * 40 - 4] as const)
const LINE_D = smooth(PTS)
const AREA_D = `${LINE_D} L100 50 L0 50 Z`
const HEAD = PTS[PTS.length - 1] // where the live throughput dot rests

// response time — flat and low (safe), a brief spike aligned with the surge
// (danger) that auto-scaling absorbs, then back to fast (safe).
const LAT = [11, 11, 11, 12, 11, 12, 12, 13, 12, 13, 13, 14, 13, 15, 16, 19, 25, 31, 34, 25, 16, 13, 12, 12, 12]
const LAT_PTS = LAT.map((v, i) => [(i / (LAT.length - 1)) * 100, 50 - (v / 100) * 40 - 4] as const)
const LAT_D = smooth(LAT_PTS)

type ScaleStrings = { users: string; metric: string; tag: string; scaling: string; healthy: string; peak: string; latency: string; ms: string; steady: string; held: string }
type Phase = "ramp" | "hot" | "scaled"

function ScaleVisual({ active, sc }: { active: boolean; sc: ScaleStrings }) {
  const [rate, setRate] = useState(RATE_TO)
  const [phase, setPhase] = useState<Phase>("scaled") // resting state: scaled & healthy

  // replay the ramp → surge → auto-scaled story on its turn
  useEffect(() => {
    if (!active || isReduced()) return
    setPhase("ramp")
    const t1 = window.setTimeout(() => setPhase("hot"), 1700)
    const t2 = window.setTimeout(() => setPhase("scaled"), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [active])

  // request rate climbs on its turn
  useEffect(() => {
    if (!active || isReduced()) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 2400)
      const e = 1 - Math.pow(1 - p, 3)
      setRate(Math.round(RATE_FROM + (RATE_TO - RATE_FROM) * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setRate(RATE_FROM)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  const hot = phase === "hot"
  // response time: low while ramping (safe), spikes at peak (danger), back to fast
  const lat = hot ? 63 : phase === "ramp" ? 49 : 46
  // capacity ceiling sits close while ramping / at peak, then steps UP to restore headroom
  const ceilingTop = phase === "scaled" ? "8%" : "18%"
  // red = danger (load at the ceiling), amber = ramping, green = safe (headroom)
  const status = hot
    ? { text: sc.peak, chip: "bg-red-50 text-red-600", line: "border-red-400/70", dot: "#ef4444" }
    : phase === "ramp"
      ? { text: sc.scaling, chip: "bg-amber-50 text-amber-600", line: "border-amber-400/60", dot: "#f59e0b" }
      : { text: sc.healthy, chip: "bg-emerald-50 text-emerald-600", line: "border-emerald-400/55", dot: "#10b981" }

  const drawing = active && !isReduced()

  return (
    <div className={PANEL}>
      {/* two stats: traffic climbing vs response time held steady */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-neutral-400">{sc.users}</p>
          <p className="text-[22px] font-bold leading-none tracking-tight text-[#0f0a1f] tabular-nums">
            <bdi>{rate.toLocaleString("en-US")}</bdi>
            <span className="ms-1 text-[11px] font-medium text-neutral-400">{sc.metric}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium text-neutral-400">{sc.latency}</p>
          <p className={`text-[22px] font-bold leading-none tracking-tight tabular-nums transition-colors duration-500 ${hot ? "text-red-600" : "text-emerald-600"}`}>
            <bdi>{lat}</bdi>
            <span className="ms-0.5 text-[11px] font-medium text-neutral-400">{sc.ms}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        {/* legend — which line is which */}
        <div className="mb-2 flex items-center gap-3 text-[9px] font-medium text-neutral-400">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#5437d9]" />{sc.metric}</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{sc.latency}</span>
        </div>

        {/* chart: throughput climbs, response time stays flat, ceiling auto-scales */}
        <div dir="ltr" className="relative min-h-[200px] flex-1 overflow-hidden rounded-[5px] bg-white ring-1 ring-black/[0.05]">
          {/* danger (red, top) → safe (green, bottom) zones */}
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,185,129,0.07), transparent 42%, rgba(239,68,68,0.07))" }} />

          {/* capacity ceiling — red at the limit (danger), green with headroom (safe) */}
          <div className="pointer-events-none absolute inset-x-0 z-20 px-3 transition-[top] duration-700 ease-out" style={{ top: ceilingTop }}>
            <div className={`relative border-t border-dashed transition-colors duration-500 ${status.line}`}>
              <span className="absolute -top-2 right-0 rounded bg-[#5437d9]/10 px-1.5 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide text-[#5437d9]">{sc.tag}</span>
            </div>
          </div>

          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="scale-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
              </linearGradient>
              {/* response-time line: green where safe, red over the danger spike */}
              <linearGradient id="lat-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" /><stop offset="60%" stopColor="#10b981" />
                <stop offset="70%" stopColor="#ef4444" /><stop offset="80%" stopColor="#ef4444" />
                <stop offset="90%" stopColor="#10b981" /><stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* the soft glow under the curve — fades in once the lines finish drawing */}
            <path d={AREA_D} fill="url(#scale-fill)" style={{ opacity: drawing ? 0 : 1, animation: drawing ? "scale-fade 0.7s ease-out 2.3s both" : undefined }} />

            {/* both lines reveal together, left → right, perfectly in sync */}
            <g style={{ clipPath: drawing ? "inset(0 100% 0 0)" : "none", animation: drawing ? "chart-wipe 2.3s cubic-bezier(0.33,1,0.68,1) forwards" : undefined }}>
              <path d={LAT_D} fill="none" stroke="url(#lat-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={LINE_D} fill="none" stroke="#5437d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>

          {/* live throughput head dot — green = safe, red = danger */}
          <span
            className="absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500"
            style={{ left: `${HEAD[0]}%`, top: `${(HEAD[1] / 50) * 100}%`, background: status.dot, boxShadow: `0 0 0 4px ${status.dot}26`, opacity: drawing ? 0 : 1, animation: drawing ? "scale-dot 2.3s ease-out forwards" : undefined }}
          />
        </div>
      </div>

      {/* caption — the takeaway: performance is held as traffic grows */}
      <div className="mt-2.5 flex flex-col items-center gap-1">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${status.chip}`}>
          <span data-anim className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor", animation: active ? "ping-soft 1.5s ease-out infinite" : undefined }} />
          {status.text}
        </span>
        <p className="text-center text-[10px] font-medium text-neutral-500">{sc.held}</p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   IDEA → PRODUCT — on its turn the tabs walk Idea → Design → Live,
   then rest on the finished product
   ════════════════════════════════════════════════════════════════ */
type CoStrings = {
  title: string; gate: string; gateBtn: string; express: string; item: string; itemSub: string
  fName: string; fEmail: string; fPhone: string; fAddr: string; fCard: string
  subtotal: string; shipping: string; free: string; total: string; fees: string
  submit: string; pay: string; secure: string; price: string
}
type IdeaStrings = {
  steps: readonly string[]; think: string; req: string; load: string; users: string; loadOk: string; errors: string
  aws: string; before: string; after: string; designOk: string; co: CoStrings
  plan: { ideaLabel: string; ideaText: string; problemLabel: string; problemText: string; solveLabel: string; solveText: string }
}
const LIVE_TAB = 3

// Slow, deliberate pacing: each tab gets enough time for its animation to FINISH
// plus a ~3s rest before auto-advancing. Tabs are also clickable to replay.
// (Idea, Design, Test). Live then rests for the remainder of the card's turn.
const DWELL = [5500, 9000, 4100] // Design: 2s bad UI + 2s enhancing + 5s good UI

function IdeaVisual({ active, idea, lang }: { active: boolean; idea: IdeaStrings; lang: Lang }) {
  const paneDir = lang === "ar" ? "rtl" : "ltr"
  const steps = idea.steps
  const [tab, setTab] = useState(LIVE_TAB) // rest on "Live"
  const [picked, setPicked] = useState(false) // user took manual control → stop auto-advance
  const [run, setRun] = useState(0) // bump to force a replay even on the same tab

  // when the card takes the stage, restart the walk from "Idea"
  useEffect(() => {
    if (!active || isReduced()) {
      setTab(LIVE_TAB)
      return
    }
    setPicked(false)
    setTab(0)
  }, [active])

  // after each tab finishes its (animation + rest) dwell, advance to the next;
  // rests on "Live". Pauses entirely once the user clicks a tab.
  useEffect(() => {
    if (!active || isReduced() || picked || tab >= LIVE_TAB) return
    const id = window.setTimeout(() => setTab((c) => Math.min(c + 1, LIVE_TAB)), DWELL[tab] ?? 1500)
    return () => window.clearTimeout(id)
  }, [active, tab, picked])

  // click a tab to jump to it and replay its animation (takes manual control)
  const pick = (i: number) => {
    setPicked(true)
    setTab(i)
    setRun((r) => r + 1)
  }

  const panes = [
    <IdeaPane key="idea" live={active && tab === 0} replay={run} think={idea.think} plan={idea.plan} />,
    <DesignMorph key="design" live={active && tab === 1} replay={run} lang={lang} />,
    <TestPane key="test" live={active && tab === 2} replay={run} idea={idea} />,
    <LivePane key="live" label={steps[LIVE_TAB]} aws={idea.aws} lang={lang} />,
  ]

  return (
    <div className={PANEL}>
      {/* tabs — click to replay any step; active fades to the brand colour */}
      <div className="flex">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => pick(i)}
            className={`flex-1 cursor-pointer rounded px-2 pb-2 pt-0.5 text-center text-[12px] font-semibold transition-colors duration-300 hover:text-[#5437d9] ${tab === i ? "text-[#5437d9]" : "text-neutral-400"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* content — slides horizontally to the selected tab */}
      <div className="relative mt-3 flex-1 overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.05]">
        <div dir="ltr" className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${tab * 100}%)` }}>
          {panes.map((pane, i) => (
            <div key={i} dir={i === 1 ? "ltr" : paneDir} className="flex h-full w-full shrink-0 items-center justify-center p-4">{pane}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// LOAD TEST — a million simulated users, app holds, zero errors.
// SECURITY — bugs and vulnerabilities get found and squashed one by one (red
// bug → green check), behind a protection shield. Rests "0 left · protected".
function TestPane({ live, replay, idea }: { live: boolean; replay: number; idea: IdeaStrings }) {
  const total = 12
  const [fixed, setFixed] = useState(total)
  useEffect(() => {
    if (!live || isReduced()) {
      setFixed(total)
      return
    }
    setFixed(0)
    let k = 0
    const id = window.setInterval(() => {
      k += 1
      setFixed(k)
      if (k >= total) window.clearInterval(id)
    }, 170)
    return () => window.clearInterval(id)
  }, [live, replay])

  const remaining = total - fixed // errors still open — counts down to 0
  const clean = remaining === 0

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {/* shield: alert (red) while issues remain → protected (green) when clean */}
      <span className={`flex h-10 w-10 items-center justify-center rounded-[5px] transition-colors duration-300 ${clean ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
        {clean ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
        )}
      </span>
      <p className="text-[10px] font-medium text-neutral-400">{idea.load}</p>
      <p className={`text-[22px] font-bold leading-none tracking-tight tabular-nums transition-colors duration-300 ${clean ? "text-emerald-600" : "text-red-600"}`}><bdi>{remaining}</bdi></p>
      <p className="text-[10px] text-neutral-400">{idea.users}</p>

      {/* each issue: red bug → green check as it's fixed */}
      <div className="mt-1 grid grid-cols-6 gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = fixed > i
          return (
            <span key={i} className="flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200" style={{ background: done ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)" }}>
              {done ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 11v8" /><path d="M6 13a6 6 0 0 1 12 0v1a6 6 0 0 1-12 0z" /><path d="M8 6l1.6 1.8M16 6l-1.6 1.8M4.5 12H2.5M21.5 12H19.5M5 17l-2 1.4M19 17l2 1.4" /></svg>
              )}
            </span>
          )
        })}
      </div>

      {/* badge: starts red with the open-issue count, ends green "protected" */}
      {clean ? (
        <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
          {idea.loadOk}
        </span>
      ) : (
        <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
          <span><bdi>{remaining}</bdi> {idea.errors}</span>
        </span>
      )}
    </div>
  )
}

// IDEA → writing the requirements: a BRD + SRS, the brief types itself out,
// the body lines write in, and a quick wireframe sketches alongside.
// IDEA — planning: the idea, the problem it solves, and the solution, written
// out one line at a time (idea → problem → solution).
type Plan = { ideaLabel: string; ideaText: string; problemLabel: string; problemText: string; solveLabel: string; solveText: string }

function IdeaPane({ live, replay, think, plan }: { live: boolean; replay: number; think: string; plan: Plan }) {
  const [step, setStep] = useState(3) // how many rows are written; rest = all
  useEffect(() => {
    if (!live || isReduced()) {
      setStep(3)
      return
    }
    setStep(0)
    let s = 0
    const id = window.setInterval(() => {
      s += 1
      setStep(s)
      if (s >= 3) window.clearInterval(id)
    }, 700)
    return () => window.clearInterval(id)
  }, [live, replay])

  const rows = [
    { label: plan.ideaLabel, text: plan.ideaText, color: "#d97706", bg: "rgba(245,158,11,0.12)", icon: <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2zM9 21h6M10 18h4" /> },
    { label: plan.problemLabel, text: plan.problemText, color: "#dc2626", bg: "rgba(239,68,68,0.1)", icon: <><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></> },
    { label: plan.solveLabel, text: plan.solveText, color: "#059669", bg: "rgba(16,185,129,0.12)", icon: <path d="M5 13l4 4L19 7" /> },
  ]

  return (
    <div className="w-full">
      <p className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-400">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#5437d9]/25 border-t-[#5437d9]" />
        {think}
      </p>

      <div className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-2.5 rounded-lg bg-neutral-50 p-2.5 ring-1 ring-black/[0.04] transition-all duration-500" style={{ opacity: step > i ? 1 : 0, transform: step > i ? "translateY(0)" : "translateY(6px)" }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: r.bg, color: r.color }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
            </span>
            <div className="min-w-0">
              <p className="text-[8.5px] font-bold uppercase tracking-wide" style={{ color: r.color }}>{r.label}</p>
              <p className="text-[11px] leading-snug text-[#0f0a1f]">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// LIVE — a static, minimal architecture diagram (no animation): the app ships
// Local → Deploy → AWS, and the AWS production server serves many connected
// devices (hub/bus).
const STAGE = (lang: Lang) => [
  {
    label: lang === "ar" ? "محلي" : "Local",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M2 20h20M9.5 16l-.4 4M14.5 16l.4 4" />
      </>
    ),
  },
  {
    label: lang === "ar" ? "نشر" : "Deploy",
    icon: (
      <>
        <path d="M7 18a4 4 0 0 1-.9-7.9A5 5 0 0 1 16 8.5a3.5 3.5 0 0 1 1 6.86" />
        <path d="M12 19v-7M9 15l3-3 3 3" />
      </>
    ),
  },
]

const WIRE = "bg-[#5437d9]/25"

function LivePane({ label, aws, lang }: { label: string; aws: string; lang: Lang }) {
  const ar = lang === "ar"
  const connected = ar ? "جهاز متصل" : "devices connected"

  return (
    <div dir="ltr" className="flex w-full flex-col items-center">
      {/* deploy pipeline (vertical) */}
      {STAGE(lang).map((s) => (
        <Fragment key={s.label}>
          <div className="flex items-center gap-2 rounded-[7px] bg-white px-3 py-1.5 ring-1 ring-black/[0.08]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5437d9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {s.icon}
            </svg>
            <span className="text-[11px] font-medium text-[#0f0a1f]">{s.label}</span>
          </div>
          <div className={`h-4 w-px ${WIRE}`} />
        </Fragment>
      ))}

      {/* AWS production server — the hub */}
      <div className="flex items-center gap-2 rounded-[8px] bg-gradient-to-br from-[#6b4ff0] to-[#4a2fc7] px-3.5 py-2 text-white shadow-[0_10px_24px_-14px_rgba(84,55,217,0.6)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" />
        </svg>
        <span className="text-[12px] font-semibold">{ar ? "إنتاج AWS" : "AWS Production"}</span>
        <span className="ms-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {label}
        </span>
      </div>

      {/* drop to the device bus */}
      <div className={`h-4 w-px ${WIRE}`} />

      {/* connected devices (static hub/bus) */}
      <div className="relative w-full">
        <div className={`absolute left-[6%] right-[6%] top-0 h-px ${WIRE}`} />
        <div className="flex items-start justify-between px-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-3.5 w-px ${WIRE}`} />
              <span className="flex h-6 w-[18px] items-center justify-center rounded-[3px] bg-white ring-1 ring-[#5437d9]/20">
                <span className="h-2.5 w-1.5 rounded-[1px] bg-[#5437d9]/30" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* facts */}
      <p className="mt-4 text-[15px] font-bold leading-none tracking-tight tabular-nums text-[#0f0a1f]">
        <bdi>12,480</bdi> <span className="text-[10px] font-medium text-neutral-400">{connected}</span>
      </p>
      <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-500">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5437d9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a4 4 0 0 1-.9-7.9A5 5 0 0 1 16 8.5a3.5 3.5 0 0 1 1 6.86" /></svg>
        {aws}
      </span>
    </div>
  )
}
