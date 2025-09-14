'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card, CardContent, type cardVariants } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import type { Testimonial } from '@ez/web/types/testimonial'
import { PortableText } from '@portabletext/react'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'

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
      animate={{
        filter: isBlurred ? 'blur(10px)' : 'blur(0px)',
        opacity: isBlurred ? 0.5 : 1,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      className={cn(
        'group relative h-[400px] max-h-[400px] cursor-pointer select-none overflow-visible p-1 transition-all xl:h-[300px] xl:max-h-[300px]',
      )}
      data-theme={theme}
      data-variant={variant}
      onHoverEnd={() => setHoveredIndexAction(null)}
      onHoverStart={() => setHoveredIndexAction(item.id)}
      rounded={rounded}
      theme={theme}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      variant={variant}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
    >
      <CardContent className="flex h-full w-ful items-center justify-center p-0">
        <div className="relative flex h-full w-full flex-col items-center justify-evenly border-0 px-8 py-0">
          <ScrollArea className="-top-[30px] relative mx-auto mb-4 h-3/4 w-full max-w-2xl text-justify md:top-0 lg:mb-8">
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
