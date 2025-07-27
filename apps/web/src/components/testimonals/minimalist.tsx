'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card, CardContent, type cardVariants } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import type { Testimonial } from '@ez/web/types/testimonial'
import { PortableText } from '@portabletext/react'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

import './styles.css'

const MotionCard = motion(Card)

type CardVariants = VariantProps<typeof cardVariants>

type Props = {
  item: Testimonial
  theme?: CardVariants['theme']
  variant?: CardVariants['variant']
  rounded?: CardVariants['rounded']
}

export function TestimonialMinimalist({ item, theme, variant, rounded }: Props) {
  return (
    <MotionCard
      className={cn(
        'overflow-visible h-[400px] max-h-[400px] xl:h-[300px] xl:max-h-[300px] group relative select-none cursor-pointer p-1 transition-all',
      )}
      variant={variant}
      theme={theme}
      rounded={rounded}
      data-theme={theme}
      data-variant={variant}
    >
      <CardContent className="flex items-center justify-center w-full p-0 h-full">
        <div className="relative flex flex-col items-center justify-evenly w-full h-full border-0 py-0 px-8">
          <ScrollArea className="overflow-scroll h-[300px] md:h-[250px] max-w-2xl mx-auto text-justify relative w-full">
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
