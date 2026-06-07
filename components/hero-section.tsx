import Image from "next/image"
import Link from "next/link"

const CONTACT_HREF = `mailto:contact@shara.qa?subject=${encodeURIComponent("Project enquiry")}`

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative h-[60vh] w-full">
        {/* Full-width background image */}
        <Image
          src="/hero/hero-render.png"
          alt="Shara"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft white scrim for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6),rgba(255,255,255,0.2))]"
        />

        {/* Frosted blur behind the text, faded smoothly via a radial mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[820px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2 backdrop-blur-2xl"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 72%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 72%)",
          }}
        />

        {/* Text overlaid on the image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-12 text-center">
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-[#0f0a1f] sm:text-6xl lg:text-7xl">
            Software that <span className="text-[#5437d9]">ships</span>
          </h1>

          <p className="mt-5 max-w-md text-balance text-lg text-neutral-700 sm:text-xl">
            Built in Qatar. Owned by you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={CONTACT_HREF}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Start a project
            </Link>
            <Link
              href="#work"
              className="inline-flex w-full items-center justify-center gap-1 rounded-full px-7 py-3 text-[15px] font-medium text-[#5437d9] transition-colors hover:text-[#3b2b85] sm:w-auto"
            >
              See our work <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
