'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card, CardContent } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import type { Chapter } from '@ez/web/types/ebook'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

type Props = {
  item: Chapter
  id: number
}

export function ChapterCard({ item, id }: Props) {
  return (
    <MotionCard
      className={cn(
        'group relative h-[300px] max-h-[300px] cursor-pointer select-none overflow-visible border-[var(--primary-c)] p-1 shadow-[var(--primary-c)] transition-all xl:h-[300px] xl:max-h-[300px]',
      )}
      variant="custom"
      theme="custom"
    >
      <CardContent className="flex h-full w-ful items-center justify-center p-0">
        <div className='-top-4 absolute left-0 size-8 rounded-full bg-[var(--primary-c)] p-4 font-extralight text-white'>
          {id}
        </div>
        <div className="relative flex h-full w-full flex-col items-center justify-evenly border-0 px-8 py-0">
          <ScrollArea className="relative mx-auto mb-4 h-3/4 w-full max-w-2xl text-justify lg:mb-8">
            {item.text}
          </ScrollArea>
        </div>
      </CardContent>
    </MotionCard>
  )
}
