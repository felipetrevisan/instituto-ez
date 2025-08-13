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
        custom: '[background:_linear-gradient(var(--liquid-button-color)_0_0)_no-repeat_calc(200%-var(--liquid-button-fill,0%))_100%/200%_var(--liquid-button-fill,0.2em)] [transition:_background_0.3s_var(--liquid-button-delay,0s),_color_0.3s_var(--liquid-button-delay,0s),_background-position_0.3s_calc(0.3s_-_var(--liquid-button-delay,0s))] hover:[--liquid-button-delay:0.3s] hover:[--liquid-button-fill:100%] [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0'
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

type LiquidButtonProps = HTMLMotionProps<'button'> & VariantProps<typeof buttonVariants>

function LiquidButton({ className, variant, size, ...props }: LiquidButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { LiquidButton, type LiquidButtonProps }
