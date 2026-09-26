'use client'

import { cn } from '@ez/web/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

/**
 * Livro aberto folheável: cada folha tem frente e verso e gira 180° em torno da
 * lombada, com sombra dinâmica.
 */
export function FlipBook({
  pages,
  title,
  className,
}: {
  pages: string[]
  title: string
  className?: string
}) {
  // Agrupa as imagens em folhas [frente, verso]; a última folha pode ficar com verso vazio.
  const leaves: [string, string | null][] = []
  for (let i = 0; i < pages.length; i += 2) leaves.push([pages[i], pages[i + 1] ?? null])
  const [turned, setTurned] = useState(0)

  const canPrev = turned > 0
  const canNext = turned < leaves.length

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-full max-w-[880px]" style={{ perspective: 2200 }}>
        <div className="relative mx-auto aspect-[1414/1000] w-full">
          {/* Página esquerda base (verso da última folha virada aparece por cima) */}
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-l-xl bg-[#f3efe7] shadow-[inset_-20px_0_40px_-20px_rgba(0,0,0,0.35)]">
            <div className="grid h-full place-items-center p-8 text-center">
              <p className="ez-display text-[#1b1f33] text-xl">{title}</p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 rounded-r-xl bg-[#f3efe7]" />

          {leaves.map(([front, back], index) => {
            const isTurned = index < turned
            return (
              <motion.div
                animate={{ rotateY: isTurned ? -180 : 0 }}
                className="ez-preserve absolute inset-y-0 right-0 w-1/2"
                initial={false}
                // biome-ignore lint/suspicious/noArrayIndexKey: folhas são estáticas
                key={index}
                style={{
                  transformOrigin: 'left center',
                  zIndex: isTurned ? index : leaves.length - index,
                }}
                transition={{ type: 'spring', stiffness: 45, damping: 13 }}
              >
                <div className="ez-backface-hidden absolute inset-0 overflow-hidden rounded-r-xl bg-white">
                  {/* biome-ignore lint/performance/noImgElement: textura em face 3D */}
                  <img
                    alt={`${title} — página ${index * 2 + 1}`}
                    className="size-full object-cover"
                    draggable={false}
                    src={front}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
                </div>
                <div
                  className="ez-backface-hidden absolute inset-0 overflow-hidden rounded-l-xl bg-[#f3efe7]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  {back ? (
                    // biome-ignore lint/performance/noImgElement: textura em face 3D
                    <img
                      alt={`${title} — página ${index * 2 + 2}`}
                      className="size-full object-cover"
                      draggable={false}
                      src={back}
                    />
                  ) : (
                    <div className="grid h-full place-items-center p-8 text-center text-[#1b1f33]/70 text-sm">
                      Continue a leitura no eBook completo.
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent" />
                </div>
              </motion.div>
            )
          })}
          <div
            aria-hidden
            className="-translate-x-1/2 absolute inset-y-0 left-1/2 z-50 w-6 bg-gradient-to-r from-transparent via-black/20 to-transparent"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <button
          aria-label="Página anterior"
          className="ez-btn-ghost !min-h-11 !px-3 disabled:opacity-30"
          disabled={!canPrev}
          onClick={() => setTurned((t) => Math.max(0, t - 1))}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm text-white/55 tabular-nums">
          {turned + 1} / {leaves.length + 1}
        </span>
        <button
          aria-label="Próxima página"
          className="ez-btn-ghost !min-h-11 !px-3 disabled:opacity-30"
          disabled={!canNext}
          onClick={() => setTurned((t) => Math.min(leaves.length, t + 1))}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
