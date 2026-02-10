import { LandingPageAbout } from '@ez/web/components/landing/about'
import { LandingPageDigitalProducts } from '@ez/web/components/landing/digital-products'
import { LandingPageForBusiness } from '@ez/web/components/landing/for-business'
import { LandingPageHome } from '@ez/web/components/landing/home'
import { LandingPageImmersion } from '@ez/web/components/landing/immersion'
import { LandingPageMasterclass } from '@ez/web/components/landing/masterclass'
import { LandingPageMathematizer } from '@ez/web/components/landing/mathematizer'
import { LandingPageMentory } from '@ez/web/components/landing/mentory'
import { LandingPageServices } from '@ez/web/components/landing/services'
import type { LandingPageConfig } from '@ez/web/types/landing'
import { landingSlugsByKey } from './landing-slugs'

export function getAvailableLandingPages(): LandingPageConfig[] {
  return [
    {
      key: 'home',
      slug: [...landingSlugsByKey.home],
      component: LandingPageHome,
      classes: '',
    },
    {
      key: 'mathematizer',
      slug: [...landingSlugsByKey.mathematizer],
      component: LandingPageMathematizer,
      classes: '',
    },
    {
      key: 'for-business',
      slug: [...landingSlugsByKey['for-business']],
      component: LandingPageForBusiness,
      classes: '',
    },
    {
      key: 'mentoring',
      slug: [...landingSlugsByKey.mentoring],
      component: LandingPageMentory,
      classes: '',
    },
    {
      key: 'about',
      slug: [...landingSlugsByKey.about],
      component: LandingPageAbout,
      classes: '',
    },
    {
      key: 'services',
      slug: [...landingSlugsByKey.services],
      component: LandingPageServices,
      classes: '',
    },
    {
      key: 'digital-products',
      slug: [...landingSlugsByKey['digital-products']],
      component: LandingPageDigitalProducts,
      classes: '',
    },
    {
      key: 'masterclass',
      slug: [...landingSlugsByKey.masterclass],
      component: LandingPageMasterclass,
      classes: '',
    },
    {
      key: 'immersion',
      slug: [...landingSlugsByKey.immersion],
      component: LandingPageImmersion,
      classes: '',
    },
  ]
}
