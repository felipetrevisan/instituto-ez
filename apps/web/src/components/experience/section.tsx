'use client'

import { cn } from '@ez/web/lib/utils'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { type ReactNode, useRef } from 'react'
import { Reveal } from './reveal'
import { Rich } from './rich'

/**
 * Seção com "entrada de palco": o conteúdo se levanta de um plano inclinado ao
 * entrar na viewport. Em repouso fica sem transform algum — transforms 3D ativos
 * atrapalham o hit-test de links e botões.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
  stage = true,
}: {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
  stage?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] })
  const transform = useTransform(scrollYProgress, (p) => {
    const rest = 1 - Math.min(Math.max(p, 0), 1)
    return rest < 0.001
      ? 'none'
      : `perspective(1600px) translateZ(${-140 * rest}px) rotateX(${14 * rest}deg)`
  })
  const animated = stage && !reduce

  return (
    <section className={cn('relative scroll-mt-24 py-20 sm:py-28', className)} id={id} ref={ref}>
      <motion.div
        className={cn('relative mx-auto w-full max-w-[1280px] px-5 sm:px-8', containerClassName)}
        style={animated ? { transform, transformOrigin: 'center top' } : undefined}
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="ez-eyebrow mb-5">{eyebrow}</p>}
      <h2
        className={cn(
          'ez-display text-balance text-[clamp(2rem,4.6vw,3.6rem)] text-white',
          titleClassName,
        )}
      >
        <Rich markClassName="ez-serif ez-text-gradient font-normal" text={title} />
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-lg text-white/60 leading-relaxed',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

export function Prose({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={cn('ez-prose text-[1.05rem]', className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>
          <Rich text={paragraph} />
        </p>
      ))}
    </div>
  )
}
