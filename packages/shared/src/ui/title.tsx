import { cn } from '@ez/shared/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

type TitleProps = {
  asChild?: boolean
  as?: keyof React.JSX.IntrinsicElements
  children: React.ReactNode
  className?: string
}

export const titleVariants = cva('font-oswald font-bold', {
  variants: {
    variant: {
      default: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      white: 'text-white',
    },
    size: {
      default: 'clamp-[text,2xl,6xl]',
      sm: 'clamp-[text,sm,lg]',
      lg: 'clamp-[text,lg,2xl]',
      xl: 'clamp-[text,xl,2xl]',
      '2xl': 'clamp-[text,2xl,4xl]',
      '3xl': 'clamp-[text,4xl,8xl]',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'default',
  },
})

function Title({
  className,
  variant,
  size,
  asChild = false,
  separator = false,
  children,
  ...props
}: React.ComponentProps<'h1'> &
  VariantProps<typeof titleVariants> & {
    asChild?: boolean
    separator?: boolean
  }) {
  const Comp = asChild ? Slot : 'h1'

  return (
    <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
      {separator && (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="7"
          viewBox="0 0 26 7"
          fill="none"
        >
          <path
            d="M26 0.999776C26 1.55218 25.2166 2 24.2493 2H7.74961C7.26654 2 6.82911 1.88808 6.51229 1.70704C6.19573 1.52628 6 1.27626 6 1.00007C5.99974 0.447599 6.78343 -0.000149254 7.75053 3.73222e-08H24.2506C25.2171 0.000124446 25.9998 0.447599 26 0.999776Z"
            className={cn({
              'fill-primary': variant === 'default',
              'fill-secondary': variant === 'secondary',
              'fill-tertiary': variant === 'tertiary',
            })}
          />
          <path
            d="M20 5.99978C20 6.55218 19.2166 7 18.2493 7H1.74961C1.26654 7 0.829108 6.88808 0.512287 6.70704C0.195727 6.52628 6.53032e-08 6.27626 6.53032e-08 6.00007C-0.000261194 5.4476 0.783431 4.99985 1.75053 5H18.2506C19.2171 5.00012 19.9998 5.4476 20 5.99978Z"
            className={cn({
              'fill-primary': variant === 'default',
              'fill-secondary': variant === 'secondary',
              'fill-tertiary': variant === 'tertiary',
            })}
          />
        </svg>
      )}
      <Comp className={cn(titleVariants({ variant, size }), className)} {...props}>
        {children}
      </Comp>
    </div>
  )
}

function Subtitle({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'h3'> &
  VariantProps<typeof titleVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'h3'

  return (
    <Comp
      className={cn(titleVariants({ variant, size }), 'font-light mt-5 text-center', className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

function TitleBase({ as = 'h2', asChild = false, className, children, ...props }: TitleProps) {
  const Comp = asChild ? Slot : as

  return (
    <Comp data-slot="title" className={className} {...props}>
      {children}
    </Comp>
  )
}

export { TitleBase, Title, Subtitle }
