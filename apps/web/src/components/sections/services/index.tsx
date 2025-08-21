'use client'

import { useServices } from '@ez/web/hooks/use-services'
import { motion } from 'motion/react'
import { ServiceCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Services() {
  const { data, isLoading } = useServices()

  return (
    <motion.div layout className="flex flex-col gap-10 space-y-12">
      <div className="flex h-full flex-col flex-wrap items-center justify-center gap-16 md:flex-row">
        {isLoading && <Skeleton />}
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  )
}
