'use client'

import { PageType } from '@ez/shared/types/global'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { useApp } from '@ez/web/hooks/use-app'
import type { Landing } from '@ez/web/types/landing'
import { useEffect } from 'react'

export default function LandingPage({ data }: { data: Landing }) {
  const { setPageType, isLandingPage } = useApp()
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional non-exhaustive deps
  useEffect(() => {
    if (isLandingPage()) return

    setPageType(PageType.landing)
  }, [])

  const available = getAvailableLandingPages()

  const landing = available.find((p) => p.key === data.key)

  if (!landing) return null

  const Component = landing.component

  return <Component data={data} />
}
