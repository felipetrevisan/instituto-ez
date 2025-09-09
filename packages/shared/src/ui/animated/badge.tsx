'use client'

import { cn } from '@ez/shared/lib/utils'
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type UseInViewOptions,
  useInView,
  useMotionValue,
  useSpring,
} from 'motion/react'
import * as React from 'react'
import { useId } from 'react'
import { SlidingNumber } from './text/sliding-number'

type FormatNumberResult = { number: string[]; unit: string }

function formatNumber(num: number, formatted: boolean): FormatNumberResult {
  if (formatted) {
    if (num < 1000) {
      return { number: [num.toString()], unit: '' }
    }
    const units = ['k', 'M', 'B', 'T']
    let unitIndex = 0
    let n = num
    while (n >= 1000 && unitIndex < units.length) {
      n /= 1000
      unitIndex++
    }
    const finalNumber = Math.floor(n).toString()
    return { number: [finalNumber], unit: units[unitIndex - 1] ?? '' }
  }
  return { number: num.toLocaleString('en-US').split(','), unit: '' }
}

type BadgeButtonProps = HTMLMotionProps<'div'> & {
  transition?: SpringOptions
  formatted?: boolean
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  icon?: React.ReactElement
  prefix?: string
  suffix?: string
  value: number | string
}

function BadgeButton({
  ref,
  transition = { stiffness: 90, damping: 50 },
  icon: Icon,
  formatted = false,
  inView = false,
  inViewOnce = true,
  inViewMargin = '0px',
  prefix,
  suffix,
  value,
  className,
  ...props
}: BadgeButtonProps) {
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, transition)
  const motionNumberRef = React.useRef(0)
  const [, forceRender] = React.useReducer((x) => x + 1, 0)
  const localRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

  const segmentId = useId()
  const digitId = useId()

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })

  const isComponentInView = !inView || inViewResult

  const formattedResult = formatNumber(motionNumberRef.current, formatted)

  const renderNumberSegments = (segments: string[], unit: string, isGhost: boolean) => (
    <span className={cn('flex items-center gap-px', isGhost ? 'invisible' : '')}>
      {segments.map((segment) => (
        <React.Fragment key={segmentId}>
          {Array.from(segment).map((digit) => (
            <SlidingNumber key={`${segmentId}-${digitId}`} number={+digit} />
          ))}
        </React.Fragment>
      ))}

      {formatted && unit && <span className="leading-[1]">{unit}</span>}
    </span>
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest: number) => {
      const newValue = Math.round(latest)
      if (motionNumberRef.current !== newValue) {
        motionNumberRef.current = newValue
        forceRender()
      }
    })
    return () => unsubscribe()
  }, [springVal, value])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (typeof value === 'number' && value > 0) motionVal.set(value)
  }, [motionVal, value, isComponentInView])

  return (
    <motion.div
      ref={localRef}
      className={cn(
        "flex h-10 w-max shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-zinc-800/20 px-4 py-2 font-medium text-primary-foreground text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <div className="relative inline-flex size-[18px] shrink-0">{Icon ?? null}</div>
      <span className="relative inline-flex gap-1">
        {prefix ? <span>{prefix}</span> : null}
        {/* {typeof value === 'number' &&
          renderNumberSegments(ghostFormattedNumber.number, ghostFormattedNumber.unit, true)} */}
        {typeof value === 'number' &&
          renderNumberSegments(formattedResult.number, formattedResult.unit, false)}
        {typeof value === 'string' && value}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </motion.div>
  )
}

export { BadgeButton }
