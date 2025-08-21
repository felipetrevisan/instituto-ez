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
  'relative z-1 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
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
          'bg-linear-to-r from-primary via-primary/80 to-primary text-primary-foreground outline-primary-foreground/40 hover:bg-primary-foreground hover:text-primary-foreground',
        secondary:
          'bg-linear-to-r from-secondary via-secondary/80 to-secondary text-secondary-foreground outline-secondary-foreground/40 hover:bg-secondary/30 hover:text-secondary-foreground',
        tertiary:
          'bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground outline-tertiary/40 hover:border-tertiary/40 hover:bg-tertiary/30 hover:text-tertiary-foreground',
      },
      size: {
        default: 'max-w-fit px-4 py-2 text-md',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-10 px-8 text-sm md:text-md',
        xl: 'h-14 px-6 text-md md:text-lg',
        '2xl': 'h-16 px-8 text-md md:text-lg',
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
    compoundVariants: [
      {
        effect: 'pulse',
        variant: 'default',
        className: '--hover: var(--primary-foreground)',
      },

      {
        effect: 'pulse',
        variant: 'default',
        theme: 'secondary',
        className: '--hover: var(--secondary)',
      },

      {
        effect: 'pulse',
        variant: 'default',
        theme: 'tertiary',
        className: '--hover: var(--tertiary)',
      },

      // Shadow
      // Default / Primary
      {
        shadow: true,
        variant: 'default',
        className:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      {
        shadow: true,
        variant: 'outline',
        className:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      {
        shadow: true,
        variant: 'ghost',
        className:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      // Secondary
      {
        shadow: true,
        theme: 'secondary',
        variant: 'default',
        className:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      {
        shadow: true,
        theme: 'secondary',
        variant: 'outline',
        className:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      {
        shadow: true,
        theme: 'secondary',
        variant: 'ghost',
        className:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      // Tertiary
      {
        shadow: true,
        theme: 'secondary',
        variant: 'default',
        className:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },
      {
        shadow: true,
        theme: 'tertiary',
        variant: 'outline',
        className:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },
      {
        shadow: true,
        theme: 'tertiary',
        variant: 'ghost',
        className:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },

      // Outline
      {
        variant: 'outline',
        className: 'bg-transparent text-primary',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className: 'bg-transparent text-secondary',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className: 'bg-transparent text-tertiary',
      },

      {
        variant: 'ghost',
        className: 'bg-transparent text-primary hover:bg-primary',
      },
      {
        variant: 'ghost',
        theme: 'secondary',
        className: 'bg-transparent text-secondary hover:bg-secondary',
      },
      {
        variant: 'ghost',
        theme: 'tertiary',
        className: 'bg-transparent text-tertiary hover:bg-tertiary',
      },

      {
        variant: 'link',
        theme: 'default',
        className: '!shadow-none bg-transparent text-primary',
      },
      {
        variant: 'link',
        theme: 'secondary',
        className: '!shadow-none bg-transparent text-secondary',
      },
      {
        variant: 'link',
        theme: 'tertiary',
        className: '!shadow-none bg-transparent text-tertiary',
      },
    ],
  },
)

const rippleVariants = cva('pointer-events-none absolute size-5 rounded-full', {
  variants: {
    variant: {
      default: 'shadow-sm outline outline-2',
      outline: 'shadow-sm outline outline-2',
      ghost: 'border-none shadow-none outline-none',
      link: 'border-none bg-none shadow-none',
      icon: 'outline outline-2',
    },
    theme: {
      default: 'bg-secondary',
      secondary: 'bg-tertiary',
      tertiary: 'bg-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
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
    ref?: React.RefObject<HTMLButtonElement>
  }

function Button({
  ref,
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
}: ButtonProps) {
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

    const isSubmitButton = (props.type ?? 'button') === 'submit'

    if (isSubmitButton) {
      onClick?.(event)
    } else {
      setTimeout(() => onClick?.(event), 600)
    }
  }

  return (
    <CompMotion
      ref={ref}
      data-slot="button"
      data-size={Size[size as keyof typeof Size] || Size.full}
      whileHover={{ scale: scaleEffect ? 1.1 : 1 }}
      whileTap={{ scale: scaleEffect ? 0.9 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      animate={{ transition: { duration: 0.4, ease: 'easeInOut' } }}
      className={cn(
        buttonVariants({
          variant,
          theme,
          size,
          rounded,
          effect,
          shadow,
          fullWidth,
        }),
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
          className={cn(rippleVariants({ variant, theme }), rippleClassName)}
          style={{ top: r.y - 10, left: r.x - 10 }}
        />
      ))}
    </CompMotion>
  )
}

export { Button, buttonVariants }
