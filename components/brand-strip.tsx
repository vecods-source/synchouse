import { t, type Lang } from "@/components/i18n"

// text/text2 render a two-tone wordmark (e.g. FedEx); color is the brand colour.
type Brand = { img?: string; text?: string; color?: string; text2?: string; color2?: string }

// Platforms the apps we build integrate with — in their brand colours.
const BRANDS: Brand[] = [
  { text: "AWS", color: "#FF9900" },
  { img: "stripe.svg" },
  { img: "openai.svg" },
  { text: "MyFatoorah", color: "#1A3E8C" },
  { text: "SkipCash", color: "#00A99D" },
  { text: "QNB", color: "#84003D" },
  { img: "gemini.svg" },
  { img: "qatarairways.svg" },
  { text: "Fed", color: "#4D148C", text2: "Ex", color2: "#FF6600" },
  { text: "Aramex", color: "#E2231A" },
  { text: "ooredoo", color: "#ED1C24" },
  { text: "Vodafone", color: "#E60000" },
  { img: "applewallet.svg" },
  { img: "googlewallet.svg" },
]

function BrandItem({ b }: { b: Brand }) {
  return (
    <span className="flex shrink-0 items-center">
      {b.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/brands/${b.img}`} alt="" className="h-6 w-auto opacity-60 grayscale sm:h-7" />
      ) : (
        <span className="text-[15px] font-bold tracking-tight text-neutral-400 sm:text-[17px]">
          {b.text}
          {b.text2}
        </span>
      )}
    </span>
  )
}

export function BrandStrip({ lang }: { lang: Lang }) {
  const caption = t[lang].hero.integrations
  return (
    <div className="mx-auto w-full">
      <p className="mb-4 text-center text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-400">{caption}</p>
      {/* dir=ltr so the loop runs the same way in RTL; the track is left-anchored
          (no justify-center, which would offset it and reveal empty space). */}
      <div dir="ltr" className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        {/* Two identical groups; the track shifts by exactly one group (-50%), so the
            loop is perfectly seamless. Each group repeats the brands so a single
            group is always wider than the screen — it never runs empty. */}
        <div data-marquee className="flex w-max will-change-transform" style={{ animation: "marquee-x 50s linear infinite" }}>
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10 pe-10">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <BrandItem key={i} b={b} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
