'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <BaseSkeleton className="flex flex-col gap-10 items-start justify-start rounded-xl w-full h-64 lg:h-80 p-10 relative shadow-2xl">
      <BaseSkeleton className="h-10 w-60" />
      <BaseSkeleton className="h-10 w-40" />
    </BaseSkeleton>
  )
}
