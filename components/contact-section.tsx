// Minimal contact: an on-brand indigo section with two clean, shadow-free
// buttons — WhatsApp and Call.

const PHONE_DISPLAY = "6601 2332"
const WHATSAPP_HREF = "https://wa.me/97466012332"
const CALL_HREF = "tel:+97466012332"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-6 py-32 sm:py-40"
      style={{ background: "linear-gradient(160deg, #5437d9 0%, #4226b0 100%)" }}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Let’s build something
        </h2>
        <p className="mt-4 text-balance text-lg text-white/70">
          Tell us your idea — we reply within 3 hours.
        </p>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
          {/* WhatsApp */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-[#5437d9] transition-colors hover:bg-white/90 sm:w-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .103 5.36.1 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.946-5.361 11.949-11.893a11.821 11.821 0 00-3.421-8.452z" />
            </svg>
            Chat on WhatsApp
          </a>

          {/* Call */}
          <a
            href={CALL_HREF}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}
