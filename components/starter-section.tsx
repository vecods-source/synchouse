"use client"

import { useEffect, useState } from "react"
import { useWhatsApp } from "@/components/whatsapp-gate"

// Starter package as a memory-match game. Match all pairs to unlock a short
// special code; winning pops in a coupon ticket. Game and ticket share one
// fixed-size container so the swap never causes layout flicker.

type IconName = "rocket" | "bulb" | "bolt" | "target" | "lock" | "trophy"

const SYMBOLS: IconName[] = ["rocket", "bulb", "bolt", "target"]

// Placeholder perks — edit to the real starter offer.
const PERKS = ["Founder pricing", "Maintenance included", "Priority MVP", "Flexible payments"]

const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2]

const CONFETTI = [
  { l: "5%", d: "0s", c: "#9d86ff", r: "-20deg" },
  { l: "14%", d: "0.08s", c: "#ffffff", r: "12deg" },
  { l: "23%", d: "0.16s", c: "#c9bdf5", r: "40deg" },
  { l: "32%", d: "0.04s", c: "#ffffff", r: "-32deg" },
  { l: "41%", d: "0.2s", c: "#9d86ff", r: "8deg" },
  { l: "50%", d: "0.1s", c: "#ffffff", r: "28deg" },
  { l: "59%", d: "0.24s", c: "#c9bdf5", r: "-12deg" },
  { l: "68%", d: "0.06s", c: "#ffffff", r: "36deg" },
  { l: "77%", d: "0.18s", c: "#9d86ff", r: "-28deg" },
  { l: "86%", d: "0.12s", c: "#ffffff", r: "16deg" },
  { l: "94%", d: "0.22s", c: "#c9bdf5", r: "-8deg" },
]

type Card = { v: IconName; key: number }

function makeDeck(): Card[] {
  const base = SYMBOLS.flatMap((v) => [v, v])
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[base[i], base[j]] = [base[j], base[i]]
  }
  return base.map((v, key) => ({ v, key }))
}

function makeCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
  let s = ""
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return `FND-${s}`
}

export function StarterSection() {
  const [deck, setDeck] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)
  const [won, setWon] = useState(false)
  const [code, setCode] = useState("")

  useEffect(() => {
    setDeck(makeDeck())
  }, [])

  useEffect(() => {
    if (deck.length && matched.size === deck.length && !won) {
      setWon(true)
      setCode(makeCode())
    }
  }, [matched, deck, won])

  const flip = (i: number) => {
    if (lock || flipped.includes(i) || matched.has(i)) return
    const next = [...flipped, i]
    setFlipped(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      if (deck[a].v === deck[b].v) {
        setMatched((prev) => new Set(prev).add(a).add(b))
        setFlipped([])
      } else {
        setLock(true)
        setTimeout(() => {
          setFlipped([])
          setLock(false)
        }, 750)
      }
    }
  }

  const restart = () => {
    setDeck(makeDeck())
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setLock(false)
    setWon(false)
    setCode("")
  }

  const cells = deck.length ? deck : Array.from({ length: 8 }, () => null)

  return (
    <section id="starter" className="relative w-full overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
          Starter package
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">
          Startup energy, <span className="text-[#5437d9]">startup budget.</span>
        </h2>
        <p className="mt-4 text-balance text-lg text-neutral-500">
          We keep a few founder spots open. Win the match game to unlock your code — and your shot at one.
        </p>

        {/* Fixed-size stage: game and coupon share these dimensions → no flicker */}
        <div className="relative mx-auto mt-12 flex min-h-[480px] w-full items-center justify-center">
          {!won ? (
            <div className="w-full max-w-md rounded-3xl bg-[#0f0a1f] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#9d86ff]">Match the pairs</p>
                <p className="font-mono text-[12px] text-white/45">moves {moves}</p>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {cells.map((card, i) => {
                  const open = card !== null && (flipped.includes(i) || matched.has(i))
                  const isMatched = matched.has(i)
                  return (
                    <button
                      key={card ? card.key : i}
                      type="button"
                      disabled={card === null}
                      onClick={() => flip(i)}
                      aria-label={open ? card!.v : "Hidden card"}
                      className={`flex aspect-square items-center justify-center rounded-xl transition-all duration-200 ${
                        open
                          ? isMatched
                            ? "bg-[#5437d9]/25 ring-1 ring-[#5437d9]"
                            : "bg-white"
                          : "bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.1]"
                      }`}
                    >
                      {open ? (
                        <Icon name={card!.v} className={`h-7 w-7 ${isMatched ? "text-white" : "text-[#5437d9]"}`} />
                      ) : (
                        <Icon name="lock" className="h-5 w-5 text-white/25" />
                      )}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={restart}
                className="mt-6 text-[13px] text-white/40 underline-offset-2 transition-colors hover:text-white/70 hover:underline"
              >
                Shuffle / restart
              </button>
            </div>
          ) : (
            <Reward code={code} onReplay={restart} />
          )}
        </div>
      </div>
    </section>
  )
}

function Reward({ code, onReplay }: { code: string; onReplay: () => void }) {
  const { open } = useWhatsApp()
  return (
    <div data-pop className="relative w-full text-left" style={{ animation: "pop-in 0.45s ease-out both" }}>
      {/* confetti */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-2 z-20 h-48 overflow-hidden">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 h-2.5 w-2.5 rounded-[1px]"
            style={{ left: c.l, background: c.c, transform: `rotate(${c.r})`, animation: `confetti-fall 1.4s ease-in ${c.d} forwards` }}
          />
        ))}
      </div>

      {/* the coupon */}
      <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-[#5437d9] to-[#3a2299] sm:flex-row">
        {/* "cut here" dashed border */}
        <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[18px] border border-dashed border-white/25" />

        {/* MAIN — the offer */}
        <div className="relative flex-1 px-8 py-12 text-center sm:px-12 sm:py-14 sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
            <Icon name="trophy" className="h-3.5 w-3.5" /> You won
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-[42px]">
            Founder Starter Package
          </h2>
          <p className="mt-3 max-w-md text-balance text-[15px] text-white/75 sm:text-base">
            Your shot at a head start — built lean, shipped fast.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            {PERKS.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3.5 py-1.5 text-[13px] font-medium text-white">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] text-white/45">Early-stage founders only · redeem with your code</p>
        </div>

        {/* STUB — the tear-off */}
        <div className="relative flex w-full flex-col items-center justify-center gap-4 border-t-2 border-dashed border-white/35 px-8 py-10 sm:w-72 sm:border-l-2 sm:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">Founder code</span>
          <div className="font-mono text-[30px] font-bold tracking-[0.18em] text-white">{code}</div>
          <div aria-hidden className="flex h-9 items-stretch gap-[2px]">
            {BARS.map((w, i) => (
              <span key={i} className="bg-white/80" style={{ width: `${w}px` }} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => open({ title: "Claim your founder spot", brief: `Founder Starter Package — my code is ${code}` })}
            className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#5437d9] transition-transform hover:scale-[1.02]"
          >
            Redeem <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="text-[12px] text-white/50 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            Play again
          </button>
        </div>
      </div>

      {/* punch holes on the perforation (desktop) */}
      <span aria-hidden className="absolute right-[288px] top-[-13px] hidden h-6 w-6 translate-x-1/2 rounded-full bg-white sm:block" />
      <span aria-hidden className="absolute right-[288px] bottom-[-13px] hidden h-6 w-6 translate-x-1/2 rounded-full bg-white sm:block" />
    </div>
  )
}

function Icon({ name, className }: { name: IconName; className?: string }) {
  const c = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (name) {
    case "rocket":
      return (
        <svg {...c}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      )
    case "bulb":
      return (
        <svg {...c}>
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      )
    case "bolt":
      return (
        <svg {...c}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    case "target":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      )
    case "trophy":
      return (
        <svg {...c}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      )
    default:
      return (
        <svg {...c}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
  }
}
