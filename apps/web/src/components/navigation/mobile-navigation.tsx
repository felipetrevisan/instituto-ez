'use client'

import { BaseMobileNavigation } from '@ez/web/components/navigation/base/base-mobile-navigation'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const MainMobileNavigation = ({ navigation }: NavigationProps) => {
  return <BaseMobileNavigation navigation={navigation} />
}
