'use client'

import { Hero } from '@ez/web/components/landing/about/hero'
import { Intro } from '@ez/web/components/landing/about/intro'
import { Services } from '@ez/web/components/landing/about/services'
import { WhyChoose } from '@ez/web/components/landing/about/why-choose'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionAboutIntro,
  SectionAboutServices,
  SectionAboutWhyChoose,
} from '@ez/web/types/landing/about'
import { useLocale } from 'next-intl'

export function LandingPageAbout({ data }: { data: Landing<'about'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'about.intro') {
          return <Intro data={section as SectionAboutIntro} key={section._type} locale={locale} />
        }

        if (section._type === 'about.services') {
          return (
            <Services data={section as SectionAboutServices} key={section._type} locale={locale} />
          )
        }

        if (section._type === 'about.whychoose') {
          return (
            <WhyChoose
              data={section as SectionAboutWhyChoose}
              key={section._type}
              locale={locale}
            />
          )
        }

        // if (section._type === 'mentoring.cta') {
        //   return (
        //     <FinalCTA data={section as SectionMentoringCTA} key={section._type} locale={locale} />
        //   )
        // }

        return null
      })}
    </div>
  )
}
