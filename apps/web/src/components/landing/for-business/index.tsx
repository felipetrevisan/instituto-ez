'use client'

import { Consulting } from '@ez/web/components/landing/for-business/consulting'
import { Courses } from '@ez/web/components/landing/for-business/courses'
import { Diagnostic } from '@ez/web/components/landing/for-business/diagnostics'
import { FinalCTA } from '@ez/web/components/landing/for-business/final-cta'
import { Hero } from '@ez/web/components/landing/for-business/hero'
import { Lectures } from '@ez/web/components/landing/for-business/lectures'
import { Testimonials } from '@ez/web/components/landing/for-business/testimonials'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Landing, SectionHero } from '@ez/web/types/landing'
import type {
  SectionForBusinessConsulting,
  SectionForBusinessCourses,
  SectionForBusinessCTA,
  SectionForBusinessDiagnostic,
  SectionForBusinessLectures,
  SectionForBusinessTestimonial,
} from '@ez/web/types/landing/for-business'
import { useLocale } from 'next-intl'

export function LandingPageForBusiness({ data }: { data: Landing<'forbusiness'> }) {
  const locale = useLocale()

  return (
    <FadeIn className="min-h-screen" inView={false}>
      {data.sections.map((section) => {
        if (section._type === 'section.hero') {
          return <Hero data={section as SectionHero} key={section._type} locale={locale} />
        }

        if (section._type === 'forbusiness.diagnostic') {
          return (
            <Diagnostic
              data={section as SectionForBusinessDiagnostic}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'forbusiness.courses') {
          return (
            <Courses
              data={section as SectionForBusinessCourses}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'forbusiness.lectures') {
          return (
            <Lectures
              data={section as SectionForBusinessLectures}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'forbusiness.consulting') {
          return (
            <Consulting
              data={section as SectionForBusinessConsulting}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'forbusiness.testimonial') {
          return (
            <Testimonials
              data={section as SectionForBusinessTestimonial}
              key={section._type}
              locale={locale}
            />
          )
        }

        if (section._type === 'forbusiness.cta') {
          return (
            <FinalCTA data={section as SectionForBusinessCTA} key={section._type} locale={locale} />
          )
        }

        return null
      })}
    </FadeIn>
  )
}
