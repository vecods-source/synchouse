import { Database, ShoppingCart, Smartphone, Bot, Calendar, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Database,
    title: "ERP Systems",
    description:
      "Comprehensive enterprise resource planning solutions that streamline your operations and boost efficiency.",
  },
  {
    icon: BarChart3,
    title: "CRM Solutions",
    description:
      "Customer relationship management platforms that help you build lasting relationships and drive growth.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Scalable online stores with seamless payment integration and exceptional user experiences.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that engage users on iOS and Android.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent automation and AI-powered solutions that transform how you work and serve customers.",
  },
  {
    icon: Calendar,
    title: "Appointment Systems",
    description: "Smart scheduling and booking platforms that optimize time management and reduce no-shows.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
            <span className="text-sm font-semibold text-accent">Our Services</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Digital Solutions for
            <br />
            Modern Businesses
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            We deliver cutting-edge software solutions tailored to your unique business needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 shadow-md transition-all duration-200 hover:shadow-xl hover:border-accent/30"
            >
              <div className="absolute right-4 top-4 h-2 w-2 bg-accent/20 group-hover:bg-accent/40 transition-colors" />

              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300">
                <service.icon className="h-7 w-7 text-accent" />
              </div>

              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
