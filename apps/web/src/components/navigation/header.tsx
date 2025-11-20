'use client'

import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { type HTMLMotionProps, motion } from 'motion/react'
import { useEffect } from 'react'

export const HeaderNavigation = ({
  currentScrollY,
  className,
  children,
}: HTMLMotionProps<'header'> & { currentScrollY?: number }) => {
  const { isMenuOpen, isNormalPage } = useApp()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <motion.header
      className={cn(
        'h-20 w-full bg-transparent backdrop-blur-md',
        {
          'bg-white/90 shadow-md backdrop-blur-3xl dark:bg-accent/90':
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
