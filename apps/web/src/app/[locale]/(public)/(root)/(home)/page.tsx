import { pages } from '@ez/web/components/pages/registry'
import { pageMeta } from '@ez/web/content/seo'
import { buildAlternates } from '@ez/web/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { title, description } = pageMeta.home
  const alternates = buildAlternates(locale, '/')

  return {
    title,
    description,
    alternates,
    openGraph: { title, description, type: 'website', locale, url: alternates.canonical },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export const revalidate = 300

export default function Page() {
  return pages.home()
}
