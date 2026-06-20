// A clean Stripe-style checkout in a minimal browser chrome (three grey dots +
// centred URL pill). Two columns: the payment form (fully visible) and an order
// summary that gets cropped at the right edge. Always LTR.

type AdminTr = {
  url: string
  brand: string
  email: string
  or: string
  method: string
  card: string
  installments: string
  installmentsSub: string
  invoice: string
  cont: string
  summary: string
  product: string
  variant: string
  subtotal: string
  vat: string
  shipping: string
  free: string
  total: string
  inStock: string
  placed: string
}

const APPLE =
  "M16.365 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.98 1.57-.12 0-.23-.01-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.2-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43zm4.56 15.71c-.03.07-.46 1.58-1.51 3.12-.95 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8-1.29-1.82-2.32-4.63-2.32-7.28 0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.67.95 3.6.95.86 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45z"

export function AdminBrowser({ a, step }: { a: AdminTr; step: number }) {
  const sold = step >= 3 // the synced sale has landed → last unit gone, order logged

  return (
    <div
      dir="ltr"
      className="flex w-[740px] flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_30px_70px_-34px_rgba(15,10,31,0.22)] ring-1 ring-black/10"
    >
      {/* ── Title bar — three grey dots + centred URL pill ── */}
      <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#f4f4f6] px-4 py-2.5">
        <div className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
          <span className="h-[9px] w-[9px] rounded-full bg-neutral-300" />
        </div>
        <div className="mx-auto flex w-[46%] min-w-0 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-[5px] text-[10px] font-medium text-neutral-500 ring-1 ring-black/[0.06]">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400">
            <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate">{a.url}</span>
        </div>
        {/* spacer mirrors the dots so the pill stays optically centred */}
        <span className="w-[39px] shrink-0" />
      </div>

      {/* ── Checkout ── */}
      <div className="relative flex min-h-[520px] bg-white text-[#0f0a1f]">
        {/* faint warm wash, top-right — like the reference */}
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-40 w-1/2" style={{ background: "radial-gradient(120% 90% at 100% 0%, rgba(251,146,60,0.16), transparent 60%)" }} />

        {/* LEFT — the form (fully visible) */}
        <div className="relative w-[440px] shrink-0 p-7">
          <p className="text-[12px] font-extrabold tracking-tight text-[#5437d9]">{a.brand}</p>

          {/* email */}
          <p className="mt-6 text-[9px] font-medium text-neutral-500">{a.email}</p>
          <div className="mt-1 rounded-md border border-black/10 px-2.5 py-2 text-[10px] text-neutral-600 shadow-[0_1px_2px_rgba(15,10,31,0.04)]">
            damian.michelfelder@example.com
          </div>

          {/* express checkout */}
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="flex h-[30px] items-center justify-center gap-1.5 rounded-md bg-[#00d66f] text-[11px] font-bold text-[#011627]">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#011627]">
                <svg width="5" height="5" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
              </span>
              link
            </div>
            <div className="flex h-[30px] items-center justify-center gap-1 rounded-md bg-black text-white">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d={APPLE} /></svg>
              <span className="text-[11px] font-semibold">Pay</span>
            </div>
          </div>

          {/* divider */}
          <div className="my-3 flex items-center gap-2.5 text-[8px] font-medium uppercase tracking-wide text-neutral-400">
            <span className="h-px flex-1 bg-black/[0.08]" />
            {a.or}
            <span className="h-px flex-1 bg-black/[0.08]" />
          </div>

          {/* payment method */}
          <p className="text-[9px] font-medium text-neutral-500">{a.method}</p>
          <div className="mt-1.5 space-y-1.5">
            <Method label={a.card}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20" /></svg>
            </Method>
            <Method label={a.installments} sub={a.installmentsSub} selected>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 14h2M14 14h2" /></svg>
            </Method>
            <Method label={a.invoice}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>
            </Method>
          </div>

          {/* continue → flips to a success state when the order lands */}
          <div className="relative mt-3 h-[34px]">
            <div className={`absolute inset-x-0 top-0 rounded-md bg-neutral-100 py-2 text-center text-[11px] font-semibold text-neutral-400 transition-all duration-500 ease-in-out will-change-transform ${sold ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}>
              {a.cont}
            </div>
            <div className={`absolute inset-x-0 top-0 flex items-center justify-center gap-1.5 rounded-md bg-[#5437d9] py-2 text-[11px] font-semibold text-white transition-all duration-500 ease-in-out will-change-transform ${sold ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              {a.placed}
            </div>
          </div>
        </div>

        {/* RIGHT — order summary (cropped at the edge) */}
        <div className="relative w-[300px] shrink-0 border-l border-black/[0.07] bg-white/70 p-7">
          <p className="text-[10px] font-semibold text-neutral-500">{a.summary}</p>

          <div className="mt-4 flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-50 ring-1 ring-black/[0.05]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/products/car.webp" alt={a.product} className="h-full w-full object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold leading-tight">{a.product}</p>
              <p className="mt-0.5 text-[9px] text-neutral-400">{a.variant}</p>
              {/* live stock — ticks down by one when the phone's order succeeds */}
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-px text-[8px] font-bold text-emerald-600">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                <Digit sold={sold} />
                <span>{a.inStock}</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold"><bdi>QAR 80.00</bdi></span>
          </div>

          <div className="mt-5 space-y-2 text-[9px] text-neutral-500">
            <Row label={a.subtotal} value="QAR 80.00" />
            <Row label={a.vat} value="QAR 16.89" />
            <Row label={a.shipping} value={a.free} />
            <div className="mt-1 flex items-center justify-between border-t border-black/[0.07] pt-2 text-[11px] font-bold text-[#0f0a1f]">
              <span>{a.total}</span>
              <span><bdi>QAR 96.89</bdi></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Single-digit odometer: shows 8, slides to 7 when the order succeeds.
function Digit({ sold }: { sold: boolean }) {
  return (
    <span className="relative inline-block h-[9px] w-[5px] overflow-hidden leading-[9px]">
      <span className={`absolute inset-0 text-center transition-transform duration-500 ease-in-out will-change-transform ${sold ? "-translate-y-full" : "translate-y-0"}`}>8</span>
      <span className={`absolute inset-0 text-center transition-transform duration-500 ease-in-out will-change-transform ${sold ? "translate-y-0" : "translate-y-full"}`}>7</span>
    </span>
  )
}

function Method({ label, sub, selected, children }: { label: string; sub?: string; selected?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-2 rounded-md border px-2.5 py-2 transition-colors ${selected ? "border-[#5437d9] bg-[#5437d9]/[0.03] ring-1 ring-[#5437d9]/25" : "border-black/10"}`}>
      <span className={`mt-px flex h-[12px] w-[12px] shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#5437d9]" : "border-neutral-300"}`}>
        {selected && <span className="h-1 w-1 rounded-full bg-[#5437d9]" />}
      </span>
      <span className="mt-px shrink-0 text-neutral-500">{children}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[#0f0a1f]">{label}</p>
        {sub && <p className="mt-0.5 text-[8px] leading-snug text-neutral-400">{sub}</p>}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-medium text-neutral-600"><bdi>{value}</bdi></span>
    </div>
  )
}
