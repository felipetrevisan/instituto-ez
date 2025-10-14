import { locales } from '@ez/web/config/locale'
import { getEbookBySlug, getEbooks } from '@ez/web/server/get-ebook'
import { getLandingPageSettings } from '@ez/web/server/get-landing-page-settings'
import { getWorkshops } from '@ez/web/server/get-workshop'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Content } from './_content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const { title, seo } = await getWorkshopBySlug(slug, locale)

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

  const data = await getWorkshopBySlug(slug, locale)

  if (!data) {
    notFound()
  }

  return <Content data={data} />
}

export async function generateStaticParams() {
  const workshops = await getWorkshops()

  return workshops.flatMap((workshop) =>
    locales
      .map((locale) => {
        const currentSlug = workshop.slug?.[locale]?.current
        if (!currentSlug) return null
        return {
          slug: currentSlug,
          locale,
        }
      })
      .filter(Boolean),
  )
}
