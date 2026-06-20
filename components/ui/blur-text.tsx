"use client"

import { type ElementType } from "react"
import { TextAnimate } from "@/components/ui/text-animate"

// Shared blur-in-up text reveal (word by word). The single source of truth for
// the "blur" effect used across sections (Contact, Starter, Showcase…).
export function BlurText({
  children,
  className,
  as = "p",
  delay = 0.2,
}: {
  children: string
  className?: string
  as?: ElementType
  delay?: number
}) {
  return (
    <TextAnimate as={as} by="word" animation="blurInUp" delay={delay} once className={className}>
      {children}
    </TextAnimate>
  )
}
