'use client'

import { motion, type Transition, type UseInViewOptions, useInView } from 'motion/react'
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
  transition = { type: 'spring', bounce: 0, duration: 0.05, delay: 0.2 },
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
    <Component data-slot="writing-text" ref={localRef} {...props}>
      {words.map((word, index) => (
        <motion.span
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          className="inline-block will-change-opacity will-change-transform"
          initial={{ opacity: 0, y: 10 }}
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
          key={index}
          style={{ marginRight: spacing }}
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
