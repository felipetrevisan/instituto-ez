'use client'

import { useWorkshop } from '@ez/web/hooks/use-workshop'
import { motion } from 'motion/react'
import { WorkshopCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Workshops() {
  const { data, isLoading } = useWorkshop()

  return (
    <motion.div layout className="flex flex-col">
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading && <Skeleton />}
        {data?.map((item) => (
          <div className="w-[300px] flex-none" key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
