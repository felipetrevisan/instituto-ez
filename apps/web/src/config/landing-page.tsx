import { LandingPageForBusiness } from '@ez/web/components/landing/for-business'
import { LandingPageMathematizer } from '@ez/web/components/landing/mathematizer'
import { LandingPageForBusinessDesktopNavigation } from '@ez/web/components/navigation/landing/for-business/desktop-navigation'
import { LandingPageForBusinessMobileNavigation } from '@ez/web/components/navigation/landing/for-business/mobile-navigation'
import { LandingPageMathematizerDesktopNavigation } from '@ez/web/components/navigation/landing/mathematizer/desktop-navigation'
import { LandingPageMathematizerMobileNavigation } from '@ez/web/components/navigation/landing/mathematizer/mobile-navigation'
import type { LandingPageKey } from '@ez/web/types/page'

export function getAvailableLandingPages(): LandingPageKey[] {
  return [
    {
      key: 'mathematizer',
      component: <LandingPageMathematizer />,
      navigation: {
        desktop: LandingPageMathematizerDesktopNavigation,
        mobile: LandingPageMathematizerMobileNavigation,
      },
      classes: '',
    },
    {
      key: 'for-business',
      component: <LandingPageForBusiness />,
      navigation: {
        desktop: LandingPageForBusinessDesktopNavigation,
        mobile: LandingPageForBusinessMobileNavigation,
      },
      classes: '',
    },
  ]
}
