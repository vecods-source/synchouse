type Tr = {
  pay: string
  total: string
  payNow: string
  later: string
  phone: { store: string; secure: string; tap: string; product: string; subtotal: string; vat: string }
}

const APPLE =
  "M16.365 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.98 1.57-.12 0-.23-.01-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.2-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43zm4.56 15.71c-.03.07-.46 1.58-1.51 3.12-.95 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8-1.29-1.82-2.32-4.63-2.32-7.28 0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.67.95 3.6.95.86 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45z"

// A realistic phone checkout screen driven by an external `stage`:
// 0 ready · 1 processing · 2 paid (synchronised by the parent flow).
// Inner content is a touch smaller on mobile (sm: restores the desktop sizes) so
// the (intentionally large) phone window doesn't look oversized on small screens.
export function PaymentsMock({ tr, bare = false, stage = 0 }: { tr: Tr; bare?: boolean; stage?: number }) {
  const p = tr.phone
  return (
    <div className="relative">
      <div className="mx-auto flex aspect-[9/19] w-full max-w-[14rem] flex-col overflow-hidden rounded-[15px] bg-white p-3 shadow-[0_22px_50px_-26px_rgba(15,10,31,0.25)] sm:p-3.5">
        {/* status bar */}
        <div className="flex items-center justify-between px-1 text-[8px] font-semibold text-[#0f0a1f] sm:text-[9px]">
          <span>9:41</span>
          <svg width="16" height="9" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" opacity="0.35" /><rect x="2" y="2" width="15" height="8" rx="1.5" fill="currentColor" /><rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.35" /></svg>
        </div>

        {/* merchant header */}
        <div className="mt-3 flex items-center gap-2 sm:mt-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5437d9] text-[9px] font-bold text-white sm:h-7 sm:w-7 sm:text-[10px]">S</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold text-[#0f0a1f] sm:text-[11px]">{p.store}</p>
            <p className="text-[8px] text-neutral-400 sm:text-[9px]">{p.secure}</p>
          </div>
        </div>

        {/* product line */}
        <div className="mt-3 flex items-center gap-2 rounded-[5px] bg-neutral-50 p-1.5 sm:gap-2.5 sm:p-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-400 ring-1 ring-black/[0.06] sm:h-9 sm:w-9">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="sm:h-[18px] sm:w-[18px]"><path d="M7 4 4 6l1 3 2-1v9h10v-9l2 1 1-3-3-2-2 1a3 3 0 0 1-4 0L7 4Z" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9px] font-semibold text-[#0f0a1f] sm:text-[10px]">{p.product}</p>
            <p className="text-[8px] text-neutral-400 sm:text-[9px]">Navy · Medium</p>
          </div>
          <span className="text-[9px] font-semibold text-[#0f0a1f] sm:text-[10px]">QAR 80.00</span>
        </div>

        {/* amount */}
        <div className="mt-3 flex flex-col items-center sm:mt-4">
          <p className="text-[8px] text-neutral-400 sm:text-[9px]">{p.tap}</p>
          <p className="text-base font-bold tracking-tight text-[#0f0a1f] sm:text-xl">QAR 96.89</p>
        </div>

        {/* line items */}
        <div className="mt-auto space-y-1 text-[8px] text-neutral-500 sm:text-[9px]">
          <div className="flex justify-between"><span>{p.subtotal}</span><span>QAR 80.00</span></div>
          <div className="flex justify-between"><span>{p.vat}</span><span>QAR 16.89</span></div>
          <div className="flex justify-between border-t border-black/5 pt-1 text-[9px] font-bold text-[#0f0a1f] sm:text-[10px]"><span>{tr.total}</span><span>QAR 96.89</span></div>
        </div>

        {/* card on file */}
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-neutral-50 px-2 py-1 sm:px-2.5 sm:py-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/visa.svg" alt="Visa" className="h-2.5 sm:h-3" />
          <span className="text-[8px] font-medium text-neutral-500 sm:text-[9px]">•••• 4242</span>
        </div>

        {/* action button */}
        <div className="mt-2 flex h-8 items-center justify-center sm:h-9">
          {stage === 0 && (
            <div className="flex h-8 w-full items-center justify-center gap-1.5 rounded-[5px] bg-[#0f0a1f] text-white sm:h-9">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="sm:h-[13px] sm:w-[13px]"><path d={APPLE} /></svg>
              <span className="text-[10px] font-semibold sm:text-[11px]">{tr.pay}</span>
            </div>
          )}
          {stage === 1 && (
            <div className="flex h-8 w-full items-center justify-center rounded-[5px] bg-[#0f0a1f] text-white sm:h-9">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white sm:h-3.5 sm:w-3.5" />
            </div>
          )}
          {stage === 2 && (
            <div className="flex h-8 w-full items-center justify-center gap-1.5 rounded-[5px] bg-[#5437d9] text-white sm:h-9" style={{ animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:h-[13px] sm:w-[13px]"><path d="M5 13l4 4L19 7" /></svg>
              <span className="text-[10px] font-semibold sm:text-[11px]">{tr.payNow}</span>
            </div>
          )}
        </div>
      </div>

      {/* payment methods (only when shown standalone) */}
      {!bare && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/applewallet.svg" alt="Apple Pay" className="h-5 opacity-60 grayscale" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/googlewallet.svg" alt="Google Pay" className="h-5 opacity-60 grayscale" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/visa.svg" alt="Visa" className="h-4 opacity-60 grayscale" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/mastercard.svg" alt="Mastercard" className="h-5 opacity-60 grayscale" />
          <span className="rounded-md border border-black/10 px-2 py-0.5 text-[11px] font-semibold text-neutral-400">{tr.later}</span>
        </div>
      )}
    </div>
  )
}
