'use client'

import { cn } from '@ez/web/lib/utils'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useRef } from 'react'

const spring = { stiffness: 180, damping: 18, mass: 0.6 }

/** Cartão com rotação 3D guiada pelo cursor, spotlight e camadas em profundidade. */
export function Tilt({
  children,
  className,
  max = 10,
  style,
  surface = false,
  surfaceClassName,
}: {
  children: ReactNode
  className?: string
  max?: number
  style?: CSSProperties
  /** Desenha o vidro numa camada irmã — backdrop-filter achataria o 3D dos filhos. */
  surface?: boolean
  surfaceClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    if (event.pointerType !== 'mouse' || reduce) return
    px.set(x)
    py.set(y)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={cn('ez-spotlight ez-preserve', className)}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      ref={ref}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1100 }}
    >
      {surface && (
        <div
          aria-hidden
          className={cn(
            'ez-glass ez-border-glow pointer-events-none absolute inset-0',
            surfaceClassName,
          )}
        />
      )}
      {children}
    </motion.div>
  )
}

/**
 * Elemento elevado dentro de um <Tilt /> — cria parallax real de profundidade.
 * Fica "flat" de propósito: preserve-3d aqui quebra o hit-test de links e botões no Chrome.
 */
export function Depth({
  children,
  z = 40,
  className,
}: {
  children: ReactNode
  z?: number
  className?: string
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  )
}
