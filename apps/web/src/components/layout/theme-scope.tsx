'use client'

import { mapThemeToCSSVars, type ThemeEbook } from '@ez/web/types/ebook'
import type { ReactNode } from 'react'

type ThemeScopeProps = {
  theme?: ThemeEbook
  children: ReactNode
}

export function ThemeScope({ theme, children }: ThemeScopeProps) {
  if (!theme) return <>{children}</>

  const cssVars = mapThemeToCSSVars(theme)

  const style = Object.entries(cssVars).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value) acc[key] = value
    return acc
  }, {})

  return (
    <div data-theme="dynamic" style={style}>
      {children}
    </div>
  )
}
