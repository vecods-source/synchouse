"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Starter package as a scratch-off card: scratch to reveal the founder perks,
// then "Check your eligibility" opens WhatsApp pre-filled with a short form.

// Placeholder perks — edit to the real starter offer.
const PERKS = [
  "Founder pricing — discounted build",
  "Maintenance plan included",
  "Priority MVP timeline",
  "Flexible milestone payments",
]

const ELIGIBILITY_MSG = `Hi Shara! I'd like to check my eligibility for the Starter Package.

Name:
Company / idea:
Stage (idea / building / launched):
What I want to build:
Rough budget:
Ideal timeline:`

const ELIGIBILITY_HREF = `https://wa.me/97466012332?text=${encodeURIComponent(ELIGIBILITY_MSG)}`

export function StarterSection() {
  return (
    <section id="starter" className="relative w-full overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
          Starter package
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">
          Startup energy, <span className="text-[#5437d9]">startup budget.</span>
        </h2>
        <p className="mt-4 text-balance text-lg text-neutral-500">
          Just getting going? Scratch the card to reveal your founder perks — then see if you qualify.
        </p>

        <ScratchCard />

        <a
          href={ELIGIBILITY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5437d9] px-8 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Check your eligibility <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}

function ScratchCard() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const paintCoating = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    canvas.width = rect.width
    canvas.height = rect.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.globalCompositeOperation = "source-over"
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    g.addColorStop(0, "#5437d9")
    g.addColorStop(1, "#7c5cff")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = "rgba(255,255,255,0.96)"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "600 17px Poppins, system-ui, sans-serif"
    ctx.fillText("Scratch to reveal your founder perks", rect.width / 2, rect.height / 2 - 12)
    ctx.font = "22px system-ui, sans-serif"
    ctx.fillText("🪙  scratch here", rect.width / 2, rect.height / 2 + 18)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true)
      return
    }
    paintCoating()
    const onResize = () => {
      if (!revealed) paintCoating()
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [paintCoating, revealed])

  const checkReveal = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    let total = 0
    // sparse sample of the alpha channel
    for (let i = 3; i < data.length; i += 4 * 40) {
      total++
      if (data[i] === 0) cleared++
    }
    if (total && cleared / total > 0.5) setRevealed(true)
  }

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(clientX - rect.left, clientY - rect.top, 26, 0, Math.PI * 2)
    ctx.fill()
    moves.current += 1
    if (moves.current % 12 === 0) checkReveal()
  }

  return (
    <div ref={wrapRef} className="relative mx-auto mt-12 h-56 w-full max-w-lg overflow-hidden rounded-3xl ring-1 ring-[#5437d9]/15">
      {/* Revealed content beneath the coating */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f5f4fb] px-6 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5437d9]">
          Founder perks unlocked
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {PERKS.map((p) => (
            <li
              key={p}
              className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#3b2b85] ring-1 ring-[#5437d9]/15"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Scratch coating */}
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          drawing.current = true
          scratchAt(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => {
          if (drawing.current) scratchAt(e.clientX, e.clientY)
        }}
        onPointerUp={() => {
          drawing.current = false
          checkReveal()
        }}
        onPointerLeave={() => {
          drawing.current = false
        }}
        className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${
          revealed ? "pointer-events-none opacity-0" : "cursor-pointer opacity-100"
        }`}
      />
    </div>
  )
}
