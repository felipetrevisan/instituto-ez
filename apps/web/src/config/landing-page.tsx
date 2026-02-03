import { LandingPageAbout } from '@ez/web/components/landing/about'
import { LandingPageDigitalProducts } from '@ez/web/components/landing/digital-products'
import { LandingPageForBusiness } from '@ez/web/components/landing/for-business'
import { LandingPageHome } from '@ez/web/components/landing/home'
import { LandingPageImmersion } from '@ez/web/components/landing/immersion'
import { LandingPageMathematizer } from '@ez/web/components/landing/mathematizer'
import { LandingPageMentory } from '@ez/web/components/landing/mentory'
import { LandingPageServices } from '@ez/web/components/landing/services'
import { MainDesktopNavigation as FooterDesktopNavigation } from '@ez/web/components/navigation/footer/desktop-navigation'
import { MainDesktopNavigation as HeaderDesktopNavigation } from '@ez/web/components/navigation/header/desktop-navigation'
import { MainMobileNavigation as HeaderMobileNavigation } from '@ez/web/components/navigation/header/mobile-navigation'
import { LandingPageAboutDesktopNavigation as LandingPageAboutHeaderDesktopNavigation } from '@ez/web/components/navigation/landing/about/desktop-navigation'
import { LandingPageAboutMobileNavigation } from '@ez/web/components/navigation/landing/about/mobile-navigation'
import { LandingPageForBusinessDesktopNavigation } from '@ez/web/components/navigation/landing/for-business/desktop-navigation'
import { LandingPageForBusinessMobileNavigation } from '@ez/web/components/navigation/landing/for-business/mobile-navigation'
import { LandingPageMathematizerDesktopNavigation } from '@ez/web/components/navigation/landing/mathematizer/desktop-navigation'
import { LandingPageMathematizerMobileNavigation } from '@ez/web/components/navigation/landing/mathematizer/mobile-navigation'
import { LandingPageMentoryDesktopNavigation } from '@ez/web/components/navigation/landing/mentory/desktop-navigation'
import { LandingPageMentoryMobileNavigation } from '@ez/web/components/navigation/landing/mentory/mobile-navigation'
import { LandingPageServicesDesktopNavigation } from '@ez/web/components/navigation/landing/services/desktop-navigation'
import { LandingPageServicesMobileNavigation } from '@ez/web/components/navigation/landing/services/mobile-navigation'
import type { LandingPageConfig } from '@ez/web/types/landing'
import { landingSlugsByKey } from './landing-slugs'

export function getAvailableLandingPages(): LandingPageConfig[] {
  return [
    {
      key: 'home',
      slug: [...landingSlugsByKey.home],
      component: LandingPageHome,
      navigation: {
        header: {
          desktop: HeaderDesktopNavigation,
          mobile: HeaderMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'mathematizer',
      slug: [...landingSlugsByKey.mathematizer],
      component: LandingPageMathematizer,
      navigation: {
        header: {
          desktop: LandingPageMathematizerDesktopNavigation,
          mobile: LandingPageMathematizerMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'for-business',
      slug: [...landingSlugsByKey['for-business']],
      component: LandingPageForBusiness,
      navigation: {
        header: {
          desktop: LandingPageForBusinessDesktopNavigation,
          mobile: LandingPageForBusinessMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'mentoring',
      slug: [...landingSlugsByKey.mentoring],
      component: LandingPageMentory,
      navigation: {
        header: {
          desktop: LandingPageMentoryDesktopNavigation,
          mobile: LandingPageMentoryMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'about',
      slug: [...landingSlugsByKey.about],
      component: LandingPageAbout,
      navigation: {
        header: {
          desktop: LandingPageAboutHeaderDesktopNavigation,
          mobile: LandingPageAboutMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'services',
      slug: [...landingSlugsByKey.services],
      component: LandingPageServices,
      navigation: {
        header: {
          desktop: LandingPageServicesDesktopNavigation,
          mobile: LandingPageServicesMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'digital-products',
      slug: [...landingSlugsByKey['digital-products']],
      component: LandingPageDigitalProducts,
      navigation: {
        header: {
          desktop: HeaderDesktopNavigation,
          mobile: HeaderMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
    {
      key: 'immersion',
      slug: [...landingSlugsByKey.immersion],
      component: LandingPageImmersion,
      navigation: {
        header: {
          desktop: HeaderDesktopNavigation,
          mobile: HeaderMobileNavigation,
        },
        footer: {
          desktop: FooterDesktopNavigation,
        },
      },
      classes: '',
    },
  ]
}
