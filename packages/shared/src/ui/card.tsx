import { cn } from '@ez/shared/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const cardVariants = cva('relative', {
  variants: {
    variant: {
      default: 'shadow-[0_0_15px_3px] outline outline-2',
      outline: 'shadow-[0_0_15px_3px] outline outline-2',
      ghost: 'border-none shadow-none outline-none',
      custom: 'shadow-[0_0_15px_3px] outline outline-2',
    },
    theme: {
      default:
        'bg-linear-to-r from-primary via-primary/80 to-primary text-primary-foreground shadow-primary/20 outline-primary/40 hover:border-primary/40 hover:bg-primary-foreground hover:text-primary-foreground',
      secondary:
        'bg-linear-to-r from-secondary via-secondary/80 to-secondary text-secondary-foreground shadow-secondary/20 outline-secondary/40 hover:border-secondary/40 hover:bg-secondary/30 hover:text-secondary-foreground',
      tertiary:
        'bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground shadow-tertiary/20 outline-tertiary/40 hover:border-tertiary/40 hover:bg-tertiary/30 hover:text-tertiary-foreground',
      custom: 'bg-linear-to-r from-[var(--secondary-c)] via-[var(--secondary-c)]/80 to-[var(--secondary-c)] text-[var(--secondary-c)] shadow-[var(--secondary-c)]/20 outline-[var(--secondary-c)]/40 hover:border-[var(--secondary-c)]/40 hover:bg-[var(--secondary-c)]/30 hover:text-[var(--secondary-c)]',
    },
    rounded: {
      none: 'rounded-none **:data-[slot=card-content-action]:rounded-none',
      full: 'rounded-full **:data-[slot=card-content-action]:rounded-full',
      lg: 'rounded-lg **:data-[slot=card-content-action]:rounded-lg',
      xl: 'rounded-2xl **:data-[slot=card-content-action]:rounded-2xl',
      '2xl': 'rounded-3xl **:data-[slot=card-content-action]:rounded-3xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
    rounded: 'xl',
  },
  compoundVariants: [
    {
      variant: 'outline',
      class: 'bg-transparent text-primary hover:bg-transparent hover:text-primary',
    },
    {
      variant: 'outline',
      theme: 'secondary',
      class: 'bg-transparent text-secondary hover:bg-transparent hover:text-secondary',
    },
    {
      variant: 'outline',
      theme: 'tertiary',
      class: 'bg-transparent text-tertiary hover:bg-transparent hover:text-tertiary',
    },
    {
      variant: 'outline',
      theme: 'custom',
      class: 'bg-transparent text-[var(--primary-c)] hover:bg-transparent hover:text-[var(--primary-c)]',
    },
    {
      variant: 'ghost',
      class: 'bg-transparent text-primary hover:bg-transparent hover:text-primary',
    },
    {
      variant: 'ghost',
      theme: 'secondary',
      class: 'bg-transparent text-secondary hover:bg-transparent hover:text-secondary',
    },
    {
      variant: 'ghost',
      theme: 'tertiary',
      class: 'bg-transparent text-tertiary hover:bg-transparent hover:text-tertiary',
    },
  ],
})

export type CardProps = React.ComponentProps<'div'> & VariantProps<typeof cardVariants>

function Card({ className, variant, rounded, theme, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, rounded, theme, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-semibold text-muted-foreground text-sm leading-none', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('p-6 pt-0', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
