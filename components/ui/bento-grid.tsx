"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { IoCopyOutline } from "react-icons/io5"
import dynamic from "next/dynamic"
import { useTranslations, useLocale } from "next-intl"
import { isRtlLocale, type Locale } from "@/i18n/config"

import { cn } from "@/lib/utils"
import { BackgroundGradientAnimation } from "./background-gradient-animation"
import { MagicButton } from "./magic-button"
import { GridGlobe } from "../grid-globe"

const BentoGridLottie = dynamic(() => import("./bento-grid-lottie"), {
  ssr: false,
})

export function BentoGrid({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-6",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoGridItem({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  id?: number
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  img?: string
  imgClassName?: string
  titleClassName?: string
  spareImg?: string
}) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("bento")
  const locale = useLocale() as Locale
  const isRTL = isRtlLocale(locale)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleCopy = () => {
    navigator.clipboard.writeText("synchouse26@gmail.com")
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return

    const copyTimeout = setTimeout(() => {
      setCopied(false)
    }, 3500)

    return () => clearTimeout(copyTimeout)
  }, [copied])

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-border/30 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.1] dark:shadow-none",
        className
      )}
      style={{
        background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
      }}
    >
      <div className={cn("h-full", id === 6 && "flex justify-center")}>
        <div className="absolute h-full w-full">
          {img && (
            <Image
              width={689}
              height={541}
              src={img}
              alt=""
              loading="lazy"
              className={cn(
                "object-cover object-center",
                imgClassName,
                id === 5 && isRTL && "bottom-[-20%] md:bottom-[-10%]"
              )}
            />
          )}
        </div>

        <div
          className={cn(
            "absolute right-0 -mb-5",
            id === 5 && "w-full opacity-80"
          )}
        >
          {spareImg && (
            <Image
              width={208}
              height={96}
              src={spareImg}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation
            gradientBackgroundStart={isDark ? "rgb(0, 77, 77)" : "rgb(230, 245, 245)"}
            gradientBackgroundEnd={isDark ? "rgb(0, 0, 77)" : "rgb(225, 230, 250)"}
            firstColor={isDark ? "0, 128, 128" : "0, 180, 180"}
            secondColor={isDark ? "0, 100, 100" : "0, 150, 150"}
            thirdColor={isDark ? "0, 0, 128" : "80, 80, 200"}
            fourthColor={isDark ? "0, 77, 77" : "0, 140, 140"}
            fifthColor={isDark ? "0, 50, 100" : "60, 100, 180"}
            pointerColor={isDark ? "0, 128, 128" : "0, 180, 180"}
          />
        )}

        <div
          className={cn(
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10",
            titleClassName
          )}
        >
          <div className="z-10 text-sm font-extralight text-muted-foreground md:text-xs lg:text-base">
            {description}
          </div>

          <div className="z-10 max-w-96 text-lg font-bold text-foreground lg:text-3xl">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 6 && (
            <div className="group relative mt-5">
              <BentoGridLottie copied={copied} />

              <MagicButton
                title={copied ? t("emailCopied") : t("copyEmail")}
                icon={<IoCopyOutline />}
                otherClasses="!bg-card/80 border border-border/50"
                handleClick={handleCopy}
                asChild
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
