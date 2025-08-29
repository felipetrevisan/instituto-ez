'use client'

import { type Transition, type UseInViewOptions, motion, useInView } from 'motion/react'
import * as React from 'react'

type WritingTextProps<T extends React.ElementType = 'span'> = {
  asChild?: T
  transition?: Transition
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  spacing?: number | string
  text: string
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'as'>

function WritingText<T extends React.ElementType = 'span'>({
  ref,
  asChild,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  spacing = 5,
  text,
  transition = { type: 'spring', bounce: 0, duration: .2, delay: 0.2 },
  ...props
}: WritingTextProps<T>) {
  const localRef = React.useRef<HTMLElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLElement)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })
  const isInView = !inView || inViewResult

  const words = React.useMemo(() => text.split(' '), [text])

  const Component = asChild || 'span'

  return (
    <Component ref={localRef} data-slot="writing-text" {...props}>
      {words.map((word, index) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="inline-block will-change-opacity will-change-transform"
          style={{ marginRight: spacing }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            ...transition,
            delay: index * (transition?.delay ?? 0),
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </Component>
  )
}

export { WritingText, type WritingTextProps }
