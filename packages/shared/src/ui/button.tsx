import { cn } from '@ez/shared/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLMotionProps, type Transition, motion } from 'motion/react'
import React from 'react'

enum Size {
  default = 'default',
  sm = 'sm',
  lg = 'lg',
  xl = 'xl',
  '2xl' = 'xxl',
  full = 'full',
}

const buttonVariants = cva(
  'relative z-1 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'shadow-sm outline-none',
        outline: 'shadow-sm outline outline-2',
        ghost: 'border-none shadow-none outline-none',
        link: 'border-none bg-none shadow-none',
      },
      theme: {
        default:
          'bg-linear-to-r from-primary via-primary/80 to-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-linear-to-r from-secondary via-secondary/80 to-secondary text-secondary-foreground hover:bg-secondary/90',
        tertiary:
          'bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground hover:bg-tertiary/90',
        custom: ''
      },
      size: {
        sm: 'h-8 px-3 text-xs sm:text-sm',
        default: 'h-9 px-4 text-sm sm:text-base',
        lg: 'h-11 px-6 text-base sm:text-lg',
        xl: 'h-14 px-8 text-lg sm:text-xl md:text-base',
        '2xl': 'h-16 px-10 text-lg sm:text-2xl',
      },
      rounded: {
        none: 'rounded-none',
        full: 'rounded-full',
        lg: 'rounded-lg',
        xl: 'rounded-2xl',
        '2xl': 'rounded-3xl',
      },
      shadow: {
        true: 'shadow-[0_4px_15px_0]',
        false: 'shadow-none',
      },
      effect: {
        pulse: 'transition-all duration-75 hover:bg-position-[100%_0]',
        none: 'transition-none',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      theme: 'default',
      size: 'default',
      rounded: 'none',
      effect: 'none',
      shadow: false,
      fullWidth: false,
    },
  },
)

const rippleVariants = cva('pointer-events-none absolute size-5 rounded-full', {
  variants: {
    theme: {
      default: 'bg-secondary',
      secondary: 'bg-tertiary',
      tertiary: 'bg-primary',
      custom: ''
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

type Ripple = { id: number; x: number; y: number }

type ButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
    rippleClassName?: string
    scale?: number
    transition?: Transition
    scaleEffect?: boolean
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      onClick,
      rippleClassName,
      variant,
      theme,
      size,
      rounded,
      effect,
      shadow,
      fullWidth,
      scale = 10,
      transition = { duration: 0.6, ease: 'easeOut' },
      scaleEffect = true,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const CompMotion = motion(Comp)
    const [ripples, setRipples] = React.useState<Ripple[]>([])

    const localRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => localRef.current as HTMLButtonElement)

    const createRipple = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = localRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const id = Date.now()
      setRipples((prev) => [...prev, { id, x, y }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    }, [])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event)
      onClick?.(event)
    }

    return (
      <CompMotion
        ref={localRef}
        data-slot="button"
        data-size={Size[size as keyof typeof Size] || Size.full}
        whileHover={{ scale: scaleEffect ? 1.05 : 1 }}
        whileTap={{ scale: scaleEffect ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        className={cn(
          buttonVariants({ variant, theme, size, rounded, effect, shadow, fullWidth }),
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale, opacity: 0 }}
            transition={transition}
            className={cn(rippleVariants({ theme }), rippleClassName)}
            style={{ top: r.y - 10, left: r.x - 10 }}
          />
        ))}
      </CompMotion>
    )
  },
)

export { Button, buttonVariants }
