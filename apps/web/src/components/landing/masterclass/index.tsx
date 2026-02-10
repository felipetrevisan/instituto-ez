'use client'

import { Catalog } from '@ez/web/components/landing/masterclass/catalog'
import { Expert } from '@ez/web/components/landing/masterclass/expert'
import { FinalCTA } from '@ez/web/components/landing/masterclass/final-cta'
import { ForWho } from '@ez/web/components/landing/masterclass/for-who'
import { Hero } from '@ez/web/components/landing/masterclass/hero'
import { Problem } from '@ez/web/components/landing/masterclass/problem'
import type { Landing } from '@ez/web/types/landing'
import type {
  SectionMasterclassCatalog,
  SectionMasterclassExpert,
  SectionMasterclassFinalCTA,
  SectionMasterclassForWho,
  SectionMasterclassHero,
  SectionMasterclassProblem,
} from '@ez/web/types/landing/masterclass'
import { useLocale } from 'next-intl'

export function LandingPageMasterclass({ data }: { data: Landing<'masterclass'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'masterclass.hero') {
          return (
            <Hero data={section as SectionMasterclassHero} key={section._type} locale={locale} />
          )
        }

        if (section._type === 'masterclass.for-who') {
          return (
            <ForWho
              data={section as SectionMasterclassForWho}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'masterclass.problem') {
          return (
            <Problem
              data={section as SectionMasterclassProblem}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'masterclass.expert') {
          return (
            <Expert
              data={section as SectionMasterclassExpert}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'masterclass.final-cta') {
          return (
            <FinalCTA
              data={section as SectionMasterclassFinalCTA}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'masterclass.catalog') {
          return (
            <Catalog
              data={section as SectionMasterclassCatalog}
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
