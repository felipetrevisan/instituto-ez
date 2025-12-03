'use client'

import { useWorkshop } from '@ez/web/hooks/use-workshop'
import { motion } from 'motion/react'
import { WorkshopCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Workshops() {
  const { data, isLoading } = useWorkshop()

  return (
    <motion.div className="flex flex-col" layout>
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading && <Skeleton />}
        {data?.map((item) => (
          <div className="w-[300px] flex-none md:w-[298px] xl:w-[300px]" key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
