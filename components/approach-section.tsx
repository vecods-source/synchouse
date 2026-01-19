"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useTranslations } from "next-intl"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { cn } from "@/lib/utils"

export function ApproachSection() {
  const t = useTranslations("approach")

  const phases = [
    {
      key: "discovery",
      colors: [[0, 128, 128]], // Teal #008080
      containerClassName: "bg-[#006666]",
    },
    {
      key: "development",
      colors: [
        [0, 128, 128], // Teal
        [0, 0, 128], // Navy
      ],
      containerClassName: "bg-[#001a4d]",
    },
    {
      key: "launch",
      colors: [[0, 0, 128]], // Navy #000080
      containerClassName: "bg-[#000060]",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <div className="mb-4 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t("title1")}{" "}
            <span className="text-accent">{t("title2")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          {phases.map((phase) => (
            <ApproachCard
              key={phase.key}
              phase={t(`phases.${phase.key}.phase`)}
              title={t(`phases.${phase.key}.title`)}
              description={t(`phases.${phase.key}.description`)}
              colors={phase.colors}
              containerClassName={phase.containerClassName}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ApproachCardProps = {
  phase: string
  title: string
  description: string
  colors: number[][]
  containerClassName: string
}

function ApproachCard({
  phase,
  title,
  description,
  colors,
  containerClassName,
}: ApproachCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex w-full max-w-sm items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-lg lg:h-[28rem]"
    >
      <Icon className="absolute -left-2 -top-2 h-5 w-5 text-muted-foreground/50 transition-colors group-hover/canvas-card:text-accent" />
      <Icon className="absolute -bottom-2 -left-2 h-5 w-5 text-muted-foreground/50 transition-colors group-hover/canvas-card:text-accent" />
      <Icon className="absolute -right-2 -top-2 h-5 w-5 text-muted-foreground/50 transition-colors group-hover/canvas-card:text-accent" />
      <Icon className="absolute -bottom-2 -right-2 h-5 w-5 text-muted-foreground/50 transition-colors group-hover/canvas-card:text-accent" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full rounded-xl overflow-hidden"
          >
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName={containerClassName}
              colors={colors}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-4">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 mx-auto flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center transition duration-300",
            "group-hover/canvas-card:-translate-y-6 group-hover/canvas-card:opacity-0"
          )}
        >
          <div className="inline-block border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent rounded-md">
            {phase}
          </div>
        </div>

        <h3
          className={cn(
            "relative z-10 mt-4 text-xl md:text-2xl font-bold text-center opacity-0 transition duration-300",
            "text-foreground group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100"
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            "relative z-10 mt-4 text-sm text-center opacity-0 transition duration-300 leading-relaxed",
            "text-muted-foreground group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white/90 group-hover/canvas-card:opacity-100"
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

function Icon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
