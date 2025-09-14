'use client'

import { animate } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ScrollToHash() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const el = document.querySelector(hash)
    if (!el) return

    const top = el.getBoundingClientRect().top + window.scrollY

    animate(window.scrollY, top, {
      duration: 0.7,
      ease: 'easeInOut',
      onUpdate: (latest) => window.scrollTo({ top: latest, left: 0 }),
    })
  }, [pathname, searchParams])

  return null
}
