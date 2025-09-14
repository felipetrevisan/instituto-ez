import { cn } from '@ez/studio/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLMotionProps, motion, type Transition } from 'motion/react'
import React from 'react'

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
        default: 'max-w-fit px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        xl: 'h-14 px-6 text-md',
        '2xl': 'h-16 px-8 text-md',
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
        class: '--hover: ar(--primary-foreground)',
      },

      {
        effect: 'pulse',
        variant: 'default',
        theme: 'secondary',
        class: '--hover:var(--secondary)',
      },

      {
        effect: 'pulse',
        variant: 'default',
        theme: 'tertiary',
        class: '--hover:var(--tertiary)',
      },

      // Shadow
      // Default / Primary
      {
        shadow: true,
        variant: 'default',
        class:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      {
        shadow: true,
        variant: 'outline',
        class:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      {
        shadow: true,
        variant: 'ghost',
        class:
          'shadow-primary-foreground/40 transition-shadow duration-500 ease-in-out hover:shadow-primary-foreground',
      },
      // Secondary
      {
        shadow: true,
        theme: 'secondary',
        variant: 'default',
        class:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      {
        shadow: true,
        theme: 'secondary',
        variant: 'outline',
        class:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      {
        shadow: true,
        theme: 'secondary',
        variant: 'ghost',
        class:
          'shadow-secondary/40 transition-shadow duration-500 ease-in-out hover:shadow-secondary',
      },
      // Tertiary
      {
        shadow: true,
        theme: 'secondary',
        variant: 'default',
        class:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },
      {
        shadow: true,
        theme: 'tertiary',
        variant: 'outline',
        class:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },
      {
        shadow: true,
        theme: 'tertiary',
        variant: 'ghost',
        class:
          'shadow-tertiary/40 transition-shadow duration-500 ease-in-out hover:shadow-tertiary',
      },

      // Outline
      {
        variant: 'outline',
        class: 'bg-transparent text-primary',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        class: 'bg-transparent text-secondary',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        class: 'bg-transparent text-tertiary',
      },

      {
        variant: 'ghost',
        class: 'bg-transparent text-primary',
      },
      {
        variant: 'ghost',
        theme: 'secondary',
        class: 'bg-transparent text-secondary',
      },
      {
        variant: 'ghost',
        theme: 'tertiary',
        class: 'bg-transparent text-tertiary',
      },

      {
        variant: 'link',
        theme: 'default',
        class: '!shadow-none bg-transparent text-primary',
      },
      {
        variant: 'link',
        theme: 'secondary',
        class: '!shadow-none bg-transparent text-secondary',
      },
      {
        variant: 'link',
        theme: 'tertiary',
        class: '!shadow-none bg-transparent text-tertiary',
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
      data-slot="button"
      onClick={handleClick}
      ref={ref}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      whileHover={{ scale: scaleEffect ? 1.1 : 1 }}
      whileTap={{ scale: scaleEffect ? 0.9 : 1 }}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          animate={{ scale, opacity: 0 }}
          className={cn(rippleVariants({ variant, theme }), rippleClassName)}
          initial={{ scale: 0, opacity: 0.5 }}
          key={r.id}
          style={{ top: r.y - 10, left: r.x - 10 }}
          transition={transition}
        />
      ))}
    </CompMotion>
  )
}

export { Button, buttonVariants }
