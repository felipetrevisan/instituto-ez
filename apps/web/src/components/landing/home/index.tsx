'use client'

import { Development } from '@ez/web/components/landing/home/development'
import { DigitalProducts } from '@ez/web/components/landing/home/digital-products'
import { Hero } from '@ez/web/components/landing/home/hero'
import { Immersion } from '@ez/web/components/landing/home/immersion'
import { Mathematizers } from '@ez/web/components/landing/home/mathematizer'
import { MentorShip } from '@ez/web/components/landing/home/mentor-ship'
import { Services } from '@ez/web/components/landing/home/services'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionHomeDevelopment,
  SectionHomeDigitalProducts,
  SectionHomeImmersion,
  SectionHomeMathematizer,
  SectionHomeMentorShip,
  SectionHomeServices,
} from '@ez/web/types/landing/home'
import { useLocale } from 'next-intl'

export function LandingPageHome({ data }: { data: Landing<'home'> }) {
  const locale = useLocale()

  return (
    <FadeIn className="min-h-screen" inView={false}>
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'home.services') {
          return (
            <Services data={section as SectionHomeServices} key={section._type} locale={locale} />
          )
        }

        if (section._type === 'home.mentorship') {
          return (
            <MentorShip
              data={section as SectionHomeMentorShip}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.mathematizer') {
          return (
            <Mathematizers
              data={section as SectionHomeMathematizer}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.development') {
          return (
            <Development
              data={section as SectionHomeDevelopment}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.digitalproducts') {
          return (
            <DigitalProducts
              data={section as SectionHomeDigitalProducts}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.immersion') {
          return (
            <Immersion data={section as SectionHomeImmersion} key={section._type} locale={locale} />
          )
        }

        return null
      })}
    </FadeIn>
  )
}
