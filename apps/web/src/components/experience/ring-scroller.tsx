'use client'

import { cn } from '@ez/web/lib/utils'
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { type ReactNode, useRef, useState } from 'react'
import { Reveal } from './reveal'

type Mode = 'helix' | 'prism'

const CARD_WIDTH = 400

/** Escada suave: cada cartão "repousa" de frente antes de girar para o próximo. */
function settle(x: number) {
  const base = Math.floor(x)
  const t = Math.min(1, Math.max(0, (x - base - 0.3) / 0.4))
  return base + t * t * (3 - 2 * t)
}
const HELIX_GAP = 120

function RingCard({
  index,
  step,
  radius,
  mode,
  angle,
  children,
}: {
  index: number
  step: number
  radius: number
  mode: Mode
  angle: MotionValue<number>
  children: ReactNode
}) {
  const facing = (a: number) => Math.cos(((index * step + a) * Math.PI) / 180)
  const opacity = useTransform(angle, (a) => 0.06 + 0.94 * Math.max(0, facing(a)) ** 3)
  const offsetY = mode === 'helix' ? index * HELIX_GAP : 0

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: CARD_WIDTH,
        marginLeft: -CARD_WIDTH / 2,
        marginTop: -160,
        transform: `translateY(${offsetY}px) rotateY(${index * step}deg) translateZ(${radius}px)`,
        opacity,
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Seção "presa" à tela em que os cartões ficam num anel 3D (prisma) ou numa
 * hélice (escada) e giram conforme a rolagem. No mobile vira uma lista.
 */
export function RingScroller<T>({
  items,
  mode = 'prism',
  renderCard,
  aside,
  id,
}: {
  items: T[]
  mode?: Mode
  renderCard: (item: T, index: number) => ReactNode
  aside: (active: number) => ReactNode
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const count = items.length
  const step = mode === 'prism' ? 360 / count : 42
  const radius =
    Math.round(CARD_WIDTH / 2 / Math.tan((step * Math.PI) / 360)) + (mode === 'prism' ? 30 : 0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const angle = useTransform(progress, (p) => -settle(p * (count - 1)) * step)
  const lift = useTransform(
    progress,
    (p) => -settle(p * (count - 1)) * (mode === 'helix' ? HELIX_GAP : 0),
  )
  const [active, setActive] = useState(0)

  useMotionValueEvent(progress, 'change', (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))))
  })

  return (
    <div className="scroll-mt-24" id={id}>
      {/* Desktop: palco 3D fixo */}
      <div
        className={cn('relative hidden lg:block', reduce && 'lg:hidden')}
        ref={ref}
        style={{ height: `${count * 70 + 60}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.85fr_1.15fr] items-center gap-8 px-8">
            <div>{aside(active)}</div>
            <div className="relative h-[640px]" style={{ perspective: 1500 }}>
              <motion.div
                className="ez-preserve absolute inset-0"
                style={{ z: -radius, y: lift, rotateY: angle }}
              >
                {items.map((item, index) => (
                  <RingCard
                    angle={angle}
                    index={index}
                    key={index}
                    mode={mode}
                    radius={radius}
                    step={step}
                  >
                    {renderCard(item, index)}
                  </RingCard>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / movimento reduzido: lista com entrada 3D */}
      <div className={cn('mx-auto max-w-[1280px] px-5 sm:px-8 lg:hidden', reduce && 'lg:block')}>
        <div className="mb-10">{aside(-1)}</div>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal delay={(index % 2) * 0.08} key={index}>
              {renderCard(item, index)}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
