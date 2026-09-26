'use client'

import { cn } from '@ez/web/lib/utils'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Número em relevo 3D que conta até o valor ao entrar na tela. */
export function Stat({
  value,
  prefix = '',
  suffix = '',
  label,
  className,
}: {
  value: number | string
  prefix?: string
  suffix?: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduce = useReducedMotion()
  const numeric = typeof value === 'number'
  const [display, setDisplay] = useState<number | string>(numeric && !reduce ? 0 : value)

  useEffect(() => {
    if (!inView || !numeric || reduce) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, numeric, reduce, value])

  return (
    <div className={cn('flex flex-col gap-2', className)} ref={ref}>
      <span className="ez-display ez-extrude text-[clamp(2.4rem,5vw,4rem)] tabular-nums leading-none">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="text-sm text-white/55">{label}</span>
    </div>
  )
}
