'use client'

import { cn } from '@ez/shared/lib/utils'
import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton({ className }: Partial<HTMLDivElement>) {
  return (
    <div className='relative flex h-[362px] w-full justify-between'>
      <BaseSkeleton
        className={cn(
          'flex h-[362px] w-full justify-center overflow-hidden rounded-lg lg:w-2/3',
          className,
        )}
      />
    </div>
  )
}
