'use client'

import { cn } from '@ez/web/lib/utils'
import { RotateCw } from 'lucide-react'
import { motion } from 'motion/react'
import { type ReactNode, useState } from 'react'

/** Cartão de duas faces que gira 180° no eixo Y (hover no desktop, toque no mobile). */
export function FlipCard({
  front,
  back,
  className,
  label,
}: {
  front: ReactNode
  back: ReactNode
  className?: string
  label: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className={cn('group relative h-[440px]', className)} style={{ perspective: 1400 }}>
      <motion.button
        animate={{ rotateY: flipped ? 180 : 0 }}
        aria-label={`${label}: ${flipped ? 'ver frente' : 'ver detalhes'}`}
        aria-pressed={flipped}
        className="ez-preserve relative size-full cursor-pointer text-left"
        onClick={() => setFlipped((value) => !value)}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setFlipped(true)}
        onPointerLeave={(event) => event.pointerType === 'mouse' && setFlipped(false)}
        transition={{ type: 'spring', stiffness: 70, damping: 14 }}
        type="button"
      >
        <div className="ez-backface-hidden absolute inset-0 overflow-hidden rounded-[28px]">
          <div aria-hidden className="ez-glass ez-border-glow absolute inset-0 rounded-[28px]" />
          <div className="relative flex h-full flex-col p-7">
            {front}
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-white/45 text-xs uppercase tracking-[0.18em]">
              <RotateCw aria-hidden className="size-3.5" /> Ver detalhes
            </span>
          </div>
        </div>
        <div
          className="ez-backface-hidden absolute inset-0 overflow-hidden rounded-[28px]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div
            aria-hidden
            className="ez-glass ez-glass-strong absolute inset-0 rounded-[28px]"
            style={{
              background:
                'linear-gradient(160deg, color-mix(in oklab, var(--accent) 22%, rgba(12,16,34,.92)), rgba(8,11,26,.92))',
            }}
          />
          <div className="relative flex h-full flex-col p-7">{back}</div>
        </div>
      </motion.button>
    </div>
  )
}
