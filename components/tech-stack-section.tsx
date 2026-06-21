import { t, type Lang } from "@/components/i18n"

// The stack. Files live in /public/tech/*.svg
const TECH = [
  { name: "Next.js", file: "nextjs" },
  { name: "React", file: "react" },
  { name: "TypeScript", file: "typescript" },
  { name: "Node.js", file: "nodejs" },
  { name: "Python", file: "python" },
  { name: "Flutter", file: "flutter" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "MongoDB", file: "mongodb" },
  { name: "AWS", file: "aws" },
  { name: "Docker", file: "docker" },
  { name: "Firebase", file: "firebase" },
  { name: "Tailwind", file: "tailwindcss" },
]

// Server component — no JS interval, no re-renders. A signal glows across the
// tiles via a pure-CSS, compositor-only opacity sweep (staggered delay). The
// browser runs it off the main thread and pauses it when the grid is off-screen.
export function TechStackSection({ lang }: { lang: Lang }) {
  const tr = t[lang].stack

  return (
    <section id="stack" className="relative w-full overflow-hidden bg-white px-4 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#5437d9]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
            {tr.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[#0f0a1f] sm:text-5xl">{tr.title}</h2>
          <p className="mt-4 max-w-xl text-balance text-lg text-neutral-500">{tr.lede}</p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-3 sm:mt-16 sm:grid-cols-6 sm:gap-4">
          {TECH.map((tech, i) => (
            <div
              key={tech.file}
              className="group relative flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[5px] border border-black/[0.06] bg-white transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-[#5437d9]/25 hover:shadow-[0_14px_34px_-16px_rgba(84,55,217,0.5)]"
            >
              {/* the travelling signal — a soft brand glow that sweeps across the
                  grid. Pure CSS, animates only opacity (no layout, no paint). */}
              <span
                aria-hidden
                data-signal
                className="pointer-events-none absolute inset-0 rounded-[5px] bg-[radial-gradient(120%_120%_at_50%_0%,rgba(84,55,217,0.12),transparent_70%)] opacity-0"
                style={{ animation: "tech-glow 6s ease-in-out infinite", animationDelay: `${i * -0.5}s` }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/tech/${tech.file}.svg`}
                alt={tech.name}
                loading="lazy"
                className="relative h-9 w-9 object-contain sm:h-11 sm:w-11"
              />
              <span className="relative text-[11px] font-medium tracking-tight text-neutral-700 sm:text-[12px]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
