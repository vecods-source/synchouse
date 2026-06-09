// The Process section: dark, minimal connected timeline. Four short steps.

type Step = { n: string; title: string; desc: string }

const STEPS: Step[] = [
  { n: "01", title: "Meet", desc: "Call, scope, fixed quote." },
  { n: "02", title: "Build", desc: "Shipped in milestones." },
  { n: "03", title: "Check in", desc: "Weekly, in our office." },
  { n: "04", title: "Support", desc: "We stay on after launch." },
]

const GUARANTEES = ["Support 9am–9pm", "Critical safety net", "10% off per week late"]

export function ProcessSection() {
  return (
    <section id="process" className="relative w-full overflow-hidden bg-[#0f0a1f] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#9d86ff]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9d86ff]" />
          How we work
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          How a project goes
        </h2>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#5437d9]/45 to-transparent sm:block"
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f0a1f] font-mono text-[15px] font-semibold text-[#9d86ff] ring-1 ring-[#5437d9]/45">
                  {s.n}
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-1 text-[13px] text-white/45">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-[13px] text-white/55">
          {GUARANTEES.map((g) => (
            <span key={g} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#9d86ff]" />
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
