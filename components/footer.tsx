import Image from "next/image"
import Link from "next/link"
import { WhatsAppButton } from "@/components/whatsapp-gate"
import { t, type Lang } from "@/components/i18n"

const INSTAGRAM_HREF = "https://instagram.com/shara.qa"
const EMAIL = "contact@shara.qa"

export function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer
  const links = [
    { label: tr.work, href: "#work" },
    { label: tr.process, href: "#process" },
    { label: tr.contact, href: "#contact" },
  ]
  return (
    <footer className="w-full border-t border-black/5 bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Image src="/logo/logo-dark.png" alt="Shara" width={28} height={28} className="h-7 w-7 object-contain" />
              <span className="text-[16px] font-semibold tracking-tight text-[#0f0a1f]">Shara</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">{tr.tagline}</p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-400">{tr.explore}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-neutral-600 transition-colors hover:text-[#5437d9]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-400">{tr.connect}</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <WhatsAppButton className="text-[15px] text-neutral-600 transition-colors hover:text-[#5437d9]">
                    WhatsApp
                  </WhatsAppButton>
                </li>
                <li>
                  <a href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer" className="text-[15px] text-neutral-600 transition-colors hover:text-[#5437d9]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="text-[15px] text-neutral-600 transition-colors hover:text-[#5437d9]">
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-14 flex flex-col gap-2 border-t border-black/5 pt-8 text-[13px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{tr.legal}</p>
          <p>{tr.address}</p>
        </div>
      </div>
    </footer>
  )
}
