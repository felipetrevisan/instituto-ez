'use client'

import { Experience } from '@ez/web/components/landing/immersion/experience'
import { FAQ } from '@ez/web/components/landing/immersion/faq'
import { FinalCTA } from '@ez/web/components/landing/immersion/final-cta'
import { Hero } from '@ez/web/components/landing/immersion/hero'
import { Instructor } from '@ez/web/components/landing/immersion/instructor'
import { Intro } from '@ez/web/components/landing/immersion/intro'
import { MainTarget } from '@ez/web/components/landing/immersion/main-target'
import { NextClass } from '@ez/web/components/landing/immersion/next-class'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionImmersionExperience,
  SectionImmersionFAQ,
  SectionImmersionFinalCTA,
  SectionImmersionInstructor,
  SectionImmersionIntro,
  SectionImmersionMainTarget,
  SectionImmersionNextClass,
} from '@ez/web/types/landing/immersion'
import { useLocale } from 'next-intl'

export function LandingPageImmersion({ data }: { data: Landing<'immersion'> }) {
  const locale = useLocale()

  return (
    <FadeIn className="min-h-screen" inView={false}>
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'immersion.intro') {
          return (
            <Intro data={section as SectionImmersionIntro} key={section._type} locale={locale} />
          )
        }

        if (section._type === 'immersion.instructor') {
          return (
            <Instructor
              data={section as SectionImmersionInstructor}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'immersion.experience') {
          return (
            <Experience
              data={section as SectionImmersionExperience}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'immersion.main-target') {
          return (
            <MainTarget
              data={section as SectionImmersionMainTarget}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'immersion.final-cta') {
          return (
            <FinalCTA
              data={section as SectionImmersionFinalCTA}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'immersion.faq') {
          return <FAQ data={section as SectionImmersionFAQ} key={section._type} locale={locale} />
        }

        if (section._type === 'immersion.next-class') {
          return (
            <NextClass
              data={section as SectionImmersionNextClass}
              key={section._type}
              locale={locale}
            />
          )
        }

        return null
      })}
    </FadeIn>
  )
}
