import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLMotionProps, type MotionValue, motion } from 'motion/react'
import type React from 'react'

const navbarVariants = cva('h-auto w-full p-2', {
  variants: {
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
    sticky: false,
    rounded: 'none',
  },
})

function Root({
  className,
  sticky,
  rounded,
  children,
  ...props
}: HTMLMotionProps<'div'> & VariantProps<typeof navbarVariants> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={cn(navbarVariants({ sticky, rounded, className }))}
      initial={false}
      {...props}
    >
      <div className='mx-auto flex flex-wrap items-center justify-between lg:container'>
        {children}
      </div>
    </motion.div>
  )
}

function Brand({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return <Comp className={cn('flex items-center', className)} {...props} />
}

const Path = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    strokeWidth="3"
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

function Toggle({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleMenu } = useApp()

  return (
    <button
      className={cn(
        'absolute top-6 right-5 z-100 flex size-12 cursor-pointer items-center justify-center rounded-full text-sm lg:hidden',
        className,
      )}
      {...props}
      onClick={() => toggleMenu()}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  )
}

function Background({
  className,
  size,
  ...props
}: HTMLMotionProps<'div'> & { size: MotionValue<string> }) {
  return (
    <motion.div
      className={cn(
        'absolute top-0 right-0 bottom-0 flex h-screen w-7/12 justify-center border-secondary border-l-4 bg-accent shadow-xl backdrop-blur-xl md:hidden md:w-9/12',
        className,
      )}
      {...props}
    />
  )
}

export { Root, Brand, Background, Toggle }
