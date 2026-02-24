'use client'

import { Development } from '@ez/web/components/landing/home/development'
import { DigitalProducts } from '@ez/web/components/landing/home/digital-products'
import { Hero } from '@ez/web/components/landing/home/hero'
import { Immersion } from '@ez/web/components/landing/home/immersion'
import { Mathematizers } from '@ez/web/components/landing/home/mathematizer'
import { MentorShip } from '@ez/web/components/landing/home/mentor-ship'
import { Services } from '@ez/web/components/landing/home/services'
import { Testimonials } from '@ez/web/components/landing/home/testimonials'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useSite } from '@ez/web/hooks/use-site'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionHomeDevelopment,
  SectionHomeDigitalProducts,
  SectionHomeImmersion,
  SectionHomeMathematizer,
  SectionHomeMentorShip,
  SectionHomeServices,
  SectionHomeTestimonials,
} from '@ez/web/types/landing/home'
import { getHomeComingSoonMap } from '@ez/web/utils/coming-soon'
import { useLocale } from 'next-intl'

export function LandingPageHome({ data }: { data: Landing<'home'> }) {
  const locale = useLocale()
  const { data: site } = useSite()
  const comingSoon = getHomeComingSoonMap(site?.navigation?.header)

  return (
    <FadeIn className="min-h-screen" inView={false}>
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'home.services') {
          return (
            <Services
              comingSoon={comingSoon.services}
              data={section as SectionHomeServices}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.mentorship') {
          return (
            <MentorShip
              comingSoon={comingSoon.mentorship}
              data={section as SectionHomeMentorShip}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.mathematizer') {
          return (
            <Mathematizers
              comingSoon={comingSoon.mathematizer}
              data={section as SectionHomeMathematizer}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.development') {
          return (
            <Development
              comingSoon={comingSoon.development}
              data={section as SectionHomeDevelopment}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.digitalproducts') {
          return (
            <DigitalProducts
              comingSoon={comingSoon.digitalProducts}
              data={section as SectionHomeDigitalProducts}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.immersion') {
          return (
            <Immersion
              comingSoon={comingSoon.immersion}
              data={section as SectionHomeImmersion}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'home.testimonials') {
          return (
            <Testimonials
              data={section as SectionHomeTestimonials}
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
