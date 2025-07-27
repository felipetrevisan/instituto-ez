import { Slot } from '@radix-ui/react-slot'
import type * as React from 'react'

type LinkProps = React.ComponentProps<'a'> & {
  children: React.ReactNode
  asChild?: boolean
  ref?: React.RefObject<HTMLAnchorElement>
}

function Link({ ref, className, onClick, asChild = false, children, ...props }: LinkProps) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp ref={ref} data-slot="link" {...props}>
      {children}
    </Comp>
  )
}

export { Link }
