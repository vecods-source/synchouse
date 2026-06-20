import { t, type Lang } from "./i18n"

// Headline with one brand-colored accent word, fluid size, on white.
export function HeroHeadline({ lang, className = "" }: { lang: Lang; className?: string }) {
  const { prefix, accent, suffix } = t[lang].hero
  return (
    <h1 className={`hero-font text-balance font-semibold leading-[1.1] tracking-tight text-[#0f0a1f] ${className}`}>
      {prefix}
      <span className="text-[#5437d9]">{accent}</span>
      {suffix}
    </h1>
  )
}
