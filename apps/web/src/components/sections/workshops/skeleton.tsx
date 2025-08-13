'use client'

import { Skeleton as BaseSkeleton } from '@ez/shared/ui/skeleton'

export function Skeleton() {
  return (
    <>
      <BaseSkeleton className='h-96 w-80' />
      <BaseSkeleton className='h-96 w-80' />
      <BaseSkeleton className='h-96 w-80' />
    </>
  )
}
