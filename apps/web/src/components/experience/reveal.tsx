'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'depth'

const variants: Record<Direction, Record<string, number>> = {
  up: { y: 70, rotateX: 28, z: -120 },
  left: { x: -80, rotateY: -24, z: -120 },
  right: { x: 80, rotateY: 24, z: -120 },
  depth: { z: -320, rotateX: 12, scale: 0.9 },
}

/** Entrada 3D ao entrar na viewport (profundidade + rotação). */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: Direction
  as?: 'div' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  if (reduce) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        filter: 'blur(8px)',
        transformPerspective: 1200,
        ...variants[direction],
      }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      }}
    >
      {children}
    </Component>
  )
}
