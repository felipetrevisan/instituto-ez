import LandingPage from '@ez/web/app/[locale]/(public)/(root)/_landing-page'
// import NormalPage from '@ez/web/app/[locale]/(public)/(root)/_normal-page'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
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
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const landing = resolveLanding('home')
  if (landing) {
    const data = await getLandingPage('home', locale)
    if (!data) return { title: '404' }

    const { title, description, keywords } = data.settings
    return {
      title: title?.[locale] ?? '',
      description: description?.[locale] ?? '',
      keywords: keywords?.[locale] ?? '',
    }
  }

  return { title: '404' }

  // const data = await getPageBySlug('home', locale)
  // if (!data) return { title: '404' }

  // return {
  //   title: data.title?.[locale] ?? '',
  //   description: data.description?.[locale] ?? '',
  //   keywords: data.keywords?.[locale] ?? '',
  // }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const landing = resolveLanding('home')

  if (landing) {
    const data = await getLandingPage('home', locale)
    if (!data) notFound()

    return (
      <Suspense fallback={<Loading />}>
        <LandingPage data={data} />
      </Suspense>
    )
  }

  // const data = await getPageBySlug('home', locale)
  // if (!data) notFound()

  return null

  // return (
  //   <Suspense fallback={<Loading />}>
  //     <NormalPage data={data} slug="home" />
  //   </Suspense>
  // )
}
