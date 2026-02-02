import LandingPage from '@ez/web/app/[locale]/(public)/(root)/_landing-page'
import { resolveOpenGraphImage } from '@ez/web/config/image'
// import NormalPage from '@ez/web/app/[locale]/(public)/(root)/_normal-page'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { getLandingPage } from '@ez/web/server/get-landing'
import type { Landing } from '@ez/web/types/landing'
import { buildAlternates } from '@ez/web/utils/seo'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '../_loading'

function resolveLanding(slug: string) {
  return getAvailableLandingPages().find((landing) => landing.slug.includes(slug))
}

function resolveLandingOpenGraphImage(sections: Landing['sections']) {
  const sectionWithImage = sections?.find((section) =>
    Boolean(
      (section as { image?: { asset?: Parameters<typeof resolveOpenGraphImage>[0] } }).image?.asset,
    ),
  ) as { image?: { asset?: Parameters<typeof resolveOpenGraphImage>[0] } } | undefined

  if (!sectionWithImage?.image?.asset) return undefined

  return resolveOpenGraphImage(sectionWithImage.image.asset)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const t = await getTranslations({ locale, namespace: 'Errors' })
  const notFoundTitle = t('notFoundTitle')

  const landing = resolveLanding(slug)
  if (landing) {
    const data = await getLandingPage(slug, locale)
    if (!data) return { title: notFoundTitle }

    const { title, description } = data.settings
    const resolvedTitle = title?.[locale] ?? ''
    const resolvedDescription = description?.[locale]
    const alternates = buildAlternates(locale, `/${slug}`)
    const seoImage = data.settings?.image?.asset
      ? resolveOpenGraphImage(data.settings.image.asset)
      : undefined
    const ogImage = seoImage ?? resolveLandingOpenGraphImage(data.sections)
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
        type: 'website',
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

  return { title: notFoundTitle }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const landing = resolveLanding(slug)

  if (landing) {
    const data = await getLandingPage(slug, locale)
    
    if (!data) notFound()

    return (
      <Suspense fallback={<Loading />}>
        <LandingPage data={data} />
      </Suspense>
    )
  }

  return null
}
