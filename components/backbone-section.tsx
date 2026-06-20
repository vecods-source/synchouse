import { t, type Lang } from "@/components/i18n"

const IMG = "/koba-towers.webp"
const IMG_ALT = "Koba standing between Shara's Marina Twin Towers in Lusail at sunset"

// A cropped banner of the towers + Koba with the title and a short line of copy
// over the open sky/sea. The image is mirrored in RTL so the subject sits opposite
// the (right-aligned) Arabic text.
export function BackboneSection({ lang }: { lang: Lang }) {
  const tr = t[lang].backbone
  const isRtl = lang === "ar"

  return (
    <section id="proof" className="relative isolate flex min-h-[420px] w-full items-center overflow-hidden px-4 py-24 sm:min-h-[480px]">
      <div className={`absolute inset-0 -z-20 overflow-hidden ${isRtl ? "-scale-x-100" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG}
          alt={IMG_ALT}
          loading="lazy"
          className="h-full w-full select-none object-cover"
          style={{ objectPosition: "50% 38%" }}
        />
      </div>
      {/* Scrim weighted toward the text side (left in LTR, right in RTL) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to ${isRtl ? "left" : "right"}, rgba(8,5,20,0.82) 0%, rgba(8,5,20,0.62) 40%, rgba(8,5,20,0.25) 72%, rgba(8,5,20,0.12) 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#c9b8ff]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
            {tr.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {tr.title}
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-white/80 sm:text-lg">{tr.story}</p>
        </div>
      </div>
    </section>
  )
}
