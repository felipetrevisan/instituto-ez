'use client'

import { ConsultingSection } from '@ez/web/components/landing/for-business/consulting'
import { CoursesSection } from '@ez/web/components/landing/for-business/courses'
import { DiagnosticSection } from '@ez/web/components/landing/for-business/diagnostics'
import { FinalCTA } from '@ez/web/components/landing/for-business/final-cta'
import { Hero } from '@ez/web/components/landing/for-business/hero'
import { LecturesSection } from '@ez/web/components/landing/for-business/lectures'
import { TestimonialsSection } from '@ez/web/components/landing/for-business/testimonials'

export function LandingPageForBusiness() {
  return (
    <div className="min-h-screen">
      <Hero />
      <DiagnosticSection />
      <CoursesSection />
      <LecturesSection />
      <ConsultingSection />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  )
}
