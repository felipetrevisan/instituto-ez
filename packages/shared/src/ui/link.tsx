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
    <Comp data-slot="link" ref={ref} {...props}>
      {children}
    </Comp>
  )
}

export { Link }
