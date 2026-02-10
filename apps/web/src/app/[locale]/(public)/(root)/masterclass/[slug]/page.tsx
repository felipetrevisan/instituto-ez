import { resolveOpenGraphImage } from '@ez/web/config/image'
import { locales } from '@ez/web/config/locale'
import { getMasterclassBySlug, getMasterclasses } from '@ez/web/server/get-masterclass'
import { buildAlternates } from '@ez/web/utils/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Content } from './_content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const t = await getTranslations({ locale, namespace: 'Errors' })
  const notFoundTitle = t('notFoundTitle')

  const data = await getMasterclassBySlug(slug, locale)
  if (!data) return { title: notFoundTitle }

  const resolvedTitle = data.seo?.title?.[locale] ?? data.title?.[locale] ?? ''
  const resolvedDescription =
    data.seo?.description?.[locale] ?? data.card?.description?.[locale] ?? ''

  const alternates = buildAlternates(locale, `/masterclass/${slug}`)
  const seoImageAsset = data.seo?.image?.asset
  const cardImageAsset = data.card?.image?.asset
  const ogImageAsset = seoImageAsset ?? cardImageAsset
  const ogImage = ogImageAsset ? resolveOpenGraphImage(ogImageAsset) : undefined
  const openGraphImages = ogImage
    ? [
        {
          ...ogImage,
          alt: resolvedTitle || ogImage.alt || '',
        },
      ]
    : undefined
  const twitterImages = openGraphImages?.map((image) => image.url)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      type: 'article',
      locale,
      url: alternates.canonical,
      images: openGraphImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: twitterImages,
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const data = await getMasterclassBySlug(slug, locale)

  if (!data) {
    notFound()
  }

  return <Content data={data} />
}

export async function generateStaticParams() {
  const items = await getMasterclasses()

  return items.flatMap((masterclass) =>
    locales
      .map((locale) => {
        const currentSlug = masterclass.slug?.[locale]?.current
        if (!currentSlug) return null
        return {
          slug: currentSlug,
          locale,
        }
      })
      .filter(Boolean),
  )
}
