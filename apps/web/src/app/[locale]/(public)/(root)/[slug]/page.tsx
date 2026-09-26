import { pages, resolvePageKey } from '@ez/web/components/pages/registry'
import { landingSlugs } from '@ez/web/config/landing-slugs'
import { pageMeta } from '@ez/web/content/seo'
import { routing } from '@ez/web/i18n/routing'
import { buildAlternates } from '@ez/web/utils/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 300

type Params = Promise<{ slug: string; locale: string }>

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    landingSlugs.filter((slug) => slug !== '/').map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await params
  const key = resolvePageKey(slug)
  if (!key) return {}

  const { title, description } = pageMeta[key]
  const alternates = buildAlternates(locale, `/${slug}`)

  return {
    title,
    description,
    alternates,
    openGraph: { title, description, type: 'website', locale, url: alternates.canonical },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const key = resolvePageKey(slug)
  if (!key) notFound()

  return pages[key]()
}
