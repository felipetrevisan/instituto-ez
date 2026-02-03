'use client'

import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/footer/base-desktop-navigation'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const MainDesktopNavigation = ({ navigation }: NavigationProps) => {
  return (
    <FadeIn>
      <BaseDesktopNavigation navigation={navigation} />
    </FadeIn>
  )
}
