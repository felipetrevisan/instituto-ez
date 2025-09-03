import { getEbookBySlug, getEbooks } from '@ez/web/server/get-ebook'
import { getLandingPageSettings } from '@ez/web/server/get-landing-page-settings'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Content } from './_content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const { title, seo } = await getEbookBySlug(slug)

  return {
    title: `${title}`,
    description: seo.description,
    keywords: seo.keywords,
  }
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const data = await getEbookBySlug(slug)

  if (!data) {
    notFound()
  }
  
  const { sections } = await getLandingPageSettings()


  return <Content data={data} sections={sections} />
}

export async function generateStaticParams() {
  const ebooks = await getEbooks()

  return ebooks.map((ebook) => ({
    slug: ebook.slug,
  }))
}
