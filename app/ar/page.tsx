import type { Metadata } from "next"
import { Site } from "@/components/site"

export const metadata: Metadata = {
  title: "شارة — برمجيات تُطلَق",
  description: "شارة شركة برمجيات في قطر. نصمّم ونبني ونطلق تطبيقات الويب والجوال — بسعر ثابت، ملكية كاملة، ودعم بعد الإطلاق.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    title: "شارة — برمجيات تُطلَق",
    description: "صُنعت في قطر. ملكٌ لك.",
    url: "https://shara.qa/ar",
    siteName: "Shara",
    locale: "ar_QA",
    type: "website",
    images: ["/koba.png"],
  },
}

export default function HomeAr() {
  return <Site lang="ar" />
}
