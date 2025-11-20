'use client'

import { type HTMLMotionProps, motion } from 'motion/react'

export function StickySection({ children, id }: HTMLMotionProps<'section'>) {
  return <motion.section id={id}>{children}</motion.section>
}
