import { routing } from '@ez/web/i18n/routing'
import { getSiteSettings } from '@ez/web/server/catalog'
import { DEFAULT_FAVICON } from '@ez/web/types/site'
import { getMetadataBase } from '@ez/web/utils/seo'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Instrument_Serif, Inter, Sora } from 'next/font/google'
import { type Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import Providers from './providers'
import '../styles.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-serif',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSiteSettings()
  const title = settings.name
  const description = settings.description
  const icon = settings.favicon || DEFAULT_FAVICON

  return {
    metadataBase: getMetadataBase(),
    title: { template: `%s | ${title}`, default: title },
    description,
    icons: { icon, shortcut: icon, apple: settings.favicon || settings.logo },
    openGraph: { title, description, siteName: title, locale, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
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
      className={`${inter.variable} ${sora.variable} ${instrumentSerif.variable}`}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden bg-[#03050d] text-white antialiased" data-page="main">
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
