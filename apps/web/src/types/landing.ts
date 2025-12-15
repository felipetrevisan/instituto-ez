import type { Button } from '@ez/shared/types'
import type {
  SectionAboutIntro,
  SectionAboutServices,
  SectionAboutWhyChoose,
} from '@ez/web/types/landing/about'
import type {
  SectionForBusinessConsulting,
  SectionForBusinessCourses,
  SectionForBusinessCTA,
  SectionForBusinessDiagnostic,
  SectionForBusinessLectures,
  SectionForBusinessTestimonial,
} from '@ez/web/types/landing/for-business'
import type {
  SectionMathematizerBenefits,
  SectionMathematizerCTA,
  SectionMathematizerMathematizer,
  SectionMathematizerWhatIs,
  SectionMathematizerWhyCompanyNeed,
} from '@ez/web/types/landing/mathematizer'
import type {
  SectionMentoringCTA,
  SectionMentoringExpectedResults,
  SectionMentoringIntro,
  SectionMentoringMethodsStep,
  SectionMentoringTargetAudience,
} from '@ez/web/types/landing/mentoring'
import type { Navigation } from '@ez/web/types/site'
import type { PortableTextBlock } from 'next-sanity'

// biome-ignore lint/suspicious/noExplicitAny: false positive
export type Landing<K extends keyof LandingSectionsMap = any> = {
  id: string
  key: K
  settings: {
    title: Record<string, string>
    slug: Record<string, { current: string }>
    description?: Record<string, string>
    keywords?: Record<string, string>
    type: 'landing'
    navigation?: Navigation
    form?: { _ref: string }
  }
  sections: LandingSectionsMap[K][]
}

export type SectionHero = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  description: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}

export type LandingSectionsMap = {
  mathematizer:
    | SectionHero
    | SectionMathematizerBenefits
    | SectionMathematizerWhatIs
    | SectionMathematizerMathematizer
    | SectionMathematizerWhyCompanyNeed
    | SectionMathematizerCTA

  forbusiness:
    | SectionHero
    | SectionForBusinessDiagnostic
    | SectionForBusinessCourses
    | SectionForBusinessLectures
    | SectionForBusinessConsulting
    | SectionForBusinessTestimonial
    | SectionForBusinessCTA

  mentoring:
    | SectionHero
    | SectionMentoringIntro
    | SectionMentoringMethodsStep
    | SectionMentoringTargetAudience
    | SectionMentoringExpectedResults
    | SectionMentoringCTA

  about: SectionHero | SectionAboutIntro | SectionAboutServices | SectionAboutWhyChoose
  services:
    | SectionHero
    // | SectionServicestAssessment
    // | SectionServicesBenefits
    // | SectionServicesMethodSessions
    // | SectionServicesWhoIsItFor
    // | SectionServicesCTA
}

export type LandingPageKey = {
  key: string
  slug: string[]
  component: React.ComponentType<{ data: Landing }>
  navigation: {
    desktop?: React.ComponentType<{ navigation?: Navigation }>
    mobile?: React.ComponentType<{ navigation?: Navigation }>
  }
  classes?: string
}
