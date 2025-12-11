"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

const projects = [
  {
    id: "ounass",
    url: "https://www.ounass.qa/",
    logo: "/logos/Ounass-logo.png",
    bgColor: "bg-white",
    logoSize: "max-h-28",
  },
  {
    id: "namshi",
    url: "https://www.namshi.com/",
    logo: "/logos/namshi.png",
    bgColor: "bg-white",
    logoSize: "max-h-28",
  },
  {
    id: "dasparfum",
    url: "https://www.dasparfum-beauty.com/",
    logo: "/logos/das perfume.webp",
    bgColor: "bg-white",
    logoSize: "max-h-16",
  },
  {
    id: "flaconi",
    url: "https://www.flaconi.de/",
    logo: "/logos/Flaconi-logo.png",
    bgColor: "bg-white",
    logoSize: "max-h-16",
  },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  return (
    <section
      id="portfolio"
      className="relative border-b border-border/40 bg-muted/30 py-24 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating 3D Cubes */}
        <div className="absolute top-20 left-[10%] w-16 h-16 opacity-20" style={{ animation: 'float3d1 12s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20" style={{ transform: 'rotateX(45deg) rotateY(45deg)' }} />
        </div>
        <div className="absolute top-40 right-[15%] w-20 h-20 opacity-15" style={{ animation: 'float3d2 15s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#87c66b]/40 to-[#87c66b]/10 border border-[#87c66b]/20" style={{ transform: 'rotateX(-30deg) rotateY(60deg)' }} />
        </div>
        <div className="absolute bottom-32 left-[20%] w-12 h-12 opacity-25" style={{ animation: 'float3d3 10s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#3ea0d6]/40 to-[#3ea0d6]/10 border border-[#3ea0d6]/20" style={{ transform: 'rotateX(60deg) rotateY(-45deg)' }} />
        </div>
        <div className="absolute bottom-20 right-[25%] w-24 h-24 opacity-10" style={{ animation: 'float3d4 18s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary/30 to-[#87c66b]/10 border border-primary/10" style={{ transform: 'rotateX(-45deg) rotateY(30deg)' }} />
        </div>

        {/* Floating Rings */}
        <div className="absolute top-1/3 left-[5%] w-32 h-32 opacity-10" style={{ animation: 'spinRing1 20s linear infinite' }}>
          <div className="w-full h-full rounded-full border-4 border-dashed border-primary/30" style={{ transform: 'rotateX(70deg)' }} />
        </div>
        <div className="absolute bottom-1/4 right-[8%] w-40 h-40 opacity-10" style={{ animation: 'spinRing2 25s linear infinite reverse' }}>
          <div className="w-full h-full rounded-full border-4 border-dashed border-[#3ea0d6]/30" style={{ transform: 'rotateX(60deg)' }} />
        </div>

        {/* Gradient Orbs with depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" style={{ animation: 'pulse3d 8s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float3d1 {
          0%, 100% { transform: translateY(0) translateZ(0) rotateX(0deg); }
          25% { transform: translateY(-20px) translateZ(30px) rotateX(15deg); }
          50% { transform: translateY(-10px) translateZ(50px) rotateX(0deg); }
          75% { transform: translateY(-25px) translateZ(20px) rotateX(-10deg); }
        }
        @keyframes float3d2 {
          0%, 100% { transform: translateY(0) translateZ(0) rotateY(0deg); }
          33% { transform: translateY(-30px) translateZ(40px) rotateY(20deg); }
          66% { transform: translateY(-15px) translateZ(60px) rotateY(-15deg); }
        }
        @keyframes float3d3 {
          0%, 100% { transform: translateY(0) translateX(0) rotateZ(0deg); }
          50% { transform: translateY(-20px) translateX(20px) rotateZ(180deg); }
        }
        @keyframes float3d4 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.1); }
        }
        @keyframes spinRing1 {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes spinRing2 {
          from { transform: rotateX(60deg) rotateZ(0deg); }
          to { transform: rotateX(60deg) rotateZ(360deg); }
        }
        @keyframes pulse3d {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.15; }
        }
      `}</style>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </div>
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance ${isRTL ? "leading-relaxed" : ""}`}>
            {t("title1")}
            <br />
            <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
          </p>
        </div>

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 ${isRTL ? "direction-rtl" : ""}`} style={isRTL ? { direction: 'rtl' } : undefined}>
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 ${project.bgColor}`}
            >
              {/* Logo Container */}
              <div className="aspect-[4/3] flex items-center justify-center p-6">
                <img
                  src={project.logo}
                  alt={t(`projects.${project.id}.name`)}
                  className={`${project.logoSize} max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              {/* Info Bar */}
              <div className={`p-4 border-t border-border/20 ${project.bgColor === "bg-white" ? "bg-gray-50" : "bg-white/10"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${project.bgColor === "bg-white" ? "text-foreground" : "text-white"}`}>
                      {t(`projects.${project.id}.name`)}
                    </h3>
                    <p className={`text-xs ${project.bgColor === "bg-white" ? "text-muted-foreground" : "text-white/70"}`}>
                      {t(`projects.${project.id}.tag`)}
                    </p>
                  </div>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${project.bgColor === "bg-white" ? "bg-primary/10 group-hover:bg-primary/20" : "bg-white/20 group-hover:bg-white/30"}`}>
                    <ExternalLink className={`h-4 w-4 ${project.bgColor === "bg-white" ? "text-primary" : "text-white"}`} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
