// Stripe-style flowing silk gradient — large blurred color blobs that drift.
const BLOBS = [
  { c: "#5437d9", animation: "blob-1 16s ease-in-out infinite", top: "-18%", right: "-2%", w: "60%", h: "72%" },
  { c: "#7c5cff", animation: "blob-2 19s ease-in-out infinite", top: "2%", right: "16%", w: "54%", h: "64%" },
  { c: "#6d28d9", animation: "blob-3 22s ease-in-out infinite", top: "20%", right: "-10%", w: "58%", h: "68%" },
  { c: "#9d86ff", animation: "blob-4 15s ease-in-out infinite", top: "-10%", right: "26%", w: "48%", h: "58%" },
  { c: "#8b5cf6", animation: "blob-2 24s ease-in-out infinite", top: "30%", right: "20%", w: "46%", h: "54%" },
]

export function AnimatedGradient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      data-rise
      className={`overflow-hidden ${className}`}
      style={{ animation: "light-rise 1.6s cubic-bezier(0.22, 1, 0.36, 1) both", willChange: "transform, opacity" }}
    >
      {BLOBS.map((b, i) => (
        <span
          key={i}
          data-float
          className="absolute rounded-full will-change-transform"
          style={{ background: b.c, top: b.top, right: b.right, width: b.w, height: b.h, filter: "blur(70px)", animation: b.animation }}
        />
      ))}
    </div>
  )
}
