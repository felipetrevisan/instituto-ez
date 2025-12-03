'use client'

import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { type HTMLMotionProps, motion } from 'motion/react'

export const HeaderLandingNavigation = ({
  className,
  children,
}: HTMLMotionProps<'header'> & { currentScrollY?: number }) => {
  const { isMenuOpen } = useApp()

  return (
    <motion.header
      className={cn(
        'fixed top-0 z-90 h-24 w-full border-border/50 border-b bg-background/60 backdrop-blur-sm',
        className,
      )}
      {...(isMenuOpen && { 'data-menu-open': true })}
    >
      {children}
    </motion.header>
  )
}
