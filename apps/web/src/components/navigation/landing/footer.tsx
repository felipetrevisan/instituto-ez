'use client'

import { cn } from '@ez/shared/lib/utils'
import { type HTMLMotionProps, motion } from 'motion/react'

export const FooterLandingNavigation = ({ className, children }: HTMLMotionProps<'footer'>) => {
  return (
    <motion.footer className={cn('bg-footer py-16 text-footer-foreground', className)}>
      {children}
    </motion.footer>
  )
}
