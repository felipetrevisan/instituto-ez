import { ScrollToHash } from '@ez/web/components/scroll-to-hash'
import { locales } from '@ez/web/config/locale'
import { getPageBySlug, getPages } from '@ez/web/server/get-page'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Content } from './_content'
import Loading from './_loading'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const { title, description, keywords } = await getPageBySlug(slug, locale)

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

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center space-y-14">
      <div className="relative flex w-screen flex-col items-center justify-center gap-20">
        <Suspense fallback={<Loading />}>
          <ScrollToHash />
          <Content data={data} slug={slug} />
        </Suspense>
      </div>
    </div>
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
