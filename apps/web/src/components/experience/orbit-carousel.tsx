'use client'

import { cn } from '@ez/web/lib/utils'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { type PointerEvent, useEffect, useRef, useState } from 'react'

type Testimonial = { id?: string; author: string; text: string }

function useCardWidth() {
  const [width, setWidth] = useState(380)
  useEffect(() => {
    const update = () =>
      setWidth(window.innerWidth < 640 ? Math.min(300, window.innerWidth - 56) : 380)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return width
}

function OrbitCard({
  item,
  index,
  step,
  radius,
  width,
  rotation,
}: {
  item: Testimonial
  index: number
  step: number
  radius: number
  width: number
  rotation: MotionValue<number>
}) {
  const facing = (r: number) => Math.cos(((index * step + r) * Math.PI) / 180)
  const opacity = useTransform(rotation, (r) => 0.08 + 0.92 * Math.max(0, facing(r)) ** 2)
  const pointerEvents = useTransform(rotation, (r) => (facing(r) > 0.9 ? 'auto' : 'none'))

  return (
    <motion.figure
      className="absolute top-0 left-1/2 flex h-[480px] flex-col rounded-[28px] p-7"
      style={{
        width,
        marginLeft: -width / 2,
        transform: `rotateY(${index * step}deg) translateZ(${radius}px)`,
        opacity,
        pointerEvents,
        backfaceVisibility: 'hidden',
      }}
    >
      <div
        aria-hidden
        className="ez-glass ez-glass-strong ez-border-glow absolute inset-0 rounded-[28px]"
      />
      <div className="relative flex h-full flex-col">
        <Quote aria-hidden className="size-8 text-[color:var(--accent)]" />
        <blockquote className="ez-no-scrollbar mt-4 flex-1 overflow-y-auto text-[14.5px] text-white/75 leading-relaxed">
          {item.text}
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-white/10 border-t pt-5">
          <span className="ez-icon-orb size-10 font-semibold text-sm">{item.author.charAt(0)}</span>
          <span className="font-medium text-sm text-white">{item.author}</span>
        </figcaption>
      </div>
    </motion.figure>
  )
}

/** Depoimentos dispostos num cilindro 3D — arraste, use as setas ou deixe girar. */
function Orbit({ items, className }: { items: Testimonial[]; className?: string }) {
  const reduce = useReducedMotion()
  const width = useCardWidth()
  const count = items.length
  const step = 360 / count
  const radius = Math.round(width / 2 / Math.tan(Math.PI / count)) + 40
  const target = useMotionValue(0)
  const rotation = useSpring(target, { stiffness: 60, damping: 18 })
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(0)
  const drag = useRef<{ x: number; start: number } | null>(null)

  const go = (direction: 1 | -1) => {
    const next = Math.round(target.get() / step) * step - direction * step
    target.set(next)
  }

  useEffect(() => {
    return rotation.on('change', (r) => {
      const idx = ((Math.round(-r / step) % count) + count) % count
      setActive(idx)
    })
  }, [rotation, step, count])

  useEffect(() => {
    if (reduce || paused) return
    const id = window.setInterval(() => {
      if (!document.hidden) target.set(Math.round(target.get() / step) * step - step)
    }, 6000)
    return () => window.clearInterval(id)
  }, [reduce, paused, step, target])

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, start: target.get() }
    event.currentTarget.setPointerCapture(event.pointerId)
    setPaused(true)
  }
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    target.set(drag.current.start + (event.clientX - drag.current.x) * 0.28)
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    target.set(Math.round(target.get() / step) * step)
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover só pausa a rotação automática
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <section
        aria-label="Depoimentos"
        aria-roledescription="carrossel"
        className="relative h-[520px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerCancel={onUp}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        style={{ perspective: 1600 }}
      >
        <motion.div
          className="ez-preserve absolute inset-0"
          style={{ rotateY: rotation, z: -radius, transformOrigin: `50% 50% 0` }}
        >
          {items.map((item, index) => (
            <OrbitCard
              index={index}
              item={item}
              key={item.id ?? item.author}
              radius={radius}
              rotation={rotation}
              step={step}
              width={width}
            />
          ))}
        </motion.div>
      </section>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          aria-label="Depoimento anterior"
          className="ez-btn-ghost !min-h-11 !px-3"
          onClick={() => go(-1)}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-1.5">
          {items.map((item, index) => (
            <span
              aria-hidden
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                index === active ? 'w-6 bg-[color:var(--accent)]' : 'w-1.5 bg-white/25',
              )}
              key={item.id ?? item.author}
            />
          ))}
        </div>
        <button
          aria-label="Próximo depoimento"
          className="ez-btn-ghost !min-h-11 !px-3"
          onClick={() => go(1)}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {items[active]?.author}
      </p>
    </div>
  )
}

function StaticCard({ item }: { item: Testimonial }) {
  return (
    <figure className="ez-glass relative flex flex-col rounded-[28px] p-7">
      <Quote aria-hidden className="size-8 text-[color:var(--accent)]" />
      <blockquote className="mt-4 flex-1 text-[14.5px] text-white/75 leading-relaxed">
        {item.text}
      </blockquote>
      <figcaption className="mt-5 border-white/10 border-t pt-5 font-medium text-sm text-white">
        {item.author}
      </figcaption>
    </figure>
  )
}

/** Depoimentos num cilindro 3D; com menos de 3 itens o anel não fecha, então vira grade. */
export function OrbitCarousel({ items, className }: { items: Testimonial[]; className?: string }) {
  if (items.length === 0) return null
  if (items.length < 3) {
    return (
      <div className={cn('mx-auto grid max-w-4xl gap-5 md:grid-cols-2', className)}>
        {items.map((item) => (
          <StaticCard item={item} key={item.id ?? item.author} />
        ))}
      </div>
    )
  }
  return <Orbit className={className} items={items} />
}
