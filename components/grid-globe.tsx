"use client"

import dynamic from "next/dynamic"
import { Suspense, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-accent/20" />
    </div>
  ),
})

export function GridGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const globeConfig = {
    pointSize: 4,
    globeColor: isDark ? "#001a4d" : "#d4e5f7",
    showAtmosphere: true,
    atmosphereColor: isDark ? "#FFFFFF" : "#38bdf8",
    atmosphereAltitude: isDark ? 0.1 : 0.15,
    emissive: isDark ? "#001a4d" : "#e0ecf5",
    emissiveIntensity: isDark ? 0.1 : 0.4,
    shininess: isDark ? 0.9 : 0.7,
    polygonColor: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,128,128,0.6)",
    ambientLight: isDark ? "#008080" : "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 25.2854, lng: 51.531 }, // Doha, Qatar
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }

  // Teal and navy blue colors for arcs - fixed to prevent re-render issues
  const sampleArcs = [
    // Qatar to Germany (Berlin)
    {
      order: 1,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.3,
      color: isDark ? "#008080" : "#06b6d4",
    },
    // Qatar to UAE
    {
      order: 1,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 25.2048,
      endLng: 55.2708,
      arcAlt: 0.1,
      color: isDark ? "#006666" : "#0891b2",
    },
    // Qatar to Saudi Arabia
    {
      order: 2,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 24.7136,
      endLng: 46.6753,
      arcAlt: 0.1,
      color: isDark ? "#000080" : "#3b82f6",
    },
    // Germany to UK
    {
      order: 2,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 51.5074,
      endLng: -0.1278,
      arcAlt: 0.2,
      color: isDark ? "#008080" : "#06b6d4",
    },
    // Qatar to India
    {
      order: 3,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: isDark ? "#006666" : "#0891b2",
    },
    // Germany to USA
    {
      order: 3,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.4,
      color: isDark ? "#000080" : "#3b82f6",
    },
    // Qatar to Egypt
    {
      order: 4,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 30.0444,
      endLng: 31.2357,
      arcAlt: 0.2,
      color: isDark ? "#008080" : "#06b6d4",
    },
    // Germany to France
    {
      order: 4,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 48.8566,
      endLng: 2.3522,
      arcAlt: 0.1,
      color: isDark ? "#006666" : "#0891b2",
    },
    // Qatar to Kuwait
    {
      order: 5,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 29.3759,
      endLng: 47.9774,
      arcAlt: 0.1,
      color: isDark ? "#000080" : "#3b82f6",
    },
    // USA to Japan
    {
      order: 5,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.5,
      color: isDark ? "#008080" : "#06b6d4",
    },
    // Qatar to Bahrain
    {
      order: 6,
      startLat: 25.2854,
      startLng: 51.531,
      endLat: 26.0667,
      endLng: 50.5577,
      arcAlt: 0.05,
      color: isDark ? "#006666" : "#0891b2",
    },
    // UK to Australia
    {
      order: 6,
      startLat: 51.5074,
      startLng: -0.1278,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.6,
      color: isDark ? "#000080" : "#3b82f6",
    },
  ]

  return (
    <div ref={containerRef} className="absolute -left-5 top-36 flex h-full w-full items-center justify-center md:top-40">
      <div className="relative mx-auto h-96 w-full max-w-7xl overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-card" />
        <div className="absolute z-10 h-72 w-full md:h-full">
          {isVisible && (
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-accent/10" />}>
              <World data={sampleArcs} globeConfig={globeConfig} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
