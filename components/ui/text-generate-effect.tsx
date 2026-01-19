"use client"

import { motion, stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"

import { cn } from "@/lib/utils"

export function TextGenerateEffect({
  words,
  className,
  highlightIndex = 3,
}: {
  words: string
  className?: string
  highlightIndex?: number
}) {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(" ")

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    )
  }, [animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "text-foreground opacity-0",
                idx > highlightIndex && "text-accent"
              )}
            >
              {word}{" "}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
