'use client'

import {
  type HTMLMotionProps,
  type Transition,
  type UseInViewOptions,
  motion,
  useInView,
} from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'

type HighlightTextProps = HTMLMotionProps<'span'> & {
  text: string
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  transition?: Transition
}

function HighlightText({
  ref,
  text,
  className,
  inView = false,
  inViewMargin = '0px',
  transition = { duration: 2, ease: 'easeInOut' },
  ...props
}: HighlightTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement)

  const inViewResult = useInView(localRef, {
    once: true,
    margin: inViewMargin,
  })
  const isInView = !inView || inViewResult

  return (
    <motion.span
      ref={localRef}
      data-slot="highlight-text"
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={isInView ? { backgroundSize: '100% 100%' } : undefined}
      transition={transition}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        'relative inline-block rounded-lg bg-gradient-to-r from-primary to-secondary px-2 py-1',
        className,
      )}
      {...props}
    >
      {text}
    </motion.span>
  )
}

export { HighlightText, type HighlightTextProps }
