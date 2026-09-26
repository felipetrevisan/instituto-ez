'use client'

import { cn } from '@ez/web/lib/utils'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { type ReactNode, useRef } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

/** Título em que cada palavra "cai" de um plano 3D, em sequência. */
export function SplitTitle({
  lines,
  accent,
  className,
  delay = 0.15,
}: {
  lines: string[]
  accent?: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  let index = 0
  const word = (text: string, extra?: string) => {
    const i = index++
    return (
      <span
        className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        key={`${text}-${i}`}
        style={{ perspective: 800 }}
      >
        <motion.span
          animate={{ y: '0%', rotateX: 0, opacity: 1 }}
          className={cn('inline-block origin-bottom', extra)}
          initial={reduce ? false : { y: '110%', rotateX: -80, opacity: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.07, ease }}
        >
          {text}
        </motion.span>
      </span>
    )
  }

  return (
    <h1 className={cn('ez-display text-balance text-white', className)}>
      {lines.map((line, lineIndex) => (
        <span className="block" key={line || lineIndex}>
          {line.split(' ').map((w) => (
            <span key={`${w}-${index}`}>{word(w)} </span>
          ))}
          {accent &&
            lineIndex === lines.length - 1 &&
            word(accent, 'ez-serif ez-text-gradient font-normal pr-2')}
        </span>
      ))}
    </h1>
  )
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hero de tela cheia. Ao rolar, o bloco recua no eixo Z e inclina, deixando a
 * cena WebGL tomar o primeiro plano.
 */
export function PageHero({
  eyebrow,
  lines,
  accent,
  subtitle,
  children,
  aside,
  align = 'left',
  titleClassName,
}: {
  eyebrow?: ReactNode
  lines: string[]
  accent?: string
  subtitle?: ReactNode
  children?: ReactNode
  aside?: ReactNode
  align?: 'left' | 'center'
  titleClassName?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // No topo (onde ficam os botões) o bloco não tem transform, só ao rolar para fora.
  const transform = useTransform(scrollYProgress, (p) =>
    p < 0.001 ? 'none' : `perspective(1400px) translateZ(${-380 * p}px) rotateX(${18 * p}deg)`,
  )
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
      ref={ref}
    >
      <motion.div
        className={cn(
          'relative mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 sm:px-8',
          aside && 'lg:grid-cols-[1.1fr_0.9fr]',
        )}
        style={reduce ? undefined : { transform, opacity, transformOrigin: 'center bottom' }}
      >
        <div
          className={cn('flex flex-col', align === 'center' && 'mx-auto items-center text-center')}
        >
          {eyebrow && (
            <FadeUp className="mb-6">
              <div className="ez-eyebrow">{eyebrow}</div>
            </FadeUp>
          )}
          <SplitTitle
            accent={accent}
            className={cn('text-[clamp(2.6rem,7vw,6rem)]', titleClassName)}
            lines={lines}
          />
          {subtitle && (
            <FadeUp
              className={cn('mt-7 max-w-2xl text-lg text-white/65 leading-relaxed sm:text-xl')}
              delay={0.6}
            >
              {subtitle}
            </FadeUp>
          )}
          {children && (
            <FadeUp
              className={cn('mt-10 flex flex-wrap gap-4', align === 'center' && 'justify-center')}
              delay={0.8}
            >
              {children}
            </FadeUp>
          )}
        </div>
        {aside && (
          <FadeUp className="relative" delay={0.4}>
            {aside}
          </FadeUp>
        )}
      </motion.div>
      <div className="-translate-x-1/2 absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-[10px] text-white/40 uppercase tracking-[0.3em]">
        <span aria-hidden className="ez-scroll-cue" />
        Role
      </div>
    </section>
  )
}
