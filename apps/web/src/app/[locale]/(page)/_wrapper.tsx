'use client'

import { cn } from '@ez/shared/lib/utils'
import { useApp } from '@ez/web/hooks/use-app'
import type { ReactNode } from 'react'

export default function Wrapper({ children }: { children: ReactNode }) {
  const { isLandingPage } = useApp()

  return <div className={cn({'bg-white': isLandingPage() })}>{children}</div>
}
