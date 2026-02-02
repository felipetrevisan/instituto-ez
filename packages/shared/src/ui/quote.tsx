import { cn } from '@ez/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const quoteVariants = cva('my-4 border-l-4 p-6', {
  variants: {
    theme: {
      default: 'border-cyan bg-primary/5',
      secondary: 'border-tertiary bg-accent/5',
      tertiary: 'border-secondary bg-tertiary/5',
      accent: 'border-navy bg-accent/5',
      coral: 'border-coral bg-navy/5',
      cyan: 'border-primary bg-cyan/5',
    },
    rounded: {
      none: 'rounded-nonee',
      full: 'rounded-full',
      lg: 'rounded-lg',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
    },
  },
  defaultVariants: {
    theme: 'default',
    rounded: 'xl',
  },
})

export type QuoteProps = React.ComponentProps<'div'> & VariantProps<typeof quoteVariants>

function Quote({ className, rounded, theme, ...props }: QuoteProps) {
  return (
    <div
      className={cn(quoteVariants({ rounded, theme, className }))}
      data-slot="quote"
      {...props}
    />
  )
}

export { Quote, quoteVariants }
