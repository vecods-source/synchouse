"use client"

import PixelBlast from "@/components/pixel-blast"

// Static, simplified PixelBlast used purely as decoration in the left/right
// gutters of a section. No ripples, no liquid, no animation (speed 0) — one
// frozen frame. Only shown on wide screens where the centered max-w-6xl content
// leaves gutters; pointer-events disabled.
const STATIC_PROPS = {
  variant: "circle" as const,
  pixelSize: 6,
  color: "#B497CF",
  patternScale: 3,
  patternDensity: 1.1,
  enableRipples: false,
  liquid: false,
  noiseAmount: 0,
  speed: 0,
  edgeFade: 0.3,
  transparent: true,
  className: "",
  style: undefined,
}

// Gutter = half of whatever space is left once the 72rem (max-w-6xl) column is centered.
const GUTTER = "max(0px, calc((100vw - 72rem) / 2))"

export function SidePixels() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block">
      <div className="absolute inset-y-0 left-0" style={{ width: GUTTER }}>
        <PixelBlast {...STATIC_PROPS} />
      </div>
      <div className="absolute inset-y-0 right-0" style={{ width: GUTTER }}>
        <PixelBlast {...STATIC_PROPS} />
      </div>
    </div>
  )
}
