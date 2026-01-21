"use client";

import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Target, Eye, Users, Sparkles, Lock } from "lucide-react";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { motion } from "framer-motion";

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);

  const values = [
    { icon: Target, title: t("about.values.mission.title"), description: t("about.values.mission.description") },
    { icon: Eye, title: t("about.values.vision.title"), description: t("about.values.vision.description") },
    { icon: Users, title: t("about.values.team.title"), description: t("about.values.team.description") },
    { icon: Sparkles, title: t("about.values.innovation.title"), description: t("about.values.innovation.description") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const slideInFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href={`/${locale}`}
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors`}
          >
            {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {t("legal.backHome")}
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="mb-6 inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
              {t("about.badge")}
            </div>
            <h1 className="mb-6">
              {t("about.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("about.description")}
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 p-8 bg-card/50 rounded-2xl border border-border/30"
          >
            <h2 className="mb-4">
              {t("about.story.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("about.story.content")}
            </p>
          </motion.div>

          {/* Security & Encryption Section */}
          <div className="flex flex-row relative items-center justify-center h-[600px] md:h-[700px] w-full mb-16 rounded-2xl overflow-hidden">
            {/* Title Section */}
            <div className="absolute w-auto h-auto top-8 z-[5]">
              <motion.div
                variants={slideInFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                {t("about.commitment.title1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                  &
                </span>{" "}
                {t("about.commitment.title2")}
              </motion.div>
            </div>

            {/* Lock Icon Section */}
            <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
              <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
                <Image
                  src="/lock-top.png"
                  alt="Lock top"
                  width={50}
                  height={50}
                  className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
                />
                <Image
                  src="/lock-main.png"
                  alt="Lock main"
                  width={70}
                  height={70}
                  className="z-10"
                />
              </div>

              {/* Encryption Badge */}
              <div className="px-[15px] py-[4px] z-[20] border my-[20px] border-accent/50 opacity-[0.9] rounded-full bg-accent/10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-accent">{t("about.commitment.badge")}</span>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="absolute z-[20] bottom-8 px-[5px]">
              <p className="font-medium text-center text-muted-foreground">
                {t("about.commitment.description")}
              </p>
            </div>

            {/* Video Background */}
            <video
              loop
              muted
              autoPlay
              playsInline
              preload="false"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/encryption-bg.webm" type="video/webm" />
            </video>
          </div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="mb-8 text-center">
              {t("about.valuesTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`group p-6 bg-card/30 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 ${isRTL ? "text-right" : ""}`}
                >
                  <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 group-hover:text-accent transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Locations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="mb-6 text-center">
              {t("about.locations.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card/30 keep-card rounded-xl border border-border/30 text-center">
                <div className="text-3xl mb-3">🇶🇦</div>
                <h3 className="mb-1">{t("about.locations.doha")}</h3>
                <p className="text-muted-foreground">{t("about.locations.dohaDesc")}</p>
              </div>
              <div className="p-6 bg-card/30 keep-card rounded-xl border border-border/30 text-center">
                <div className="text-3xl mb-3">🇩🇪</div>
                <h3 className="mb-1">{t("about.locations.berlin")}</h3>
                <p className="text-muted-foreground">{t("about.locations.berlinDesc")}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 keep-card bg-secondary rounded-2xl text-center"
          >
            <h2 className="mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("about.cta.description")}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#008080_0%,#000080_50%,#008080_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center gap-2 rounded-lg bg-card px-8 text-sm font-medium text-foreground backdrop-blur-3xl">
                {t("about.cta.button")}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
