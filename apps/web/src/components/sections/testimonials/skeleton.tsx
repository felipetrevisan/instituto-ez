'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <div className="flex flex-row gap-4">
      <BaseSkeleton className='h-[300px] max-h-[300px] basis-full lg:basis-1/2' />
      <BaseSkeleton className='hidden h-[300px] max-h-[300px] basis-full lg:flex lg:basis-1/2' />
      <BaseSkeleton className='hidden h-[300px] max-h-[300px] basis-full lg:flex lg:basis-1/2' />
    </div>
  )
}
