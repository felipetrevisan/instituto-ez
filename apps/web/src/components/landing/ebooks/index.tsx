'use client'

import { Catalog } from '@ez/web/components/landing/ebooks/catalog'
import { Hero } from '@ez/web/components/landing/ebooks/hero'
import type { Landing } from '@ez/web/types/landing'
import type { SectionEbooksCatalog, SectionEbooksHero } from '@ez/web/types/landing/ebooks'
import { useLocale } from 'next-intl'

export function LandingPageEbooks({ data }: { data: Landing<'ebooks'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'ebooks.hero') {
          return <Hero data={section as SectionEbooksHero} key={section._type} locale={locale} />
        }

        if (section._type === 'ebooks.catalog') {
          return (
            <Catalog data={section as SectionEbooksCatalog} key={section._type} locale={locale} />
          )
        }

        return null
      })}
    </div>
  )
}
