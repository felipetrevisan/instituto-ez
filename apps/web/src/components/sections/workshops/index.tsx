'use client'

import { useWorkshop } from '@ez/web/hooks/use-workshop'
import { motion } from 'motion/react'
import { WorkshopCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Workshops() {
  const { data, isLoading } = useWorkshop()

  return (
    <motion.div layout className="flex flex-col space-y-12">
      <div className='flex h-full flex-col flex-wrap items-center justify-center gap-16 md:flex-row'>
        {isLoading && <Skeleton />}
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  )
}
