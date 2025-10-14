"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 py-24 md:py-32">
      <div className="absolute left-10 top-20 h-2 w-2 bg-accent/30 animate-pulse-subtle" />
      <div
        className="absolute left-14 top-24 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute right-20 top-32 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute right-16 top-36 h-2 w-2 bg-foreground/10 animate-pulse-subtle"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 h-2 w-2 bg-accent/20 animate-pulse-subtle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-24 right-1/3 h-2 w-2 bg-foreground/20 animate-pulse-subtle"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
            Digital Solutions
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Synchronized
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
            We build enterprise-grade software solutions that transform your business. From ERP systems to AI agents, we
            synchronize technology with your vision.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="relative bg-accent text-base font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-xl group"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-foreground/20" />
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              variant="outline"
              className="relative border-2 border-accent text-accent text-base font-semibold hover:bg-accent hover:text-white transition-all duration-200 hover:shadow-lg"
            >
              View Services
              <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent/20" />
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: 50, suffix: "+", label: "Projects" },
              { value: 30, suffix: "+", label: "Clients" },
              { value: 5, suffix: "+", label: "Years" },
              { value: 100, suffix: "%", label: "Success" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="text-3xl font-bold text-accent">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                <span className="absolute -right-1 -top-1 h-2 w-2 bg-accent/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
