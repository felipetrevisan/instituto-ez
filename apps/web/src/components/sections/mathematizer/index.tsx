'use client'

import { useMathematizer } from '@ez/web/hooks/use-mathematizer'
import { MathematizerCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Mathematizer() {
  const { data, isLoading } = useMathematizer()

  return (
    <div className="flex flex-col">
      {isLoading && (
        <>
          <Skeleton className="lg:absolute lg:left-0" />
          <Skeleton className="lg:absolute lg:right-0" />
        </>
      )}
      {data?.map((item, index) => (
        <Card key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
