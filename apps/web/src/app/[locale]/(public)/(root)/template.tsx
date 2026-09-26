'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** Transição entre páginas: o conteúdo novo emerge do fundo da cena. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1, z: 0, rotateX: 0, filter: 'blur(0px)' }}
      id="ez-page"
      initial={reduce ? false : { opacity: 0, z: -220, rotateX: 6, filter: 'blur(10px)' }}
      onAnimationComplete={(definition) => {
        // Remove o filtro/transform residual para não criar contexto de empilhamento em elementos sticky.
        if (definition && typeof document !== 'undefined') {
          const el = document.getElementById('ez-page')
          if (el) {
            el.style.transform = 'none'
            el.style.filter = 'none'
          }
        }
      }}
      style={{ transformPerspective: 1400, transformOrigin: 'center top' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
