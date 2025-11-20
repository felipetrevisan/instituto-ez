import LandingPage from '@ez/web/app/[locale]/(public)/(root)/[slug]/_landing-page'
import NormalPage from '@ez/web/app/[locale]/(public)/(root)/[slug]/_normal-page'
import { locales } from '@ez/web/config/locale'
import { getPageBySlug, getPages } from '@ez/web/server/get-page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './_loading'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const data = await getPageBySlug(slug, locale)

  if (!data) {
    return {
      title: '404',
    }
  }

  const { title, description, keywords } = data

  return {
    title: title?.[locale] || '',
    description: description?.[locale] || '',
    keywords: keywords?.[locale] || '',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params

  const data = await getPageBySlug(slug, locale)

  if (!data) {
    notFound()
  }

  return (
    <Suspense fallback={<Loading />}>
      {data.type === 'page' ? <NormalPage data={data} slug={slug} /> : <LandingPage data={data} />}
    </Suspense>
  )
}

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.flatMap((page) =>
    locales
      .map((locale) => {
        const currentSlug = page.slug?.[locale]?.current
        if (!currentSlug) return null
        return {
          slug: currentSlug,
          locale,
        }
      })
      .filter(Boolean),
  )
}
