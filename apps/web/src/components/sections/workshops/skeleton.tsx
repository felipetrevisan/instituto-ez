'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <>
      <BaseSkeleton className="w-80 h-96" />
      <BaseSkeleton className="w-80 h-96" />
      <BaseSkeleton className="w-80 h-96" />
    </>
  )
}
