'use client'

import { Benefits } from '@ez/web/components/landing/mathematizer/benefits'
import { FinalCTA } from '@ez/web/components/landing/mathematizer/final-cta'
import { Hero } from '@ez/web/components/landing/mathematizer/hero'
import { Mathematizer } from '@ez/web/components/landing/mathematizer/mathematizer'
import { WhatIs } from '@ez/web/components/landing/mathematizer/what-is'
import { WhyCompaniesNeed } from '@ez/web/components/landing/mathematizer/why-companies-need'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type { SectionMathematizerBenefits, SectionMathematizerCTA, SectionMathematizerMathematizer, SectionMathematizerWhatIs, SectionMathematizerWhyCompanyNeed } from '@ez/web/types/landing/mathematizer'
import { useLocale } from 'next-intl'

import './style.css'

export function LandingPageMathematizer({ data }: { data: Landing<'mathematizer'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'mathematizer.whatis') {
          return (
            <WhatIs
              data={section as SectionMathematizerWhatIs}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mathematizer.mathematizer') {
          return (
            <Mathematizer
              data={section as SectionMathematizerMathematizer}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mathematizer.whycompanyneed') {
          return (
            <WhyCompaniesNeed
              data={section as SectionMathematizerWhyCompanyNeed}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mathematizer.benefits') {
          return (
            <Benefits
              data={section as SectionMathematizerBenefits}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mathematizer.cta') {
          return (
            <FinalCTA
              data={section as SectionMathematizerCTA}
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
