import { cn } from '@ez/shared/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-default/20', className)}
      data-slot="skeleton"
      {...props}
    />
  )
}

export { Skeleton }
