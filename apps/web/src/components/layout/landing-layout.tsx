import { BaseLanding } from '@ez/web/components/landing/base'
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
  return (
    <BaseLanding settings={settings} theme={pageKey}>
      {children}
    </BaseLanding>
  )
}
