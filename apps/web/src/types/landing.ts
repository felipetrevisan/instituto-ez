import type { Button, SanityAsset } from '@ez/shared/types'
import type {
  SectionAboutIntro,
  SectionAboutServices,
  SectionAboutWhyChoose,
} from '@ez/web/types/landing/about'
import type {
  SectionEbooksCatalog,
  SectionEbooksCTA,
  SectionEbooksHero,
} from '@ez/web/types/landing/digital-products'
import type {
  SectionForBusinessConsulting,
  SectionForBusinessCourses,
  SectionForBusinessCTA,
  SectionForBusinessDiagnostic,
  SectionForBusinessLectures,
  SectionForBusinessTestimonial,
} from '@ez/web/types/landing/for-business'
import type {
  SectionHomeDevelopment,
  SectionHomeDigitalProducts,
  SectionHomeImmersion,
  SectionHomeMathematizer,
  SectionHomeMentorShip,
  SectionHomeServices,
} from '@ez/web/types/landing/home'
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
import type {
  SectionServicesAssessment,
  SectionServicesBenefits,
  SectionServicesCTA,
  SectionServicesMethodSessions,
  SectionServicesWhoIsItFor,
} from '@ez/web/types/landing/services'
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
    image?: SanityAsset
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
  image: SanityAsset
  cta: Button[]
  _type: string
}

export type LandingSectionsMap = {
  home:
    | SectionHero
    | SectionHomeServices
    | SectionHomeMentorShip
    | SectionHomeMathematizer
    | SectionHomeDevelopment
    | SectionHomeDigitalProducts
    | SectionHomeImmersion

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
  ebooks: SectionEbooksHero | SectionEbooksCatalog | SectionEbooksCTA

  services:
    | SectionHero
    | SectionServicesAssessment
    | SectionServicesMethodSessions
    | SectionServicesBenefits
    | SectionServicesWhoIsItFor
    | SectionServicesCTA
}

export type LandingNavigationSlot = {
  desktop?: React.ComponentType<{ navigation?: Navigation }>
  mobile?: React.ComponentType<{ navigation?: Navigation }>
}

export type LandingNavigationConfig = {
  header?: LandingNavigationSlot
  footer?: {
    desktop?: React.ComponentType<{ navigation?: Navigation }>
  }
}

export type LandingPageConfig = {
  key: string
  slug: string[]
  classes?: string
  component: React.ComponentType<{ data: Landing }>
  navigation?: LandingNavigationConfig
  layout?: {
    hideFooter?: boolean
    hideHeader?: boolean
  }
}
