'use client'

import { ExpectedResults } from '@ez/web/components/landing/mentory/expected-results'
import { FinalCTA } from '@ez/web/components/landing/mentory/final-cta'
import { Hero } from '@ez/web/components/landing/mentory/hero'
import { Intro } from '@ez/web/components/landing/mentory/intro'
import { MethodsStep } from '@ez/web/components/landing/mentory/methods-step'
import { TargetAudience } from '@ez/web/components/landing/mentory/target-audience'
import './style.css'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionMentoringCTA,
  SectionMentoringExpectedResults,
  SectionMentoringIntro,
  SectionMentoringMethodsStep,
  SectionMentoringTargetAudience,
} from '@ez/web/types/landing/mentoring'
import { useLocale } from 'next-intl'

export function LandingPageMentory({ data }: { data: Landing<'mentoring'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'mentoring.intro') {
          return (
            <Intro data={section as SectionMentoringIntro} key={section._type} locale={locale} />
          )
        }

        if (section._type === 'mentoring.methodsstep') {
          return (
            <MethodsStep
              data={section as SectionMentoringMethodsStep}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mentoring.targetaudience') {
          return (
            <TargetAudience
              data={section as SectionMentoringTargetAudience}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mentoring.expectedresults') {
          return (
            <ExpectedResults
              data={section as SectionMentoringExpectedResults}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'mentoring.cta') {
          return (
            <FinalCTA
              data={section as SectionMentoringCTA}
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
