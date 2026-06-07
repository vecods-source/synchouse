// The Process section as a simple, clear journey — the idea of how a project
// goes, step by step, plus the guarantees that back it.

type Step = { n: string; title: string; desc: string }

const STEPS: Step[] = [
  { n: "01", title: "We meet", desc: "A call or in-person meeting to get your idea." },
  { n: "02", title: "We discuss", desc: "We dig into what you actually need — and what you don’t." },
  { n: "03", title: "We think deep", desc: "Architecture, scope and a fixed, written plan." },
  { n: "04", title: "We start", desc: "Kickoff, then we ship in clear milestones." },
  { n: "05", title: "Weekly check-ins", desc: "Progress reviews in our office, every week." },
  { n: "06", title: "After launch", desc: "We stay on for support, fixes and new features." },
]

const GUARANTEES = [
  { icon: "clock" as const, label: "Support 9am–9pm, Sun–Thu" },
  { icon: "shield" as const, label: "Critical-issue safety net" },
  { icon: "badge" as const, label: "Delivery guarantee — 10% off per week late" },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #f6f4fd 0%, #efeafb 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
            How we work
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">
            How a project goes
          </h2>
          <p className="mt-4 text-balance text-lg text-neutral-500">
            Simple, in person, and on the record — every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5437d9]/[0.08] font-mono text-[14px] font-semibold text-[#5437d9]">
                {s.n}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-[#0f0a1f]">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-500">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="mt-16 flex flex-wrap gap-3 border-t border-[#5437d9]/10 pt-10">
          {GUARANTEES.map((g) => (
            <span
              key={g.label}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-medium text-[#0f0a1f] ring-1 ring-[#5437d9]/15"
            >
              <Icon name={g.icon} />
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Icon({ name }: { name: "clock" | "shield" | "badge" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#5437d9",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  if (name === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    )
  if (name === "shield")
    return (
      <svg {...common}>
        <path d="M12 2l8 4v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="12" cy="9" r="6" />
      <polyline points="9 9 11 11 15 7" />
      <path d="M9 14l-2 7 5-3 5 3-2-7" />
    </svg>
  )
}
