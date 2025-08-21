'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <BaseSkeleton className="relative flex h-64 w-full flex-col items-start justify-start gap-10 rounded-xl p-10 shadow-2xl lg:h-80">
      <BaseSkeleton className="h-10 w-60" />
      <BaseSkeleton className="h-10 w-40" />
    </BaseSkeleton>
  )
}
