"use client"

import { useMemo, type ElementType } from "react"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

type By = "text" | "word" | "character" | "line"
type AnimationVariant = "fadeIn" | "blurIn" | "blurInUp" | "slideUp" | "scaleUp"

interface TextAnimateProps {
  children: string
  className?: string
  segmentClassName?: string
  delay?: number
  duration?: number
  as?: ElementType
  by?: By
  once?: boolean
  startOnView?: boolean
  animation?: AnimationVariant
}

const STAGGER: Record<By, number> = { text: 0.06, word: 0.06, character: 0.025, line: 0.08 }

const ITEM: Record<AnimationVariant, Variants> = {
  fadeIn: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } },
  blurIn: { hidden: { opacity: 0, filter: "blur(10px)" }, show: { opacity: 1, filter: "blur(0px)" } },
  blurInUp: { hidden: { opacity: 0, filter: "blur(10px)", y: 18 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  slideUp: { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } },
  scaleUp: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
}

export function TextAnimate({
  children,
  className,
  segmentClassName,
  delay = 0,
  duration = 0.35,
  as = "div",
  by = "word",
  once = false,
  startOnView = true,
  animation = "fadeIn",
}: TextAnimateProps) {
  const MotionTag = useMemo(() => motion.create(as), [as])

  const segments = useMemo(() => {
    if (by === "text") return [children]
    if (by === "character") return children.split("")
    if (by === "line") return children.split("\n")
    return children.split(/(\s+)/) // word — keeps whitespace tokens
  }, [children, by])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER[by], delayChildren: delay } },
  }
  const item: Variants = {
    hidden: ITEM[animation].hidden,
    show: { ...ITEM[animation].show, transition: { duration } },
  }

  const viewProps = startOnView
    ? ({ whileInView: "show", viewport: { once, margin: "-10%" } } as const)
    : ({ animate: "show" } as const)

  return (
    <MotionTag variants={container} initial="hidden" {...viewProps} className={cn("whitespace-pre-wrap", className)}>
      {segments.map((seg, i) => (
        <motion.span key={`${seg}-${i}`} variants={item} className={cn("inline-block", segmentClassName)}>
          {/\s/.test(seg) ? " " : seg}
        </motion.span>
      ))}
    </MotionTag>
  )
}
