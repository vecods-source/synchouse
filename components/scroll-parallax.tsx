"use client"

import { useEffect, useRef, type ReactNode } from "react"

// Drifts its children up and fades them out across the first viewport of scroll
// (used on the pinned hero content). rAF-throttled, respects reduced-motion.
export function ScrollParallax({
  children,
  className = "",
  rise = 80,
}: {
  children: ReactNode
  className?: string
  rise?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
      el.style.transform = `translate3d(0, ${(-p * rise).toFixed(1)}px, 0)`
      el.style.opacity = String(Math.max(0, 1 - p * 1.25))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [rise])

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  )
}
