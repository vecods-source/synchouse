type Tech = { name: string; file: string }

const TECH: Tech[] = [
  { name: "Next.js", file: "nextjs" },
  { name: "React", file: "react" },
  { name: "Node.js", file: "nodejs" },
  { name: "TypeScript", file: "typescript" },
  { name: "Python", file: "python" },
  { name: "AWS", file: "aws" },
  { name: ".NET", file: "dotnetcore" },
  { name: "Java", file: "java" },
  { name: "Docker", file: "docker" },
  { name: "Kubernetes", file: "kubernetes" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "MongoDB", file: "mongodb" },
  { name: "Tailwind CSS", file: "tailwindcss" },
  { name: "Flutter", file: "flutter" },
  { name: "Firebase", file: "firebase" },
  { name: "GraphQL", file: "graphql" },
  { name: "Redis", file: "redis" },
  { name: "JavaScript", file: "javascript" },
]

// Distribute icons round-robin into 5 columns
const COLS = 5
const columns: Tech[][] = Array.from({ length: COLS }, () => [])
TECH.forEach((t, i) => columns[i % COLS].push(t))

const settings = [
  { dir: "up", dur: 30 },
  { dir: "down", dur: 26 },
  { dir: "up", dur: 34 },
  { dir: "down", dur: 28 },
  { dir: "up", dur: 32 },
] as const

function Tile({ t }: { t: Tech }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_14px_-6px_rgba(15,10,31,0.12)] sm:h-24 sm:w-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/tech/${t.file}.svg`}
        alt={t.name}
        loading="lazy"
        className="h-10 w-10 object-contain sm:h-12 sm:w-12"
      />
    </div>
  )
}

function Column({ items, dir, dur, className = "" }: { items: Tech[]; dir: "up" | "down"; dur: number; className?: string }) {
  const doubled = [...items, ...items]
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        data-marquee
        className="flex flex-col gap-4 will-change-transform sm:gap-5"
        style={{ animation: `marquee-${dir} ${dur}s linear infinite` }}
      >
        {doubled.map((t, i) => (
          <Tile key={`${t.file}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export function TechStackSection() {
  return (
    <section id="stack" className="relative w-full overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
          Our stack
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">
          Built with a modern toolset
        </h2>
        <p className="mt-4 text-balance text-lg text-neutral-500">
          The proven tools we use to ship fast and scale with you.
        </p>
      </div>

      <div
        className="mx-auto mt-16 flex h-[440px] max-w-3xl justify-center gap-4 overflow-hidden sm:h-[520px] sm:gap-5"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
        }}
      >
        {columns.map((items, i) => (
          <Column
            key={i}
            items={items}
            dir={settings[i].dir}
            dur={settings[i].dur}
            className={i >= 3 ? "hidden lg:flex" : i >= 2 ? "hidden sm:flex" : "flex"}
          />
        ))}
      </div>
    </section>
  )
}
