'use client'

import { Hero } from '@ez/web/components/landing/services/hero'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import { useLocale } from 'next-intl'

export function LandingPageServices({ data }: { data: Landing<'services'> }) {
  const locale = useLocale()

  return (
    <div className="min-h-screen">
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        // if (section._type === 'about.intro') {
        //   return <Intro data={section as SectionAboutIntro} key={section._type} locale={locale} />
        // }

        // if (section._type === 'about.services') {
        //   return (
        //     <Services data={section as SectionAboutServices} key={section._type} locale={locale} />
        //   )
        // }

        // if (section._type === 'about.whychoose') {
        //   return (
        //     <WhyChoose
        //       data={section as SectionAboutWhyChoose}
        //       key={section._type}
        //       locale={locale}
        //     />
        //   )
        // }

        return null
      })}
    </div>
  )
}
