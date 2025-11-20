'use client'

import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { type HTMLMotionProps, motion } from 'motion/react'

export const HeaderLandingNavigation = ({
  currentScrollY,
  className,
  children,
}: HTMLMotionProps<'header'> & { currentScrollY?: number }) => {
  const { isMenuOpen } = useApp()

  return (
    <motion.header
      className={cn(
        'fixed top-0 z-90 h-24 w-full border-border/40 border-b bg-transparent backdrop-blur-md',
        {
          'bg-header/10 backdrop-blur-3xl': currentScrollY !== undefined && currentScrollY > 80,
          'backdrop-blur-none': currentScrollY !== undefined && currentScrollY < 80,
        },
        className,
      )}
      {...(isMenuOpen && { 'data-menu-open': true })}
    >
      {children}
    </motion.header>
  )
}
