'use client'

import { cn } from '@ez/shared/lib/utils'
import type { Testimonial } from '@ez/shared/types/testimonial'
import { Card, CardContent, type cardVariants } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import { PortableText } from '@portabletext/react'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

import './styles.css'

const MotionCard = motion(Card)

type CardVariants = VariantProps<typeof cardVariants>

type Props = {
  item: Testimonial
  hoveredIndex: string | null
  setHoveredIndexAction: (id: string | null) => void
  theme?: CardVariants['theme']
  variant?: CardVariants['variant']
  rounded?: CardVariants['rounded']
}

export function TestimonialAnimated({
  item,
  hoveredIndex,
  setHoveredIndexAction,
  theme,
  variant,
  rounded,
}: Props) {
  const isBlurred = hoveredIndex !== null && hoveredIndex !== item.id

  return (
    <MotionCard
      className={cn(
        'group relative h-[400px] max-h-[400px] cursor-pointer select-none overflow-visible p-1 transition-all xl:h-[300px] xl:max-h-[300px]',
      )}
      variant={variant}
      theme={theme}
      rounded={rounded}
      data-theme={theme}
      data-variant={variant}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onHoverStart={() => setHoveredIndexAction(item.id)}
      onHoverEnd={() => setHoveredIndexAction(null)}
      animate={{
        filter: isBlurred ? 'blur(10px)' : 'blur(0px)',
        opacity: isBlurred ? 0.5 : 1,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
    >
      <CardContent className='flex h-full w-ful items-center justify-center p-0'>
        <div className='relative flex h-full w-full flex-col items-center justify-evenly border-0 px-8 py-0'>
          <ScrollArea className='relative mx-auto mb-4 h-3/4 w-full max-w-2xl text-justify lg:mb-8'>
            <PortableText value={item.testimonial} />
          </ScrollArea>
          <div className="author font-bold" data-slot="card-content-action">
            {item.author?.name}
          </div>
        </div>
      </CardContent>
    </MotionCard>
  )
}
