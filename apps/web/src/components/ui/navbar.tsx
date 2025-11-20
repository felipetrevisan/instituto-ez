import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Menu, X } from 'lucide-react'
import { type HTMLMotionProps, motion } from 'motion/react'
import type React from 'react'

const navbarVariants = cva('h-auto w-full p-2', {
  variants: {
    theme: {
      default:
        'md:*:data-[slot=header-container]:container md:*:data-[slot=header-container]:max-w-8xl',
      landing: 'md:*:data-[slot=header-container]:px-20',
    },
    sticky: {
      true: 'fixed start-0 top-0 z-90',
    },
    rounded: {
      none: 'rounded-none',
      full: 'rounded-full',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    theme: 'default',
    sticky: false,
    rounded: 'none',
  },
})

function Root({
  className,
  sticky,
  rounded,
  theme,
  children,
  ...props
}: HTMLMotionProps<'div'> & VariantProps<typeof navbarVariants> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={cn(navbarVariants({ theme, sticky, rounded, className }))}
      initial={false}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between" data-slot="header-container">
        {children}
      </div>
    </motion.div>
  )
}

const navbarBrandVariants = cva('flex items-center', {
  variants: {
    theme: {
      default: '[&_p]:text-primary',
      landing: '[&_p]:text-accent',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

function Brand({
  className,
  asChild = false,
  theme,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof navbarBrandVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return <Comp className={cn(navbarBrandVariants({ theme }), className)} {...props} />
}

function Toggle({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleMenu, isMenuOpen } = useApp()

  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full text-sm lg:hidden',
        className,
      )}
      {...props}
      onClick={() => toggleMenu()}
    >
      {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  )
}

export { Root, Brand, Toggle }
