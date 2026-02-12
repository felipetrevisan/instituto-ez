import { cn } from '@ez/shared/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLMotionProps, motion, type Transition } from 'motion/react'
import React from 'react'

const buttonVariants = cva(
  // Base
  'relative z-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 font-semibold shadow-xl md:w-auto',
  {
    variants: {
      base: {
        default: '',
        mathematizer: 'glow-accent hover-lift whitespace-nowrap',
        'for-business': 'whitespace-nowrap',
        mentory: '',
        about: '',
        services: '',
        immersion: '',
        ebook: '',
      },

      variant: {
        default: '',
        outline: 'border bg-transparent outline',
        ghost: 'border-none bg-transparent shadow-none',
        link: 'border-none bg-transparent underline-offset-4 shadow-none hover:underline',
      },

      theme: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        accent: 'bg-accent text-accent-foreground',
        background: 'bg-foreground text-background',
        catalog: 'text-navy hover:bg-cyan/10 hover:text-cyan',
        coral: 'bg-coral text-coral-foreground',
        cyan: 'bg-cyan text-cyan-foreground',
        navy: 'bg-navy text-navy-foreground',
        custom: '',
      },

      size: {
        sm: 'h-9 px-3 text-xs sm:text-sm',
        default: 'h-11 px-4 text-sm sm:text-base',
        lg: 'h-12 px-6 text-base sm:text-lg',
        xl: 'h-14 px-8 text-lg sm:text-xl',
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
        true: 'shadow-[0_4px_15px_0] shadow-primary/20',
        false: '',
      },

      effect: {
        none: '',
        pulse: 'transition-all duration-75 hover:bg-position-[100%_0]',
        gradient: 'bg-transparent',
      },

      fullWidth: {
        true: 'w-full',
      },
    },

    defaultVariants: {
      base: 'default',
      variant: 'default',
      theme: 'default',
      size: 'default',
      effect: 'none',
      rounded: 'full',
      shadow: false,
      fullWidth: false,
    },

    compoundVariants: [
      {
        effect: 'gradient',
        theme: 'default',
        className: 'bg-gradient-to-r from-primary to-primary/70',
      },
      {
        effect: 'gradient',
        theme: 'secondary',
        className: 'bg-gradient-to-r from-secondary to-secondary/70',
      },
      {
        effect: 'gradient',
        theme: 'tertiary',
        className: 'bg-gradient-to-r from-tertiary to-tertiary/70',
      },
      {
        effect: 'gradient',
        theme: 'accent',
        className: 'bg-gradient-to-r from-accent to-accent/70',
      },

      // OUTLINE + theme
      {
        variant: 'outline',
        theme: 'background',
        className:
          'border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
      },
      {
        variant: 'outline',
        theme: 'default',
        className:
          'border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary hover:text-primary-foreground dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className:
          'border-secondary-foreground bg-transparent text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground dark:border-secondary dark:text-secondary',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className:
          'border-tertiary-foreground bg-transparent text-tertiary-foreground hover:bg-tertiary hover:text-tertiary-foreground dark:border-tertiary dark:text-tertiary',
      },
      {
        variant: 'outline',
        theme: 'coral',
        className:
          'border-coral bg-transparent text-coral hover:bg-coral hover:text-coral-foreground',
      },
      {
        variant: 'outline',
        theme: 'cyan',
        className: 'border-cyan bg-transparent text-cyan hover:bg-cyan hover:text-cyan-foreground',
      },
      {
        variant: 'outline',
        theme: 'navy',
        className: 'border-navy bg-transparent text-navy hover:bg-navy hover:text-navy-foreground',
      },

      {
        variant: 'outline',
        theme: 'accent',
        className:
          'border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground',
      },

      // Marca específica
      {
        base: 'mathematizer',
        theme: 'accent',
        className: 'hover-lift',
      },
    ],
  },
)

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

    const localRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => localRef.current as HTMLButtonElement)

    return (
      <CompMotion
        className={cn(
          buttonVariants({ variant, theme, size, rounded, effect, shadow, fullWidth }),
          className,
        )}
        data-size={size ?? 'default'}
        data-slot="button"
        data-theme={theme ?? 'default'}
        data-variant={variant ?? 'default'}
        ref={localRef}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        whileHover={{ scale: scaleEffect ? 1.05 : 1 }}
        whileTap={{ scale: scaleEffect ? 0.97 : 1 }}
        {...props}
      >
        {children}
      </CompMotion>
    )
  },
)

export { Button, buttonVariants }
