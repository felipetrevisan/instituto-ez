'use client'

import { cn } from '@ez/shared/lib/utils'
import { motion, type UseInViewOptions, useInView } from 'motion/react'
import * as React from 'react'

function CursorBlinker({ className }: { className?: string }) {
  return (
    <motion.span
      animate="blinking"
      className={cn('inline-block h-5 w-[1px] translate-y-1 bg-black dark:bg-white', className)}
      data-slot="cursor-blinker"
      variants={{
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1],
          },
        },
      }}
    />
  )
}

type TypingTextProps<T extends React.ElementType = 'span'> = {
  asChild?: T
  duration?: number
  delay?: number
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  inViewOnce?: boolean
  cursor?: boolean
  loop?: boolean
  holdDelay?: number
  text: string | string[]
  cursorClassName?: string
  animateOnChange?: boolean
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'as'>

function TypingText<T extends React.ElementType = 'span'>({
  ref,
  asChild,
  duration = 100,
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  cursor = false,
  loop = false,
  holdDelay = 1000,
  text,
  cursorClassName,
  animateOnChange = true,
  ...props
}: TypingTextProps<T>) {
  const localRef = React.useRef<HTMLElement>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLElement)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })
  const isInView = !inView || inViewResult

  const [started, setStarted] = React.useState(false)
  const [displayedText, setDisplayedText] = React.useState<string>('')

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  React.useEffect(() => {
    // Reset animation when text changes (if animateOnChange is true)
    if (animateOnChange) {
      setStarted(false)
      setDisplayedText('')
    }

    if (isInView) {
      const timeoutId = setTimeout(() => {
        setStarted(true)
      }, delay)
      return () => clearTimeout(timeoutId)
    }
    const timeoutId = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(timeoutId)
  }, [isInView, delay, ...(animateOnChange ? [text] : [])])

  React.useEffect(() => {
    if (!started) return
    const timeoutIds: Array<ReturnType<typeof setTimeout>> = []
    const texts: string[] = typeof text === 'string' ? [text] : text

    const typeText = (str: string, onComplete: () => void) => {
      let currentIndex = 0
      const type = () => {
        if (currentIndex <= str.length) {
          setDisplayedText(str.substring(0, currentIndex))
          currentIndex++
          const id = setTimeout(type, duration)
          timeoutIds.push(id)
        } else {
          onComplete()
        }
      }
      type()
    }

    const eraseText = (str: string, onComplete: () => void) => {
      let currentIndex = str.length
      const erase = () => {
        if (currentIndex >= 0) {
          setDisplayedText(str.substring(0, currentIndex))
          currentIndex--
          const id = setTimeout(erase, duration)
          timeoutIds.push(id)
        } else {
          onComplete()
        }
      }
      erase()
    }

    const animateTexts = (index: number) => {
      typeText(texts[index] ?? '', () => {
        const isLast = index === texts.length - 1
        if (isLast && !loop) {
          return
        }
        const id = setTimeout(() => {
          eraseText(texts[index] ?? '', () => {
            const nextIndex = isLast ? 0 : index + 1
            animateTexts(nextIndex)
          })
        }, holdDelay)
        timeoutIds.push(id)
      })
    }

    animateTexts(0)

    return () => {
      timeoutIds.forEach(clearTimeout)
    }
  }, [text, duration, started, loop, holdDelay])

  const Component = asChild || 'span'

  return (
    <Component data-slot="typing-text" ref={localRef} {...props}>
      <motion.span>{displayedText}</motion.span>
      {cursor && <CursorBlinker className={cursorClassName} />}
    </Component>
  )
}

export { TypingText, type TypingTextProps }
