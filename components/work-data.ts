// Shared project data for the Work section (bilingual).
// Copy sourced from the real project docs under C:/Ab-Work/Projects.
// Logos live at /public/our work/logos/<logo>.png
type Loc = { en: string; ar: string }

export type WorkProject = {
  slug: string
  name: string
  logo: string
  status: "live" | "dev"
  statusLabel: Loc
  category: Loc
  tagline: Loc
  features: Loc[]
  url?: string // app/website link — opens in a new tab when set
  logoFile?: string // full logo filename (e.g. an .svg); falls back to `${logo}.png`
}

export const PROJECTS: WorkProject[] = [
  {
    slug: "karama",
    name: "Al Karama Trading",
    logo: "karama",
    status: "live",
    statusLabel: { en: "Live", ar: "مُطلَق" },
    category: { en: "Delivery · Mobile + Web", ar: "توصيل · جوال + ويب" },
    url: "https://apps.apple.com/qa/app/al-karama/id6760106679",
    tagline: {
      en: "A livestock-feed business that now takes orders and delivers them itself.",
      ar: "نشاط لأعلاف الماشية صار يستقبل الطلبات ويوصّلها بنفسه.",
    },
    features: [
      { en: "Customer + driver apps", ar: "تطبيق العميل + السائق" },
      { en: "Live GPS tracking", ar: "تتبّع GPS مباشر" },
      { en: "In-app payments", ar: "دفع داخل التطبيق" },
      { en: "Admin dashboard", ar: "لوحة تحكم" },
    ],
  },
  {
    slug: "qatar-battery",
    name: "Qatar Battery Factory",
    logo: "qatar battery",
    status: "live",
    statusLabel: { en: "In production", ar: "قيد التشغيل" },
    category: { en: "Operations platform · Web", ar: "منصة عمليات · ويب" },
    url: "https://www.hddsystem.app/",
    tagline: {
      en: "Warranties, WhatsApp and call-center work — automated for a battery maker.",
      ar: "الضمانات وواتساب وعمل مركز الاتصال — مُؤتمتة لمصنع بطاريات.",
    },
    features: [
      { en: "Warranty registration", ar: "تسجيل الضمان" },
      { en: "Automated WhatsApp", ar: "واتساب آلي" },
      { en: "Call-center module", ar: "وحدة مركز اتصال" },
      { en: "Analytics & ads", ar: "تحليلات وإعلانات" },
    ],
  },
  {
    slug: "filora",
    name: "FILORA Living",
    logo: "filora",
    status: "live",
    statusLabel: { en: "Live", ar: "مُطلَق" },
    category: { en: "Luxury brand site · AI", ar: "موقع علامة فاخرة · ذكاء اصطناعي" },
    url: "https://www.filoraliving.com/",
    tagline: {
      en: "A cinematic site with an AI concierge for a high-end smart-home brand.",
      ar: "موقع سينمائي مع مساعد ذكاء اصطناعي لعلامة منازل ذكية فاخرة.",
    },
    features: [
      { en: "Cinematic UX", ar: "تجربة سينمائية" },
      { en: "AI concierge", ar: "مساعد ذكاء اصطناعي" },
      { en: "Bilingual + RTL", ar: "ثنائي اللغة + RTL" },
      { en: "No-code control room", ar: "لوحة تحكم بدون كود" },
    ],
  },
  {
    slug: "lazla",
    name: "Lazla",
    logo: "lazla",
    status: "live",
    statusLabel: { en: "In production", ar: "قيد التشغيل" },
    category: { en: "E-commerce · Web", ar: "تجارة إلكترونية · ويب" },
    url: "https://www.lazla.qa/en",
    tagline: {
      en: "A full storefront, admin and backend so a merchant can sell direct.",
      ar: "متجر كامل ولوحة تحكم وخادم ليبيع التاجر مباشرةً.",
    },
    features: [
      { en: "Storefront", ar: "واجهة متجر" },
      { en: "Variants & inventory", ar: "خيارات ومخزون" },
      { en: "Order management", ar: "إدارة الطلبات" },
      { en: "Analytics dashboard", ar: "لوحة تحليلات" },
    ],
  },
  {
    slug: "invity",
    name: "Invity",
    logo: "invity",
    logoFile: "invity.png",
    status: "dev",
    statusLabel: { en: "Under development", ar: "قيد التطوير" },
    category: { en: "Invitations · Mobile", ar: "دعوات · جوال" },
    tagline: {
      en: "Digital event invitations with RSVPs and reminders — no more spreadsheets.",
      ar: "دعوات مناسبات رقمية مع تأكيد حضور وتذكيرات — وداعًا للجداول.",
    },
    features: [
      { en: "Bilingual invite cards", ar: "بطاقات دعوة ثنائية اللغة" },
      { en: "RSVP + plus-ones", ar: "تأكيد حضور + مرافقين" },
      { en: "Push reminders", ar: "تذكيرات فورية" },
      { en: "Admin dashboard", ar: "لوحة تحكم" },
    ],
  },
  {
    slug: "vexa",
    name: "Vexa",
    logo: "vexa",
    status: "dev",
    statusLabel: { en: "In development", ar: "قيد التطوير" },
    category: { en: "Discovery app · Mobile", ar: "تطبيق اكتشاف · جوال" },
    tagline: {
      en: "An Arabic-first app that puts every local store on the map.",
      ar: "تطبيق عربي أولًا يضع كل متجر محلي على الخريطة.",
    },
    features: [
      { en: "Store discovery", ar: "اكتشاف المتاجر" },
      { en: "Owner dashboards", ar: "لوحات للمالكين" },
      { en: "Save & favorites", ar: "حفظ ومفضلة" },
      { en: "Featured placement", ar: "ظهور مميّز" },
    ],
  },
  {
    slug: "aks",
    name: "AKS",
    logo: "aks",
    status: "dev",
    statusLabel: { en: "In development", ar: "قيد التطوير" },
    category: { en: "Marketplace · Mobile + Web", ar: "سوق · جوال + ويب" },
    tagline: {
      en: "A marketplace app with its own loyalty program — plus the admin to run it.",
      ar: "تطبيق سوق ببرنامج ولاء خاص — مع لوحة تحكم لإدارته.",
    },
    features: [
      { en: "iOS + Android app", ar: "تطبيق iOS + أندرويد" },
      { en: "Cart & orders", ar: "سلة وطلبات" },
      { en: "Loyalty tiers", ar: "مستويات ولاء" },
      { en: "Web admin", ar: "لوحة تحكم ويب" },
    ],
  },
]
