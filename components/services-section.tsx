// Minimal dark "What we build" — three services, titles only, creative
// gradient borders that light up on hover. No icons, no descriptions.

const SERVICES = ["Web Apps", "Mobile Apps", "Maintenance Plans"]

export function ServicesSection() {
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
          {SERVICES.map((title) => (
            <div
              key={title}
              className="group rounded-2xl bg-gradient-to-b from-white/15 to-white/[0.04] p-px transition-all duration-300 hover:from-[#5437d9] hover:to-[#5437d9]/20"
            >
              <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-[#0f0a1f] p-7">
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#5437d9]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#5437d9]/30"
                />
                <h3 className="relative text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                  {title}
                </h3>
                <span
                  aria-hidden
                  className="relative mt-3 inline-block text-[#9d86ff] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
