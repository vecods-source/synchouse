"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

function useCountAnimation(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }

    // Check if element is already in view on mount
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      if (isInView) {
        setHasStarted(true)
        return
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { count, ref }
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountAnimation(value, 2000)

  return (
    <div
      ref={ref}
      className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
    >
      <div className="text-3xl font-bold text-accent">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent/20" />
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const stats = [
    { value: 50, suffix: "+", label: t.hero.stats.projects },
    { value: 30, suffix: "+", label: t.hero.stats.clients },
    { value: 5, suffix: "+", label: t.hero.stats.years },
    { value: 100, suffix: "%", label: t.hero.stats.success },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 py-24 md:py-32">
      {/* Decorative dots */}
      <div className="absolute left-10 top-20 h-2 w-2 bg-accent/30 animate-pulse-subtle" />
      <div
        className="absolute left-14 top-24 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute right-20 top-32 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute right-16 top-36 h-2 w-2 bg-foreground/10 animate-pulse-subtle"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-24 right-1/3 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
            {t.hero.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="relative bg-accent text-base font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-xl group"
            >
              {t.hero.startProject}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-foreground/20" />
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              variant="outline"
              className="relative border-2 border-accent text-accent text-base font-semibold hover:bg-accent hover:text-white transition-all duration-200 hover:shadow-lg"
            >
              {t.hero.viewServices}
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent/20" />
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
