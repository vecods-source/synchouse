import { BrandStrip } from "@/components/brand-strip"
import { SidePixels } from "@/components/side-pixels"
import { type Lang } from "@/components/i18n"

// The partners / integrations strip, in its own section. The slider sits at the
// bottom of the section.
export function IntegrationsSection({ lang }: { lang: Lang }) {
  return (
    <section id="integrations" className="relative w-full overflow-hidden bg-white px-4 pb-16 pt-20 sm:pb-16 sm:pt-20">
      <SidePixels />
      <div className="relative z-10 mx-auto flex min-h-[200px] max-w-6xl flex-col justify-end">
        <BrandStrip lang={lang} />
      </div>
    </section>
  )
}
