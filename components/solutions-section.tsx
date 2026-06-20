import { PaymentFlow, ShowcaseCard } from "@/components/payment-flow"
import { Capabilities, IdeaCard } from "@/components/capabilities"
import { CustomCard } from "@/components/custom-solution"
import { t, type Lang } from "@/components/i18n"

export function SolutionsSection({ lang }: { lang: Lang }) {
  const tr = t[lang].solutions
  return (
    <section id="solutions" className="relative w-full overflow-hidden bg-[#f6f7fb] px-4 py-20 sm:py-28">
      {/* minimal static decoration so the section doesn't feel empty (sits behind the cards) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(84,55,217,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
          }}
        />
        <div
          className="absolute -left-24 top-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,92,255,0.10), transparent 70%)" }}
        />
        <div
          className="absolute -right-24 bottom-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(180,151,207,0.10), transparent 70%)" }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-balance text-[28px] font-semibold leading-[1.2] tracking-tight sm:text-4xl">
          <span className="text-[#0f0a1f]">{tr.title1}</span>
          <span className="text-[#8a84c4]">{tr.title2}</span>
        </h2>

        <div className="mt-12">
          <PaymentFlow lang={lang} />
        </div>

        <div className="mt-6">
          <Capabilities lang={lang} />
        </div>

        {/* idea → product (design tab = before/after) + custom solution (2 cards) */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <IdeaCard lang={lang} />
          <CustomCard lang={lang} />
        </div>

        <div className="mt-6">
          <ShowcaseCard lang={lang} />
        </div>
      </div>
    </section>
  )
}
