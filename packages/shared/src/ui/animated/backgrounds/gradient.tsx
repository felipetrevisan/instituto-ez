'use client'

import { type HTMLMotionProps, type Transition, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'

type GradientBackgroundProps = HTMLMotionProps<'div'> & {
  transition?: Transition
}

function GradientBackground({
  className,
  transition = { duration: 15, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY },
  ...props
}: GradientBackgroundProps) {
  return (
    <motion.div
      data-slot="gradient-background"
      className={cn(
        'size-full bg-[length:400%_400%] bg-gradient-to-br from-primary via-secondary to-tertiary',
        className,
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={transition}
      {...props}
    />
  )
}

export { GradientBackground, type GradientBackgroundProps }
