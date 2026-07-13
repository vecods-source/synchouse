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
    <section id="proof" className="relative isolate flex min-h-[58svh] w-full items-start overflow-hidden px-4 py-10 sm:min-h-[480px] sm:items-center sm:py-24">
      {/* image as an inset, rounded card on phones; full-bleed from sm up */}
      <div className="absolute inset-4 -z-10 overflow-hidden rounded-[15px] sm:inset-0 sm:rounded-none">
        <div className={`absolute inset-0 ${isRtl ? "-scale-x-100" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* tall vertical crop on phones (shows the towers/Koba side of the wide shot),
              the full wide framing from sm up */}
          <img
            src={IMG}
            alt={IMG_ALT}
            loading="lazy"
            className="h-full w-full select-none object-cover object-[80%_45%] sm:object-[50%_38%]"
          />
        </div>
        {/* Scrim weighted toward the text side (left in LTR, right in RTL) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to ${isRtl ? "left" : "right"}, rgba(8,5,20,0.82) 0%, rgba(8,5,20,0.62) 40%, rgba(8,5,20,0.25) 72%, rgba(8,5,20,0.12) 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-7 pt-6 sm:px-0 sm:pt-0">
        <div className="max-w-xl md:max-w-3xl">
          <p className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-[#c9b8ff]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
            {tr.eyebrow}
          </p>
          {/* punchy 2–3 word title on mobile; full headline from sm up */}
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            <span className="sm:hidden">{tr.titleShort}</span>
            <span className="hidden sm:inline">{tr.title}</span>
          </h2>
          {/* title only on mobile; full story from sm up */}
          <p className="mt-5 hidden max-w-xl text-balance text-lg leading-relaxed text-white/80 sm:block">{tr.story}</p>
        </div>
      </div>
    </section>
  )
}
