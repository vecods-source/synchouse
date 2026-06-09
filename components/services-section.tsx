"use client"

import { useWhatsApp } from "@/components/whatsapp-gate"

// Minimal dark "What we build" — three services, titles only, creative
// gradient borders that light up on hover. No icons, no descriptions.

// `img` maps to /public/services/<img>.png (3D object, rendered on #0f0a1f).
// `brief` pre-fills the WhatsApp gate when the card is clicked.
const SERVICES = [
  { title: "Web Apps", img: "web", brief: "I’d like to build a web app." },
  { title: "Mobile Apps", img: "mobile", brief: "I’d like to build a mobile app." },
  { title: "Maintenance Plans", img: "maintenance", brief: "I’d like to know about your maintenance plans." },
]

// Decorative object layer: top-right, low opacity, faded toward the title.
const OBJECT_MASK = "radial-gradient(115% 115% at 100% 0%, #000 26%, transparent 68%)"

export function ServicesSection() {
  const { open } = useWhatsApp()
  return (
    <section id="services" className="relative w-full overflow-hidden bg-[#0f0a1f] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#9d86ff]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9d86ff]" />
          Services
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          What we build
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <button
              key={s.title}
              type="button"
              onClick={() => open({ title: s.title, brief: s.brief })}
              className="group block w-full rounded-2xl bg-gradient-to-b from-white/15 to-white/[0.04] p-px text-left transition-all duration-300 hover:from-[#5437d9] hover:to-[#5437d9]/20"
            >
              <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-[#0f0a1f] p-7">
                {/* 3D object (appears once /public/services/<img>.png exists) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-45"
                  style={{
                    backgroundImage: `url('/services/${s.img}.png')`,
                    backgroundSize: "72%",
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    WebkitMaskImage: OBJECT_MASK,
                    maskImage: OBJECT_MASK,
                  }}
                />
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#5437d9]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#5437d9]/30"
                />
                <h3 className="relative text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                  {s.title}
                </h3>
                <span
                  aria-hidden
                  className="relative mt-3 inline-block text-[#9d86ff] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
