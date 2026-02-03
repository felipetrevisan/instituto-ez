'use client'

import { BaseMobileNavigation } from '@ez/web/components/navigation/base/header/base-mobile-navigation'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const MainMobileNavigation = ({ navigation }: NavigationProps) => {
  return (
    <FadeIn>
      <BaseMobileNavigation navigation={navigation} />
    </FadeIn>
  )
}
