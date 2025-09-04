'use client'

import { Star } from 'lucide-react'
import {
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
  type UseInViewOptions,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'
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

type BadgeStarButtonProps = HTMLMotionProps<'div'> & {
  numberOfStars?: number
  transition?: SpringOptions
  formatted?: boolean
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
}

function BadgeStarButton({
  ref,
  transition = { stiffness: 90, damping: 50 },
  numberOfStars = 0,
  formatted = false,
  inView = false,
  inViewOnce = true,
  inViewMargin = '0px',
  className,
  ...props
}: BadgeStarButtonProps) {
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, transition)
  const motionNumberRef = React.useRef(0)
  const isCompletedRef = React.useRef(false)
  const [, forceRender] = React.useReducer((x) => x + 1, 0)
  const [stars, setStars] = React.useState(numberOfStars)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [displayParticles, setDisplayParticles] = React.useState(false)

  const handleDisplayParticles = React.useCallback(() => {
    setDisplayParticles(true)
    setTimeout(() => setDisplayParticles(false), 1500)
  }, [])

  const localRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })
  const isComponentInView = !inView || inViewResult

  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest: number) => {
      const newValue = Math.round(latest)
      if (motionNumberRef.current !== newValue) {
        motionNumberRef.current = newValue
        forceRender()
      }
      if (stars !== 0 && newValue >= stars && !isCompletedRef.current) {
        isCompletedRef.current = true
        setIsCompleted(true)
        handleDisplayParticles()
      }
    })
    return () => unsubscribe()
  }, [springVal, stars, handleDisplayParticles])

  React.useEffect(() => {
    if (stars > 0 && isComponentInView) motionVal.set(stars)
  }, [motionVal, stars, isComponentInView])

  const fillPercentage = Math.min(100, (motionNumberRef.current / stars) * 100)
  const formattedResult = formatNumber(motionNumberRef.current, formatted)
  const ghostFormattedNumber = formatNumber(stars, formatted)

  const renderNumberSegments = (segments: string[], unit: string, isGhost: boolean) => (
    <span
      className={cn('flex items-center gap-px', isGhost ? 'invisible' : 'absolute top-0 left-20')}
    >
      {segments.map((segment, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <React.Fragment key={index}>
          {Array.from(segment).map((digit, digitIndex) => (
            <SlidingNumber
              key={`${index}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                digitIndex
              }`}
              number={+digit}
            />
          ))}
        </React.Fragment>
      ))}

      {formatted && unit && <span className="leading-[1]">{unit}</span>}
    </span>
  )

  return (
    <motion.div
      ref={localRef}
      className={cn(
        "flex h-10 w-[150px] shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-zinc-800/20 px-4 py-2 font-medium text-primary-foreground text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <div className="relative inline-flex size-[18px] shrink-0">
        <Star
          className="fill-muted-foreground text-muted-foreground"
          size={18}
          aria-hidden="true"
        />
        <Star
          className="absolute top-0 left-0 fill-yellow-500 text-yellow-500"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
          }}
        />
        <Star
          className="absolute top-0 left-5 fill-yellow-500 text-yellow-500"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
          }}
        />
        <Star
          className="absolute top-0 left-10 fill-yellow-500 text-yellow-500"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
          }}
        />
        <Star
          className="absolute top-0 left-15 fill-yellow-500 text-yellow-500"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
          }}
        />
        <Star
          className="absolute top-0 left-20 fill-yellow-500 text-yellow-500"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
          }}
        />
        <AnimatePresence>
          {displayParticles && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%)',
                }}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 10px 2px rgba(255,215,0,0.6)' }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {[...Array(6)].map((_, i) => (
                <motion.div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-yellow-500"
                  initial={{ x: '50%', y: '50%', scale: 0, opacity: 0 }}
                  animate={{
                    x: `calc(50% + ${Math.cos((i * Math.PI) / 3) * 30}px)`,
                    y: `calc(50% + ${Math.sin((i * Math.PI) / 3) * 30}px)`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      <span className="relative inline-flex">
        {renderNumberSegments(ghostFormattedNumber.number, ghostFormattedNumber.unit, true)}
        {renderNumberSegments(formattedResult.number, formattedResult.unit, false)}
      </span>
    </motion.div>
  )
}

export { BadgeStarButton }
