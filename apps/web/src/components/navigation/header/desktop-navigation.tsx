'use client'

import { FadeIn } from '@ez/web/components/ui/fade-in'
import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/header/base-desktop-navigation'
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
