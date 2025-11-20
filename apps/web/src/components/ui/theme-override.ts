'use client'

import { useEffect } from 'react'

export function ThemeOverride({ mode }: { mode: 'light' | 'dark' }) {
  useEffect(() => {
    const el = document.documentElement
    el.setAttribute('data-force-theme', mode)
    return () => {
      el.removeAttribute('data-force-theme')
    }
  }, [mode])

  return null
}
