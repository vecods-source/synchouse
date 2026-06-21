import { MaintenancePlanPage, PLAN_SLUGS } from "@/components/maintenance-plan"

export function generateStaticParams() {
  return PLAN_SLUGS.map((plan) => ({ plan }))
}

export default async function Page({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params
  return <MaintenancePlanPage lang="ar" plan={plan} />
}
