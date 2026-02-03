import { resolveOpenGraphImage } from '@ez/web/config/image'
import { locales } from '@ez/web/config/locale'
import { getEbookBySlug, getEbooks } from '@ez/web/server/get-ebook'
import { getLandingPageSettings } from '@ez/web/server/get-landing-page-settings'
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

  const data = await getEbookBySlug(slug, locale)
  if (!data) return { title: notFoundTitle }

  const resolvedTitle = data.title?.[locale] ?? ''
  const rawSeoDescription = data.seo?.description
  const resolvedDescription =
    typeof rawSeoDescription === 'string'
      ? rawSeoDescription
      : (rawSeoDescription?.[locale] ?? data.description?.[locale])
  const alternates = buildAlternates(locale, `/ebooks/${slug}`)
  const seoImageAsset = data.seo?.image?.asset
  const ogImageAsset =
    seoImageAsset ??
    data.image?.[locale]?.large?.asset ??
    data.image?.[locale]?.preview?.asset ??
    data.image?.[locale]?.background?.asset
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

  const data = await getEbookBySlug(slug, locale)

  if (!data) {
    notFound()
  }

  const settings = await getLandingPageSettings()

  return <Content data={data} settings={settings} />
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
