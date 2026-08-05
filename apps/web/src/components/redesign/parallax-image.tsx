'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from './gsap'
import { usePrefersReducedMotion } from './use-reduced-motion'

type ParallaxImageProps = ImageProps & {
  containerClassName?: string
}

export function ParallaxImage({
  containerClassName,
  className,
  ...imageProps
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -18, scale: 1.35 },
        {
          yPercent: 18,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      )
    }, container)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div className={containerClassName} ref={containerRef} style={{ overflow: 'hidden' }}>
      <Image className={className} ref={imgRef} {...imageProps} />
    </div>
  )
}
