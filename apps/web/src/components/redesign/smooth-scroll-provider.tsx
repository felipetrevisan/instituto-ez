'use client'

import Lenis from 'lenis'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { usePrefersReducedMotion } from './use-reduced-motion'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({ autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  return <>{children}</>
}
