"use client"

import { useEffect, useRef, useState } from "react"

const SOURCES = ["/coding.mp4", "/coding2.mp4", "/coding3.mp4"]

// Plays the coding clips back to back with a 1s crossfade between them (no hard
// loop seam). Two stacked <video> layers swap roles.
export function HeroVideo({ className = "" }: { className?: string }) {
  const a = useRef<HTMLVideoElement>(null)
  const b = useRef<HTMLVideoElement>(null)
  const [showA, setShowA] = useState(true)
  const idx = useRef(0)
  const busy = useRef(false)

  useEffect(() => {
    const va = a.current
    const vb = b.current
    if (!va || !vb) return
    va.src = SOURCES[0]
    vb.src = SOURCES[1 % SOURCES.length]
    va.play().catch(() => {})
    vb.load()
  }, [])

  const onTime = (self: "a" | "b") => () => {
    const isShown = (self === "a") === showA
    if (!isShown || busy.current) return
    const front = self === "a" ? a.current : b.current
    const back = self === "a" ? b.current : a.current
    if (!front || !back || !front.duration) return
    if (front.currentTime < front.duration - 0.9) return

    busy.current = true
    back.currentTime = 0
    back.play().catch(() => {})
    setShowA((s) => !s)
    const nextNext = (idx.current + 2) % SOURCES.length
    window.setTimeout(() => {
      front.pause()
      front.src = SOURCES[nextNext]
      front.load()
      idx.current = (idx.current + 1) % SOURCES.length
      busy.current = false
    }, 1050)
  }

  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <video
        ref={a}
        muted
        playsInline
        autoPlay
        preload="auto"
        onTimeUpdate={onTime("a")}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${showA ? "opacity-100" : "opacity-0"}`}
      />
      <video
        ref={b}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={onTime("b")}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${showA ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  )
}
