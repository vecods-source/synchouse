"use client"

import { useTranslations } from "next-intl"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

export function AboutSection() {
  const t = useTranslations("bento")

  const gridItems = [
    {
      id: 2,
      title: t("items.global.title"),
      description: t("items.global.description"),
      className: "md:col-span-3 md:row-span-2 md:min-h-[40vh]",
      imgClassName: "",
      titleClassName: "justify-start items-start",
      img: "",
      spareImg: "",
    },
    {
      id: 5,
      title: t("items.innovation.title"),
      description: t("items.innovation.description"),
      className: "md:col-span-3 md:row-span-2 md:min-h-[40vh]",
      imgClassName: "absolute right-0 bottom-0 w-32 md:w-96 opacity-50 md:opacity-100",
      titleClassName: "justify-start items-start",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: t("items.cta.title"),
      description: "",
      className: "md:col-span-6 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 md:px-6">
      <BentoGrid>
        {gridItems.map((item) => (
          <BentoGridItem key={item.id} {...item} />
        ))}
      </BentoGrid>
    </section>
  )
}
