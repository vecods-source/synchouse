import { Highlighter } from "@/components/ui/highlighter"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { BlurText } from "@/components/ui/blur-text"
import { t, type Lang } from "@/components/i18n"

// "From idea → to launch" — a clean centred headline with the closing phrase
// highlighted (rough-notation marker, drawn when it scrolls into view).
export function ShowcaseSection({ lang }: { lang: Lang }) {
  const tr = t[lang].showcase
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-24 sm:sticky sm:top-0 sm:py-32">
      {/* flickering grid on the sides — continues from the Work section */}
      <AnimatedGridPattern
        numSquares={42}
        maxOpacity={0.09}
        duration={3}
        repeatDelay={1}
        className="z-0 [mask-image:linear-gradient(to_right,#000,transparent_8%,transparent_92%,#000)] md:[mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)] fill-[#5437d9]/20 stroke-[#5437d9]/20"
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-[#0f0a1f] sm:text-6xl">
          {tr.line1}{" "}
          <Highlighter action="highlight" color="#d9ccff" padding={6} animationDuration={700} isView>
            {tr.line2}
          </Highlighter>
        </h2>
        <BlurText className="mt-7 text-balance text-lg text-neutral-500">{tr.caption}</BlurText>
      </div>
    </section>
  )
}
