import { cn } from '@ez/shared/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-default/20 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
