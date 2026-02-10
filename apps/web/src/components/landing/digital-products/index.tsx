'use client'

import { CatalogEbooks } from '@ez/web/components/landing/digital-products/catalog-ebooks'
import { FinalCTA } from '@ez/web/components/landing/digital-products/final-cta'
import { Hero } from '@ez/web/components/landing/digital-products/hero'
import type { Landing } from '@ez/web/types/landing'
import type {
  SectionDigitalProductsCTA,
  SectionDigitalProductsEbooksCatalog,
  SectionDigitalProductsHero,
} from '@ez/web/types/landing/digital-products'
import { useLocale } from 'next-intl'

export function LandingPageDigitalProducts({ data }: { data: Landing<'digital-products'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'digital-products.hero') {
          return (
            <Hero
              data={section as SectionDigitalProductsHero}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'digital-products.ebooks') {
          return (
            <CatalogEbooks
              data={section as SectionDigitalProductsEbooksCatalog}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'digital-products.cta') {
          return (
            <FinalCTA
              data={section as SectionDigitalProductsCTA}
              key={section._type}
              locale={locale}
            />
          )
        }

        return null
      })}
    </div>
  )
}
