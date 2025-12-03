import { LandingPageAbout } from '@ez/web/components/landing/about'
import { LandingPageForBusiness } from '@ez/web/components/landing/for-business'
import { LandingPageMathematizer } from '@ez/web/components/landing/mathematizer'
import { LandingPageMentory } from '@ez/web/components/landing/mentory'
import { LandingPageAboutDesktopNavigation } from '@ez/web/components/navigation/landing/about/desktop-navigation'
import { LandingPageAboutMobileNavigation } from '@ez/web/components/navigation/landing/about/mobile-navigation'
import { LandingPageForBusinessDesktopNavigation } from '@ez/web/components/navigation/landing/for-business/desktop-navigation'
import { LandingPageForBusinessMobileNavigation } from '@ez/web/components/navigation/landing/for-business/mobile-navigation'
import { LandingPageMathematizerDesktopNavigation } from '@ez/web/components/navigation/landing/mathematizer/desktop-navigation'
import { LandingPageMathematizerMobileNavigation } from '@ez/web/components/navigation/landing/mathematizer/mobile-navigation'
import { LandingPageMentoryDesktopNavigation } from '@ez/web/components/navigation/landing/mentory/desktop-navigation'
import { LandingPageMentoryMobileNavigation } from '@ez/web/components/navigation/landing/mentory/mobile-navigation'
import type { LandingPageKey } from '@ez/web/types/landing'

export function getAvailableLandingPages(): LandingPageKey[] {
  return [
    {
      key: 'mathematizer',
      slug: ['matematizador', 'mathematizer'],
      component: LandingPageMathematizer,
      navigation: {
        desktop: LandingPageMathematizerDesktopNavigation,
        mobile: LandingPageMathematizerMobileNavigation,
      },
      classes: '',
    },
    {
      key: 'for-business',
      slug: ['para-empresas', 'desenvolvimento-humano', 'for-business', 'human-development'],
      component: LandingPageForBusiness,
      navigation: {
        desktop: LandingPageForBusinessDesktopNavigation,
        mobile: LandingPageForBusinessMobileNavigation,
      },
      classes: '',
    },
    {
      key: 'mentoring',
      slug: ['mentoria-e-assessoria', 'mentoring'],
      component: LandingPageMentory,
      navigation: {
        desktop: LandingPageMentoryDesktopNavigation,
        mobile: LandingPageMentoryMobileNavigation,
      },
      classes: '',
    },
    {
      key: 'about',
      slug: ['sobre-nos', 'about-us', 'sobre-nosotros'],
      component: LandingPageAbout,
      navigation: {
        desktop: LandingPageAboutDesktopNavigation,
        mobile: LandingPageAboutMobileNavigation,
      },
      classes: '',
    },
  ]
}
