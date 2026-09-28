import type { LandingSlugKey } from '@ez/web/config/landing-slugs'
import { landingSlugsByKey } from '@ez/web/config/landing-slugs'
import { getEbooks, getPaymentSettings, getTestimonials } from '@ez/web/server/catalog'
import { toPublicEbook } from '@ez/web/types/catalog'
import type { ReactElement } from 'react'
import { AboutPage } from './about'
import { DigitalProductsPage } from './digital-products'
import { HomePage } from './home'
import { HumanDevelopmentPage } from './human-development'
import { ImmersionPage } from './immersion'
import { MasterclassPage } from './masterclass'
import { MathematizerPage } from './mathematizer'
import { MentoringPage } from './mentoring'
import { PrivacyPage } from './privacy'
import { ServicesPage } from './services'

/** Cada página carrega no servidor apenas os dados dinâmicos (Firebase) de que precisa. */
export const pages: Record<LandingSlugKey, () => Promise<ReactElement>> = {
  home: async () => {
    const [testimonials, ebooks] = await Promise.all([getTestimonials('home'), getEbooks()])
    return (
      <HomePage
        featuredEbook={ebooks[0] ? toPublicEbook(ebooks[0]) : null}
        testimonials={testimonials}
      />
    )
  },
  about: async () => <AboutPage />,
  services: async () => <ServicesPage />,
  mentoring: async () => <MentoringPage />,
  mathematizer: async () => <MathematizerPage />,
  'for-business': async () => <HumanDevelopmentPage />,
  immersion: async () => <ImmersionPage testimonials={await getTestimonials('immersion')} />,
  masterclass: async () => <MasterclassPage />,
  privacy: async () => <PrivacyPage />,
  'digital-products': async () => {
    const [ebooks, settings] = await Promise.all([getEbooks(), getPaymentSettings()])
    return <DigitalProductsPage currency={settings.currency} ebooks={ebooks.map(toPublicEbook)} />
  },
}

export function resolvePageKey(slug: string): LandingSlugKey | undefined {
  const entries = Object.entries(landingSlugsByKey) as [LandingSlugKey, readonly string[]][]
  return entries.find(([, slugs]) => slugs.includes(slug))?.[0]
}
