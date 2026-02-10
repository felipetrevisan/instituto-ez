import type { Button, SanityAsset } from '@ez/shared/types'
import type {
  SectionAboutIntro,
  SectionAboutServices,
  SectionAboutWhyChoose,
} from '@ez/web/types/landing/about'
import type {
  SectionDigitalProductsCTA,
  SectionDigitalProductsEbooksCatalog,
  SectionDigitalProductsHero,
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
  SectionImmersionExperience,
  SectionImmersionFAQ,
  SectionImmersionFinalCTA,
  SectionImmersionInstructor,
  SectionImmersionIntro,
  SectionImmersionMainTarget,
  SectionImmersionNextClass,
} from '@ez/web/types/landing/immersion'
import type {
  SectionMasterclassCatalog,
  SectionMasterclassExpert,
  SectionMasterclassFinalCTA,
  SectionMasterclassForWho,
  SectionMasterclassHero,
  SectionMasterclassProblem,
} from '@ez/web/types/landing/masterclass'
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
import type { PortableTextBlock } from 'next-sanity'

// biome-ignore lint/suspicious/noExplicitAny: false positive
export type Landing<K extends keyof LandingSectionsMap = any> = {
  id: string
  key: K
  settings: {
    title: Record<string, string>
    slug: Record<string, { current: string }>
    description?: Record<string, string>
    image?: SanityAsset
    type: 'landing'
  }
  sections: LandingSectionsMap[K][]
}

export type SectionHero = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  description: Record<string, PortableTextBlock[]>
  image?: SanityAsset
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
  'digital-products':
    | SectionDigitalProductsHero
    | SectionDigitalProductsEbooksCatalog
    | SectionDigitalProductsCTA

  services:
    | SectionHero
    | SectionServicesAssessment
    | SectionServicesMethodSessions
    | SectionServicesBenefits
    | SectionServicesWhoIsItFor
    | SectionServicesCTA

  immersion:
    | SectionHero
    | SectionImmersionIntro
    | SectionImmersionExperience
    | SectionImmersionInstructor
    | SectionImmersionMainTarget
    | SectionImmersionFinalCTA
    | SectionImmersionFAQ
    | SectionImmersionNextClass

  masterclass:
    | SectionMasterclassHero
    | SectionMasterclassForWho
    | SectionMasterclassProblem
    | SectionMasterclassExpert
    | SectionMasterclassFinalCTA
    | SectionMasterclassCatalog
}

export type LandingPageConfig = {
  key: string
  slug: string[]
  classes?: string
  component: React.ComponentType<{ data: Landing }>
  layout?: {
    hideFooter?: boolean
    hideHeader?: boolean
  }
}
