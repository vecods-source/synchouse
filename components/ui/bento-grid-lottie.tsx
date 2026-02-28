"use client"

import { useEffect, useState } from "react"
import Lottie from "react-lottie"

interface BentoGridLottieProps {
  copied: boolean
}

export default function BentoGridLottie({ copied }: BentoGridLottieProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    if (copied && !animationData) {
      import("@/data/confetti.json").then((mod) => {
        setAnimationData(mod.default)
      })
    }
  }, [copied, animationData])

  return (
    <button
      tabIndex={-1}
      className="pointer-events-none absolute -bottom-5 right-0 cursor-default"
    >
      {animationData && (
        <Lottie
          options={{
            loop: copied,
            autoplay: copied,
            animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
        />
      )}
    </button>
  )
}
