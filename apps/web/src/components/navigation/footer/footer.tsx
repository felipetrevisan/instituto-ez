'use client'

import { cn } from '@ez/shared/lib/utils'
import { type HTMLMotionProps, motion } from 'motion/react'

export const FooterNavigation = ({ className, children }: HTMLMotionProps<'footer'>) => {
  return (
    <motion.footer className={cn('bg-primary py-16 text-primary-foreground', className)}>
      {children}
    </motion.footer>
  )
}
