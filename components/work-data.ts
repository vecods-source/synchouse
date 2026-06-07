// Shared project data for the Work section variants.
// Copy sourced from the real project docs under C:/Ab-Work/Projects.
// Logos live at /public/our work/logos/<logo>.png

export type WorkProject = {
  slug: string
  name: string
  category: string
  logo: string
  status: "live" | "dev"
  statusLabel: string
  // Compact one-liner for cards / chat / floating comments.
  tagline: string
  // Longer pair for detailed layouts.
  brief: string
  outcome: string
  features: string[]
}

export const PROJECTS: WorkProject[] = [
  {
    slug: "karama",
    name: "Al Karama Trading",
    category: "Delivery · Mobile + Web",
    logo: "karama",
    status: "live",
    statusLabel: "Live",
    tagline: "A livestock-feed business that now takes orders and delivers them itself.",
    brief: "A livestock-feed and farm-supply business that needed to take orders and deliver them itself.",
    outcome:
      "We built the full stack — customer and driver apps, an admin dashboard, and a backend with live GPS tracking and in-app payments.",
    features: ["Customer + driver apps", "Live GPS tracking", "In-app payments", "Admin dashboard"],
  },
  {
    slug: "call-to-clean",
    name: "Call To Clean",
    category: "Services marketplace · Mobile",
    logo: "call-to-clean",
    status: "live",
    statusLabel: "Live · App Store & Play",
    tagline: "A home-services marketplace — booking and payments — live on iOS, Android and web.",
    brief: "Booking home services in Qatar meant phone calls and guesswork — no prices, no tracking.",
    outcome:
      "We shipped a full services marketplace end to end — discovery, booking and payments — live on iOS, Android and the web.",
    features: ["Provider marketplace", "Slot booking & pricing", "QAR payments", "Customer + partner apps"],
  },
  {
    slug: "qatar-battery",
    name: "Qatar Battery Factory",
    category: "Operations platform · Web",
    logo: "qatar battery",
    status: "live",
    statusLabel: "In production",
    tagline: "Warranties, WhatsApp and call-center work — automated for a battery maker.",
    brief: "A battery manufacturer drowning in warranty registrations and manual customer follow-ups.",
    outcome:
      "We built a customer-service platform that automates warranties, WhatsApp messaging and call-center work — with analytics on top.",
    features: ["Warranty registration", "Automated WhatsApp", "Call-center module", "Analytics & ads"],
  },
  {
    slug: "filora",
    name: "FILORA Living",
    category: "Luxury brand site · AI",
    logo: "filora",
    status: "live",
    statusLabel: "Live",
    tagline: "A cinematic site with an AI concierge for a high-end smart-home brand.",
    brief: "A high-end smart-home brand in Doha that needed a website as polished as its villas.",
    outcome:
      "We built a cinematic bilingual site with an AI concierge and a passcode-gated control room to manage everything — no code.",
    features: ["Cinematic UX", "AI concierge", "Bilingual + RTL", "No-code control room"],
  },
  {
    slug: "lazla",
    name: "Lazla",
    category: "E-commerce · Web",
    logo: "lazla",
    status: "live",
    statusLabel: "In production",
    tagline: "A full storefront, admin and backend so a merchant can sell direct.",
    brief: "A merchant that wanted to sell direct, with full control over products, orders and customers.",
    outcome:
      "We built a complete storefront, admin dashboard and backend — variants, inventory, orders and analytics in one system.",
    features: ["Storefront", "Variants & inventory", "Order management", "Analytics dashboard"],
  },
  {
    slug: "betakah",
    name: "Betakah",
    category: "Invitations · Mobile",
    logo: "bitaqa",
    status: "dev",
    statusLabel: "In development",
    tagline: "Digital event invitations with RSVPs and reminders — no more spreadsheets.",
    brief: "Sending event invitations and tracking who’s coming, without the spreadsheet chaos.",
    outcome:
      "We’re building a digital-invitation app — bilingual cards, RSVPs with plus-ones and push reminders, with an admin behind it.",
    features: ["Bilingual invite cards", "RSVP + plus-ones", "Push reminders", "Admin dashboard"],
  },
  {
    slug: "vexa",
    name: "Vexa",
    category: "Discovery app · Mobile",
    logo: "vexa",
    status: "dev",
    statusLabel: "In development",
    tagline: "An Arabic-first app that puts every local store on the map.",
    brief: "Local stores are hard to find online. Vexa wanted a place that puts them all on the map.",
    outcome:
      "We’re building an Arabic-first store-discovery app — owner dashboards, analytics and featured placements built in.",
    features: ["Store discovery", "Owner dashboards", "Save & favorites", "Featured placement"],
  },
  {
    slug: "aks",
    name: "AKS",
    category: "Marketplace · Mobile + Web",
    logo: "aks",
    status: "dev",
    statusLabel: "In development",
    tagline: "A marketplace app with its own loyalty program — plus the admin to run it.",
    brief: "A retailer that wanted its own marketplace app — shopping, accounts and rewards — not a rented storefront.",
    outcome:
      "We’re building the mobile app and web admin together — catalog and search, cart and orders, and a points-based loyalty tier system.",
    features: ["iOS + Android app", "Cart & orders", "Loyalty tiers", "Web admin"],
  },
]

export const MEETING_HREF = `mailto:contact@shara.qa?subject=${encodeURIComponent("Meeting request")}`
