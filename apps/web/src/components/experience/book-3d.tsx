'use client'

import { cn } from '@ez/web/lib/utils'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { PointerEvent } from 'react'

/**
 * Livro físico em CSS 3D: capa, lombada, bloco de páginas e contracapa. Gira
 * com o cursor e a capa se entreabre no hover.
 */
export function Book3D({
  cover,
  title,
  spineColor = 'var(--accent)',
  width = 300,
  className,
  float = true,
}: {
  cover: string
  title: string
  spineColor?: string
  width?: number
  className?: string
  float?: boolean
}) {
  const reduce = useReducedMotion()
  const height = Math.round(width * Math.SQRT2)
  const depth = Math.round(width * 0.14)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-1, 1], [-42, 14]), { stiffness: 90, damping: 16 })
  const rotateX = useSpring(useTransform(py, [-1, 1], [14, -14]), { stiffness: 90, damping: 16 })
  const coverOpen = useSpring(0, { stiffness: 80, damping: 14 })
  const coverRotate = useTransform(coverOpen, [0, 1], [0, -32])

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    py.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const face = 'absolute left-0 top-0'

  return (
    <div
      className={cn('relative grid place-items-center', className)}
      onPointerEnter={() => coverOpen.set(1)}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
        coverOpen.set(0)
      }}
      onPointerMove={onMove}
      style={{ perspective: 1800, height: height + 80 }}
    >
      <motion.div
        animate={float && !reduce ? { y: [0, -14, 0] } : undefined}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <motion.div className="ez-preserve relative" style={{ width, height, rotateY, rotateX }}>
          {/* Contracapa */}
          <div
            className={cn(face, 'rounded-r-md')}
            style={{
              width,
              height,
              transform: `translateZ(${-depth / 2}px) rotateY(180deg)`,
              background: `linear-gradient(135deg, color-mix(in oklab, ${spineColor} 70%, #000), #0b0f1f)`,
            }}
          />
          {/* Bloco de páginas (lateral direita) */}
          <div
            className={face}
            style={{
              width: depth,
              height: height - 8,
              top: 4,
              transform: `translateX(${width - depth / 2 - 4}px) rotateY(90deg)`,
              background: 'repeating-linear-gradient(90deg, #f4f1ea 0 1px, #d9d4c8 1px 2px)',
            }}
          />
          {/* Bloco de páginas (topo) */}
          <div
            className={face}
            style={{
              width: width - 8,
              height: depth,
              transform: `translateY(${-depth / 2 + 4}px) rotateX(90deg)`,
              background: 'repeating-linear-gradient(0deg, #f4f1ea 0 1px, #d9d4c8 1px 2px)',
            }}
          />
          {/* Lombada */}
          <div
            className={cn(face, 'flex items-center justify-center overflow-hidden')}
            style={{
              width: depth,
              height,
              transform: `translateX(${-depth / 2}px) rotateY(-90deg)`,
              background: `linear-gradient(90deg, color-mix(in oklab, ${spineColor} 60%, #000), ${spineColor}, color-mix(in oklab, ${spineColor} 60%, #000))`,
            }}
          >
            <span
              className="whitespace-nowrap font-semibold text-[11px] text-white/90 uppercase tracking-[0.2em]"
              style={{ transform: 'rotate(90deg)' }}
            >
              {title}
            </span>
          </div>
          {/* Página interna revelada ao abrir a capa */}
          <div
            className={cn(face, 'rounded-r-md')}
            style={{
              width: width - 4,
              height: height - 4,
              top: 2,
              transform: `translateZ(${depth / 2 - 2}px)`,
              background: 'linear-gradient(90deg, #d8d3c6, #f7f4ee 12%)',
            }}
          />
          {/* Capa */}
          <motion.div
            className={cn(face, 'ez-preserve rounded-r-md')}
            style={{
              width,
              height,
              z: depth / 2,
              rotateY: coverRotate,
              transformOrigin: 'left center',
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: textura em face 3D */}
            <img
              alt={`Capa do eBook ${title}`}
              className="ez-backface-hidden absolute inset-0 size-full rounded-r-md object-cover shadow-[inset_4px_0_12px_rgba(0,0,0,0.35)]"
              draggable={false}
              src={cover}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-r-md"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,0,0,.35), rgba(255,255,255,.12) 4%, transparent 9%, transparent 70%, rgba(255,255,255,.08))',
              }}
            />
            <div
              className="absolute inset-0 rounded-l-md"
              style={{
                transform: 'rotateY(180deg)',
                background: '#efebe3',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="-z-10 -translate-x-1/2 absolute bottom-2 left-1/2 h-10 w-[70%] rounded-[50%] blur-2xl"
        style={{ background: `color-mix(in oklab, ${spineColor} 55%, transparent)` }}
      />
    </div>
  )
}
