import LandingPage from '@ez/web/app/[locale]/(public)/(root)/_landing-page'
// import NormalPage from '@ez/web/app/[locale]/(public)/(root)/_normal-page'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { locales } from '@ez/web/config/locale'
import { getLandingPage } from '@ez/web/server/get-landing'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '../_loading'

function resolveLanding(slug: string) {
  return getAvailableLandingPages().find((landing) => landing.slug.includes(slug))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const landing = resolveLanding(slug)
  if (landing) {
    const data = await getLandingPage(slug, locale)
    if (!data) return { title: '404' }

    const { title, description, keywords } = data.settings
    return {
      title: title?.[locale] ?? '',
      description: description?.[locale] ?? '',
      keywords: keywords?.[locale] ?? '',
    }
  }

  // const data = await getPageBySlug(slug, locale)
  // if (!data) return { title: '404' }

  // return {
  //   title: data.title?.[locale] ?? '',
  //   description: data.description?.[locale] ?? '',
  //   keywords: data.keywords?.[locale] ?? '',
  // }

  return { title: '404' }
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

  // const data = await getPageBySlug(slug, locale)
  // if (!data) notFound()

  // return (
  //   <Suspense fallback={<Loading />}>
  //     <NormalPage data={data} slug={slug} />
  //   </Suspense>
  // )
}