import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Highlighter } from "@/components/ui/highlighter"
import { cn } from "@/lib/utils"
import { t, dir, type Lang } from "@/components/i18n"

// A dedicated, detailed page per maintenance package (replaces the popup).
// Reachable at /maintenance/<slug> and /ar/maintenance/<slug>.
export const PLAN_SLUGS = ["basic", "care", "pro"] as const
const PHONE = "+97466012332"
const WHATSAPP = "https://wa.me/97466012332"

export function MaintenancePlanPage({ lang, plan }: { lang: Lang; plan: string }) {
  const idx = (PLAN_SLUGS as readonly string[]).indexOf(plan)
  if (idx === -1) notFound()

  const care = t[lang].solutions.care
  const careTitle = t[lang].services.care.title
  const p = care.plans[idx]
  const gold = idx === care.plans.length - 1
  const featured = p.tag !== "" && !gold
  const ar = lang === "ar"
  const home = ar ? "/ar" : "/"

  const waMsg = ar
    ? `مرحبًا شارة! أرغب بالبدء في باقة الصيانة «${p.name}».`
    : `Hi Shara! I’d like to start with the ${p.name} maintenance plan.`
  const waHref = `${WHATSAPP}?text=${encodeURIComponent(waMsg)}`

  const accentBg = gold ? "bg-[#c9a740]/15 text-[#9a7b1f]" : "bg-[#5437d9]/10 text-[#5437d9]"
  const tick = gold ? "bg-[#c9a740]/20 text-[#9a7b1f]" : "bg-emerald-100 text-emerald-600"
  const ctaBg = gold ? "bg-gradient-to-r from-[#c9a740] to-[#a87f23]" : "bg-[#5437d9]"

  // the FULL feature set for this tier: expand the "Everything in <lower>" line into
  // every inherited feature (the detail page has room to list them all), keeping only
  // this tier's response/SLA line so the upgraded times don't stack up.
  const allFeatures: { t: string; k?: "inc" | "new" | "sla" }[] = []
  for (let j = 0; j <= idx; j++) {
    for (const d of care.plans[j].details as readonly { t: string; k?: "inc" | "new" | "sla" }[]) {
      if (d.k === "inc") continue
      if (d.k === "sla" && j !== idx) continue
      allFeatures.push(d)
    }
  }

  return (
    <div lang={lang} dir={dir(lang)}>
      <Navbar lang={lang} />

      <main className="relative w-full overflow-hidden bg-white px-4 pb-24 pt-28 sm:pt-32">
        {/* same flickering side-grid used across the site */}
        <AnimatedGridPattern
          numSquares={42}
          maxOpacity={0.09}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:linear-gradient(to_right,#000,transparent_8%,transparent_92%,#000)] md:[mask-image:linear-gradient(to_right,#000,transparent_24%,transparent_76%,#000)]",
            "inset-0 h-full",
            "fill-[#5437d9]/20 stroke-[#5437d9]/20",
          )}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* back link */}
          <Link href={`${home}#services`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500 transition-colors hover:text-[#5437d9]">
            <span aria-hidden>{ar ? "→" : "←"}</span>
            {careTitle}
          </Link>

          {/* header */}
          <p className="mt-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5437d9]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5437d9]" />
            {care.planEyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0f0a1f] sm:text-4xl">{p.name}</h1>
            {featured && <span className="rounded-full bg-[#5437d9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">{p.tag}</span>}
            {gold && <span className="rounded-full bg-gradient-to-r from-[#d8b54a] to-[#a87f23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-[0_2px_8px_-3px_rgba(168,127,35,0.85)]">{ar ? "مميّز" : "Premium"}</span>}
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-500">{care.planIntro}</p>

          {p.extra && (
            <div className={`mt-5 inline-flex items-start gap-1.5 rounded-[6px] px-3 py-2 text-[12.5px] font-semibold leading-snug ${accentBg}`}>
              <PlusIcon className="mt-px h-3.5 w-3.5 shrink-0" />
              <span>{p.extra}</span>
            </div>
          )}

          {/* billing options */}
          <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{care.billingTitle}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* monthly */}
            <div className="rounded-[8px] bg-white p-5 ring-1 ring-black/[0.08]">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">{care.billMonthly}</p>
              <p className="mt-1.5 flex items-baseline gap-1">
                <span className="text-[26px] font-bold tracking-tight text-[#0f0a1f]"><bdi>{p.price}</bdi></span>
                <span className="text-[13px] font-medium text-neutral-400">{p.per}</span>
              </p>
            </div>
            {/* yearly — with the drawn strike on the full price */}
            <div className="relative rounded-[8px] bg-[#5437d9]/[0.04] p-5 ring-1 ring-[#5437d9]/25">
              <span className="absolute -top-2.5 end-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ring-2 ring-white">
                {care.yearlyNote}
              </span>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">{care.billYearly}</p>
              <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[15px] font-semibold text-neutral-400">
                  <Highlighter action="strike-through" color="#94a3b8" strokeWidth={1.25} padding={1} animationDuration={600} isView>
                    <bdi>{p.priceYearWas}</bdi>
                  </Highlighter>
                </span>
                <span className="text-[26px] font-bold tracking-tight text-[#0f0a1f]"><bdi>{p.priceYear}</bdi></span>
                <span className="text-[13px] font-medium text-neutral-400">{care.perYear}</span>
              </p>
              <p className="mt-1 text-[11px] font-medium text-emerald-600">{care.freeMonthNote}</p>
            </div>
          </div>

          {/* features */}
          <h2 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{care.featuresTitle}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {allFeatures.map((d) => (
              <li key={d.t} className="flex items-start gap-2.5 text-[13.5px] font-medium leading-snug text-[#0f0a1f]">
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tick}`}>
                  <TickIcon className="h-2.5 w-2.5" />
                </span>
                <span>{d.t}</span>
              </li>
            ))}
          </ul>

          {/* CTAs — start on WhatsApp + click to call */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-[5px] px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${ctaBg}`}
            >
              <WhatsAppGlyph className="h-[18px] w-[18px]" />
              {care.ctaLabel}
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[5px] border border-black/15 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0f0a1f] transition-colors hover:bg-neutral-50"
            >
              <PhoneIcon className="h-[17px] w-[17px]" />
              {care.callLabel}
            </a>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

function TickIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .103 5.36.1 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.946-5.361 11.949-11.893a11.821 11.821 0 00-3.421-8.452z" />
    </svg>
  )
}
