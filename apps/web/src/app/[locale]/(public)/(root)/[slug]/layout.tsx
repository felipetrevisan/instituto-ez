import LandingLayout from '@ez/web/components/layout/landing-layout'
import NormalLayout from '@ez/web/components/layout/normal-layout'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { getLandingPage } from '@ez/web/server/get-landing'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import '../../../../styles.css'

function resolveLanding(slug: string) {
  return getAvailableLandingPages().find((landing) => landing.slug.includes(slug))
}

export default async function PageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const landing = resolveLanding(slug)

  if (landing) {
    const data = await getLandingPage(slug, locale)

    if (!data) notFound()

    return (
      <LandingLayout locale={locale} pageKey={data.key} settings={data}>
        {children}
      </LandingLayout>
    )
  }

  return <NormalLayout>{children}</NormalLayout>
}
