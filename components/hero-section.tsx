import Image from "next/image"
import Link from "next/link"
import { HeroHeadline } from "@/components/hero-headline"
import { WhatsAppButton } from "@/components/whatsapp-gate"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0f0a1f] px-6 pb-16 pt-24">
      {/* brand glow behind Koba */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 36%, rgba(84,55,217,0.35), transparent 60%)" }}
      />

      {/* Koba — big, standing, glowing */}
      <div className="relative flex flex-col items-center">
        <div className="relative h-[60vh] max-h-[680px] w-[clamp(320px,84vw,620px)]">
          <Image
            src="/koba.png"
            alt="Koba — Shara's mascot"
            fill
            priority
            sizes="(min-width: 640px) 620px, 84vw"
            className="object-contain drop-shadow-[0_25px_50px_rgba(84,55,217,0.45)]"
          />
        </div>
        {/* glowing ground shadow */}
        <div aria-hidden className="-mt-1 h-7 w-60 rounded-[100%] bg-[#5437d9]/45 blur-2xl" />
      </div>

      {/* Text under Koba */}
      <div className="relative -mt-2 flex flex-col items-center text-center">
        <HeroHeadline />
        <p className="mt-5 max-w-md text-balance text-lg text-white/65 sm:text-xl">
          Built in Qatar. Owned by you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <WhatsAppButton className="inline-flex w-full items-center justify-center rounded-full bg-[#5437d9] px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 sm:w-auto">
            Start a project
          </WhatsAppButton>
          <Link
            href="#work"
            className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-white/20 px-7 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            See our work <span aria-hidden>›</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
