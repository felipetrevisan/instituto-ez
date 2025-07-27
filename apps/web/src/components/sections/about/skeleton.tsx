'use client'

import { cn } from '@ez/shared/lib/utils'
import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton({ className }: { className?: string }) {
  return <BaseSkeleton className={cn('relative w-full rounded-2xl', className)} />
}
