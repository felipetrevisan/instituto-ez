'use client'

import { type HTMLMotionProps, motion } from 'motion/react'

export function StickySection({ children, className, style, id }: HTMLMotionProps<'section'>) {
  return (
    <motion.section className={className} id={id} style={style}>
      {children}
    </motion.section>
  )
}
