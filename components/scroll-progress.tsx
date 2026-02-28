"use client"

import { useEffect, useRef, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafId = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress((scrolled / scrollHeight) * 100)
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        rafId.current = requestAnimationFrame(updateProgress)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-secondary">
      <div className="h-full bg-accent transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
