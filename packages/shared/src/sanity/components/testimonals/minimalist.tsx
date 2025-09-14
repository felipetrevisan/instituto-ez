'use client'

import { cn } from '@ez/shared/lib/utils'
import type { Testimonial } from '@ez/shared/types/testimonial'
import { Card, CardContent, type cardVariants } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import { PortableText } from '@portabletext/react'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'

import './styles.css'

const MotionCard = motion(Card)

type CardVariants = VariantProps<typeof cardVariants>

type Props = {
  item: Testimonial
  theme?: CardVariants['theme']
  variant?: CardVariants['variant']
  rounded?: CardVariants['rounded']
  className?: string
}

export function TestimonialMinimalist({ item, theme, variant, rounded, className }: Props) {
  return (
    <MotionCard
      className={cn(
        'group relative h-[400px] max-h-[400px] cursor-pointer select-none overflow-visible p-1 transition-all xl:h-[300px] xl:max-h-[300px]',
        className,
      )}
      data-theme={theme}
      data-variant={variant}
      rounded={rounded}
      theme={theme}
      variant={variant}
    >
      <CardContent className="flex h-full w-full items-center justify-center p-0">
        <div className="relative flex h-full w-full flex-col items-center justify-evenly border-0 px-8 py-0">
          <ScrollArea className="relative mx-auto h-[300px] w-full max-w-2xl overflow-auto text-justify md:h-[250px]">
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
