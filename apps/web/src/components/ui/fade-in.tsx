'use client'

import { type HTMLMotionProps, motion } from 'motion/react'
import type { ComponentType, ReactNode } from 'react'

const components = {
  div: motion.div,
  section: motion.section,
  nav: motion.nav,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
  article: motion.article,
} as const

type FadeInAs = keyof typeof components

type FadeInProps<T extends FadeInAs = 'div'> = HTMLMotionProps<T> & {
  as?: T
  delay?: number
  inView?: boolean
  children?: ReactNode
}

export function FadeIn<T extends FadeInAs = 'div'>(props: FadeInProps<T>) {
  const { as, delay = 0, inView = true, transition, viewport, children, ...rest } = props
  const resolvedAs = (as ?? 'div') as T
  const Component = components[resolvedAs] as ComponentType<HTMLMotionProps<T>>
  const visible = { opacity: 1, y: 0 }

  return (
    <Component
      animate={!inView ? visible : undefined}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay, ...transition }}
      viewport={inView ? { amount: 0.2, once: true, ...viewport } : viewport}
      whileInView={inView ? visible : undefined}
      {...(rest as HTMLMotionProps<T>)}
    >
      {children}
    </Component>
  )
}
