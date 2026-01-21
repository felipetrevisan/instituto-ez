'use client'

import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { useBodyOverflow } from '@ez/web/hooks/use-body-overflow'
import { type HTMLMotionProps, motion } from 'motion/react'

export const HeaderNavigation = ({
  currentScrollY,
  className,
  children,
}: HTMLMotionProps<'header'> & { currentScrollY?: number }) => {
  const { isMenuOpen, isNormalPage } = useApp()
  useBodyOverflow(isMenuOpen)

  return (
    <motion.header
      className={cn(
        'h-20 w-full bg-primary backdrop-blur-md',
        {
          'bg-primary/90 shadow-md backdrop-blur-3xl dark:bg-accent/90':
            currentScrollY !== undefined && currentScrollY > 80,
          'backdrop-blur-none': currentScrollY !== undefined && currentScrollY < 80,
          'fixed top-0 z-90': isNormalPage(),
        },
        className,
      )}
      {...(isMenuOpen && { 'data-menu-open': true })}
    >
      {children}
    </motion.header>
  )
}
