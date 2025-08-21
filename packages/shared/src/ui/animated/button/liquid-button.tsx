'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLMotionProps, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'

// const buttonVariants = cva(
//   "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-medium text-sm outline-none [background:_linear-gradient(var(--liquid-button-color)_0_0)_no-repeat_calc(200%-var(--liquid-button-fill,0%))_100%/200%_var(--liquid-button-fill,0.2em)] [transition:_background_0.3s_var(--liquid-button-delay,0s),_color_0.3s_var(--liquid-button-delay,0s),_background-position_0.3s_calc(0.3s_-_var(--liquid-button-delay,0s))] focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:[--liquid-button-delay:0.3s] hover:[--liquid-button-fill:100%] [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default:
//           '!bg-muted text-primary [--liquid-button-color:var(--primary)] hover:text-primary-foreground',
//         outline:
//           '!bg-background dark:!bg-input/30 border [--liquid-button-color:var(--primary)] dark:border-input',
//         secondary:
//           '!bg-muted text-secondary [--liquid-button-color:var(--secondary)] hover:text-secondary-foreground',
//       },
//       size: {
//         default: 'h-10 px-4 py-2 has-[>svg]:px-3',
//         sm: 'h-9 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
//         lg: 'h-12 rounded-xl px-8 has-[>svg]:px-6',
//         icon: 'size-10',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   },
// )

const buttonVariants = cva(
  '[&_svg]:pointer-events-none"size-"])]:size-4 relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-medium text-sm outline-none [&_svg:not([class*= [background:_linear-gradient(var(--liquid-button-color)_0_0)_no-repeat_calc(200%-var(--liquid-button-fill,0%))_100%/200%_var(--liquid-button-fill,0.2em)] [transition:_background_0.3s_var(--liquid-button-delay,0s),_color_0.3s_var(--liquid-button-delay,0s),_background-position_0.3s_calc(0.3s_-_var(--liquid-button-delay,0s))] focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:[--liquid-button-delay:0.3s] hover:[--liquid-button-fill:100%] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-primary shadow-md [--liquid-button-color:var(--primary)] hover:text-primary-foreground',
        outline: '!bg-white/60 text-primary shadow-none outline-2',
      },
      theme: {
        default:
          '!bg-primary border-primary text-primary-foreground shadow-primary [--liquid-button-color:var(--primary-foreground)] hover:text-primary',
        secondary:
          '!bg-secondary border-secondary text-secondary-foreground shadow-secondary [--liquid-button-color:var(--secondary-foreground)] hover:text-secondary',
        tertiary:
          '!bg-tertiary border-tertiary text-tertiary-foreground shadow-tertiary [--liquid-button-color:var(--tertiary-foreground)] hover:text-tertiary',
        custom: '',
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
      fullWidth: {
        true: 'w-full',
      },
      sticky: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      theme: 'default',
      size: 'default',
      rounded: 'none',
      fullWidth: false,
      sticky: false,
    },
    compoundVariants: [
      {
        variant: 'outline',
        theme: 'default',
        className:
          '!bg-white border-white text-primary [--liquid-button-color:var(--primary)] hover:text-primary-foreground',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className:
          '!bg-white border-white text-secondary [--liquid-button-color:var(--secondary)] hover:text-secondary-foreground',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className:
          '!bg-white border-white text-tertiary [--liquid-button-color:var(--tertiary)] hover:text-tertiary-foreground',
      },
      {
        variant: 'outline',
        theme: 'custom',
        sticky: false,
        className:
          '!bg-[var(--header-button-default-background)] border--[var(--header-button-default-background)] text-[var(--header-button-default-text)] [--liquid-button-color:var(--header-button-hover-background)] hover:text-[var(--header-button-hover-text)]',
      },
      {
        variant: 'outline',
        theme: 'custom',
        sticky: true,
        className:
          '!bg-[var(--header-sticky-button-default-background)] border--[var(--header-sticky-button-default-background)] text-[var(--header-sticky-button-default-background)] [--liquid-button-color:var(--header-sticky-button-hover-background)] hover:text-[var(--header-sticky-button-hover-text)]',
      },
    ],
  },
)

type LiquidButtonProps = HTMLMotionProps<'button'> & VariantProps<typeof buttonVariants>

function LiquidButton({
  className,
  variant,
  theme,
  rounded,
  size,
  sticky,
  fullWidth,
  ...props
}: LiquidButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        buttonVariants({ variant, size, theme, sticky, rounded, fullWidth, className }),
      )}
      {...props}
    />
  )
}

export { LiquidButton, type LiquidButtonProps }
