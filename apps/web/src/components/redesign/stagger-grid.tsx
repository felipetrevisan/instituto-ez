'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from './use-reduced-motion'

/** Staggers its direct children in as they scroll into view — for card grids. */
export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { autoAlpha: 0, y: 60, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}
