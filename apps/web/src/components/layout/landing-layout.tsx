import * as App from '@ez/web/components/app'
import { HeaderLandingNavigation } from '@ez/web/components/navigation/landing/header'
import { getSiteConfig } from '@ez/web/server/get-site-config'
import type { Navigation } from '@ez/web/types/site'
import { Inter, Oswald, Questrial } from 'next/font/google'

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

export default async function LandingLayout({
  children,
  pageKey,
  navigation,
  locale,
}: {
  children: React.ReactNode
  pageKey: string
  navigation?: Navigation
  locale: string
}) {
  const data = await getSiteConfig()

  return (
    <html
      className={`${inter.variable} ${oswald.variable} ${questrial.variable}`}
      lang={locale}
      suppressHydrationWarning
    >
      <body data-page="landing" data-theme={pageKey}>
        <App.Header
          customNavigation={navigation}
          data={data}
          HeaderComponent={HeaderLandingNavigation}
          pageKey={pageKey}
          theme="landing"
        />
        {children}
        <App.Footer />
      </body>
    </html>
  )
}
