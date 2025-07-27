import { cn } from '@ez/studio/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const cardVariants = cva('relative', {
  variants: {
    variant: {
      default: 'shadow-[0_0_15px_3px] outline outline-2',
      outline: 'shadow-[0_0_15px_3px] outline outline-2',
      ghost: 'shadow-none outline-none border-none',
    },
    theme: {
      default:
        'shadow-primary/20 bg-linear-to-r from-primary via-primary/80 to-primary hover:bg-primary-foreground hover:text-primary-foreground text-primary-foreground outline-primary/40 hover:border-primary/40',
      secondary:
        'shadow-secondary/20 bg-linear-to-r from-secondary via-secondary/80 to-secondary hover:bg-secondary/30 hover:text-secondary-foreground text-secondary-foreground outline-secondary/40 hover:border-secondary/40',
      tertiary:
        'shadow-tertiary/20 bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground hover:bg-tertiary/30 hover:text-tertiary-foreground outline-tertiary/40 hover:border-tertiary/40',
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
      className: 'bg-transparent text-primary hover:bg-transparent hover:text-primary',
    },
    {
      variant: 'outline',
      theme: 'secondary',
      className: 'bg-transparent text-secondary hover:bg-transparent hover:text-secondary',
    },
    {
      variant: 'outline',
      theme: 'tertiary',
      className: 'bg-transparent text-tertiary hover:bg-transparent hover:text-tertiary',
    },
    {
      variant: 'ghost',
      className: 'bg-transparent text-primary hover:bg-transparent hover:text-primary',
    },
    {
      variant: 'ghost',
      theme: 'secondary',
      className: 'bg-transparent text-secondary hover:bg-transparent hover:text-secondary',
    },
    {
      variant: 'ghost',
      theme: 'tertiary',
      className: 'bg-transparent text-tertiary hover:bg-transparent hover:text-tertiary',
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
      className={cn('leading-none font-semibold text-sm text-muted-foreground', className)}
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
