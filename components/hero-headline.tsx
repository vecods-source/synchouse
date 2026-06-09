"use client"

import { useEffect, useState } from "react"

const TEXT = "Software that ships"
const ACCENT = TEXT.indexOf("ships")

// Lightweight typewriter: a single setTimeout chain reveals one char at a time,
// with a blinking block caret. No libraries, no per-frame work.
export function HeroHeadline() {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TEXT.length)
      return
    }
    let i = 0
    let t = window.setTimeout(function tick() {
      i += 1
      setN(i)
      if (i < TEXT.length) t = window.setTimeout(tick, 55)
    }, 350)
    return () => clearTimeout(t)
  }, [])

  const typed = TEXT.slice(0, n)
  const head = typed.slice(0, Math.min(n, ACCENT))
  const tail = n > ACCENT ? typed.slice(ACCENT) : ""

  return (
    <h1 className="flex min-h-[1.1em] max-w-3xl items-center justify-center text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
      <span>
        {head}
        <span className="text-[#9d86ff]">{tail}</span>
      </span>
      <span
        aria-hidden
        data-caret
        className="ml-1 inline-block h-[0.82em] w-[0.5ch] translate-y-[0.04em] bg-[#9d86ff]"
        style={{ animation: "caret-blink 1s steps(1) infinite" }}
      />
    </h1>
  )
}
