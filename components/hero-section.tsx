import Link from "next/link"
import { AnimatedGradient } from "@/components/animated-gradient"
import { HeroVideo } from "@/components/hero-video"
import { WhatsAppButton } from "@/components/whatsapp-gate"
import { t, type Lang } from "@/components/i18n"

export function HeroSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hero
  return (
    <section className="sticky top-0 z-0 flex min-h-0 w-full items-center overflow-hidden bg-white px-4 pb-12 pt-24 md:min-h-[100svh] md:pb-16 md:pt-28">
      {/* flowing gradient */}
      <AnimatedGradient className="absolute inset-0" />
      {/* faded 3-clip crossfade on top of the gradient */}
      <HeroVideo className="opacity-25 mix-blend-multiply" />
      {/* white veil for legibility */}
      <div aria-hidden className="absolute inset-0 bg-white/55 md:hidden" />
      <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/80 to-white/40 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-xl text-center md:max-w-[80%] md:text-start">
          <p className="text-[15px] font-medium text-neutral-500">{tr.label}</p>
          <p
            data-slide
            className="hero-font mt-6 text-balance font-medium leading-[1.25] tracking-tight text-[#0f0a1f]"
            style={{ animation: "fade-in 0.8s ease-out 0.15s both" }}
          >
            {tr.prefix}
            {tr.accent}
            {tr.suffix}
            {/* Long descriptive line is desktop-only; mobile shows just the short sentence (~2 lines) */}
            <span className="hidden md:inline text-[#8a84c4]"> {tr.sub}</span>
          </p>
          <div
            data-slide
            className="mt-8 flex items-center justify-center gap-3 md:justify-start"
            style={{ animation: "fade-in 0.8s ease-out 0.3s both" }}
          >
            {/* primary — wide */}
            <WhatsAppButton className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-[5px] bg-[#5437d9] px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 sm:flex-none sm:px-7">
              {tr.start} <span aria-hidden>{lang === "ar" ? "‹" : "›"}</span>
            </WhatsAppButton>
            {/* secondary — compact */}
            <Link
              href="#work"
              className="inline-flex shrink-0 items-center justify-center rounded-[5px] border border-black/15 bg-white/70 px-5 py-3.5 text-[15px] font-semibold text-[#0f0a1f] backdrop-blur transition-colors hover:bg-black/5 sm:px-7"
            >
              {tr.work}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
