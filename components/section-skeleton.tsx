"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-background min-h-screen flex items-center">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-16 w-1/2 mx-auto mb-6" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-10" />

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSkeleton() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSkeleton() {
  return (
    <section className="border-b border-border/40 bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  )
}
