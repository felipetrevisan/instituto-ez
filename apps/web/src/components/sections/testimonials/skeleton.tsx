'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <div className="flex flex-row gap-4">
      <BaseSkeleton className="basis-full lg:basis-1/2 h-[300px] max-h-[300px]" />
      <BaseSkeleton className="hidden lg:flex basis-full lg:basis-1/2 h-[300px] max-h-[300px]" />
      <BaseSkeleton className="hidden lg:flex basis-full lg:basis-1/2 h-[300px] max-h-[300px]" />
    </div>
  )
}
