import LandingLayout from '@ez/web/components/layout/landing-layout'
import NormalLayout from '@ez/web/components/layout/normal-layout'
import { getLandingPageSettingsBySlug } from '@ez/web/server/get-page'
import type { ReactNode } from 'react'

import '../../../../styles.css'

export default async function PageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const data = await getLandingPageSettingsBySlug(slug, locale)

  if (data && data.type === 'landing') {
    return (
      <LandingLayout locale={locale} navigation={data.navigation} pageKey={data.key}>
        {children}
      </LandingLayout>
    )
  }

  return <NormalLayout>{children}</NormalLayout>
}
