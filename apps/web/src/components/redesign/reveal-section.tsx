'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from './use-reduced-motion'

type RevealSectionProps = {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function RevealSection({ children, className, id, delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 80, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          delay,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, prefersReducedMotion])

  return (
    <section className={className} id={id} ref={ref}>
      {children}
    </section>
  )
}
