import { locales } from '@ez/web/config/locale'
import { getEbookBySlug, getEbooks } from '@ez/web/server/get-ebook'
import { getLandingPageSettings } from '@ez/web/server/get-landing-page-settings'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Content } from './_content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const { title, seo } = await getEbookBySlug(slug, locale)

  return {
    title: title?.[locale] || '',
    description: seo.description?.[locale] || '',
    keywords: seo.keywords?.[locale] || '',
  }
}

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const data = await getEbookBySlug(slug, locale)

  if (!data) {
    notFound()
  }

  const { sections } = await getLandingPageSettings()

  return <Content data={data} sections={sections} />
}

export async function generateStaticParams() {
  const ebooks = await getEbooks()

  return ebooks.flatMap((ebook) =>
    locales
      .map((locale) => {
        const currentSlug = ebook.slug?.[locale]?.current
        if (!currentSlug) return null
        return {
          slug: currentSlug,
          locale,
        }
      })
      .filter(Boolean),
  )
}
