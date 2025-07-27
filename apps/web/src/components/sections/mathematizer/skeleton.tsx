'use client'

import { cn } from '@ez/shared/lib/utils'
import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton({ className }: Partial<HTMLDivElement>) {
  return (
    <div className="relative flex justify-between w-full h-[362px]">
      <BaseSkeleton
        className={cn(
          'flex justify-center w-full lg:w-2/3 h-[362px] overflow-hidden rounded-lg',
          className,
        )}
      />
    </div>
  )
}
