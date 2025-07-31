'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

type AnimatedCounterProps = {
  from?: number
  to: number
  duration?: number
  decimals?: number
  bounce?: number
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1.5,
  decimals = 0,
  bounce = 0.3,
}: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) =>
    decimals ? Number(latest).toFixed(decimals) : Math.round(latest).toString(),
  )

  const [display, setDisplay] = useState<string>(from.toString())

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const controls = animate(count, to, {
      type: 'spring',
      duration,
      bounce,
    })

    const unsubscribe = rounded.on('change', (v) => {
      setDisplay(v)
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [to, duration, decimals, bounce])

  return (
    <motion.span
      className="font-bold text-4xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  )
}
