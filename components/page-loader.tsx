"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 150)

    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* Pixel-style hourglass animation */}
        <div className="relative">
          <div className="pixel-hourglass">
            <div className="hourglass-top" />
            <div className="hourglass-middle" />
            <div className="hourglass-bottom" style={{ height: `${progress}%` }} />
          </div>
          {/* Falling pixels */}
          <div className="falling-pixels">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="pixel"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  left: `${20 + i * 15}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-lg font-semibold tracking-wider">SYNCHOUSE</div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="font-mono text-sm text-muted-foreground">{progress}%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pixel-hourglass {
          position: relative;
          width: 60px;
          height: 80px;
          border: 3px solid currentColor;
          border-radius: 2px;
          clip-path: polygon(
            0% 0%,
            100% 0%,
            100% 35%,
            50% 50%,
            100% 65%,
            100% 100%,
            0% 100%,
            0% 65%,
            50% 50%,
            0% 35%
          );
        }

        .hourglass-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: currentColor;
          animation: drain-top 2s ease-in-out infinite;
        }

        .hourglass-middle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 4px;
          height: 4px;
          background: currentColor;
        }

        .hourglass-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: currentColor;
          animation: fill-bottom 2s ease-in-out infinite;
          transition: height 0.3s ease;
        }

        .falling-pixels {
          position: absolute;
          top: 30px;
          left: 0;
          right: 0;
          height: 20px;
        }

        .pixel {
          position: absolute;
          width: 3px;
          height: 3px;
          background: currentColor;
          animation: fall 1s ease-in infinite;
        }

        @keyframes drain-top {
          0% {
            height: 35%;
          }
          50% {
            height: 5%;
          }
          100% {
            height: 35%;
          }
        }

        @keyframes fill-bottom {
          0% {
            height: 5%;
          }
          50% {
            height: 35%;
          }
          100% {
            height: 5%;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
