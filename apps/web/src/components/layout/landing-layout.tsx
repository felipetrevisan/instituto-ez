import BaseLanding from '@ez/web/components/landing/base'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import type { Landing } from '@ez/web/types/landing'

export default async function LandingLayout({
  children,
  pageKey,
  settings,
}: {
  children: React.ReactNode
  pageKey: string
  settings?: Landing
  locale: string
}) {
  const data = await getSiteConfig()

  return (
    <BaseLanding settings={settings} site={data} theme={pageKey}>
      {children}
    </BaseLanding>
  )
}
