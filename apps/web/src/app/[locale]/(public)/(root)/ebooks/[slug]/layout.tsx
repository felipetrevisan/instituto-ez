import NormalLayout from '@ez/web/components/layout/normal-layout'
import { ThemeScope } from '@ez/web/components/layout/theme-scope'
import { getEbookBySlug } from '@ez/web/server/get-ebook'
import type { ReactNode } from 'react'
import '../../../../../styles.css'

export default async function EbookLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const ebook = await getEbookBySlug(slug, locale)

  return (
    <ThemeScope theme={ebook?.theme}>
      <NormalLayout>{children}</NormalLayout>
    </ThemeScope>
  )
}
