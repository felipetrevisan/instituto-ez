import { EbookPage } from '@ez/web/components/pages/ebook'
import { routing } from '@ez/web/i18n/routing'
import { isStripeConfigured } from '@ez/web/lib/stripe'
import {
  getEbookBySlug,
  getEbooks,
  getPaymentSettings,
  getTestimonials,
} from '@ez/web/server/catalog'
import { resolveCheckoutOptions, toPublicEbook } from '@ez/web/types/catalog'
import { buildAlternates } from '@ez/web/utils/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 300

type Params = Promise<{ slug: string; locale: string }>

export async function generateStaticParams() {
  const ebooks = await getEbooks()
  return routing.locales.flatMap((locale) => ebooks.map((ebook) => ({ locale, slug: ebook.slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await params
  const ebook = await getEbookBySlug(slug)
  if (!ebook) return {}

  const alternates = buildAlternates(locale, `/ebooks/${slug}`)
  const image = ebook.heroImage || ebook.cover
  const images = [{ url: image, alt: ebook.title }]

  return {
    title: ebook.title,
    description: ebook.description,
    alternates,
    openGraph: {
      title: ebook.title,
      description: ebook.description,
      type: 'article',
      locale,
      url: alternates.canonical,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: ebook.title,
      description: ebook.description,
      images: [image],
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const ebook = await getEbookBySlug(slug)
  if (!ebook) notFound()

  const [testimonials, settings] = await Promise.all([
    getTestimonials('ebooks', ebook.id),
    getPaymentSettings(),
  ])

  return (
    <EbookPage
      checkout={resolveCheckoutOptions(ebook, settings, isStripeConfigured)}
      currency={settings.currency}
      ebook={toPublicEbook(ebook)}
      testimonials={testimonials}
    />
  )
}
