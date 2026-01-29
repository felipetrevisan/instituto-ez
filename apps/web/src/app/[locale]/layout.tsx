import { routing } from '@ez/web/i18n/routing'
import { resolveOpenGraphImage } from '@ez/web/config/image'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import { getMetadataBase } from '@ez/web/utils/seo'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter, Oswald, Questrial } from 'next/font/google'
import { type Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import Providers from './providers'
import '../styles.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
})

const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-questrial',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const settings = await getSiteConfig()
  const { locale } = await params

  const title = settings?.title[locale] || 'Instituto Enzo'
  const description = settings?.description?.[locale]
  const keywords = settings?.keywords?.[locale]
  const ogImage = settings?.seoImage?.asset
    ? resolveOpenGraphImage(settings.seoImage.asset)
    : undefined
  const openGraphImages = ogImage
    ? [
        {
          ...ogImage,
          alt: title || ogImage.alt || '',
        },
      ]
    : undefined

  return {
    metadataBase: getMetadataBase(),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    keywords,
    openGraph: {
      title,
      description,
      siteName: title,
      locale,
      type: 'website',
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(openGraphImages ? { images: openGraphImages.map((image) => image.url) } : {}),
    },
  }
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html
      className={`${inter.variable} ${oswald.variable} ${questrial.variable}`}
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className="flex h-full flex-col overflow-x-hidden bg-background text-foreground antialiased"
        data-page="main"
      >
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
