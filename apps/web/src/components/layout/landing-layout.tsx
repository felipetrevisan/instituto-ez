import { BaseLanding } from '@ez/web/components/landing/base'
export default async function LandingLayout({
  children,
  pageKey,
}: {
  children: React.ReactNode
  pageKey: string
  locale: string
}) {
  return <BaseLanding theme={pageKey}>{children}</BaseLanding>
}
