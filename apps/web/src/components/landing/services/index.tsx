'use client'

import { Assessment } from '@ez/web/components/landing/services/assessment'
import { Benefits } from '@ez/web/components/landing/services/benefits'
import { FinalCTA } from '@ez/web/components/landing/services/final-cta'
import { Hero } from '@ez/web/components/landing/services/hero'
import { MethodsSession } from '@ez/web/components/landing/services/methods-session'
import { WhoIsItFor } from '@ez/web/components/landing/services/who-is-it-for'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionServicesAssessment,
  SectionServicesBenefits,
  SectionServicesCTA,
  SectionServicesMethodSessions,
  SectionServicesWhoIsItFor,
} from '@ez/web/types/landing/services'
import { useLocale } from 'next-intl'

export function LandingPageServices({ data }: { data: Landing<'services'> }) {
  const locale = useLocale()

  return (
    <FadeIn className="min-h-screen" inView={false}>
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'services.assessment') {
          return (
            <Assessment
              data={section as SectionServicesAssessment}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'services.methodsessions') {
          return (
            <MethodsSession
              data={section as SectionServicesMethodSessions}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'services.whoisitfor') {
          return (
            <WhoIsItFor
              data={section as SectionServicesWhoIsItFor}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'services.benefits') {
          return (
            <Benefits
              data={section as SectionServicesBenefits}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'services.cta') {
          return (
            <FinalCTA data={section as SectionServicesCTA} key={section._type} locale={locale} />
          )
        }

        return null
      })}
    </FadeIn>
  )
}
