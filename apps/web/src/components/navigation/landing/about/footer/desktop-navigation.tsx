'use client'

import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/footer/base-desktop-navigation'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageAboutDesktopNavigation = ({ navigation }: NavigationProps) => {
  return (
    <BaseDesktopNavigation
      activeClassName="border-b-primary text-primary p-4"
      highlightClassName="flex flex-col border-b-2 border-b-primary bg-transparent text-primary"
      linkClassName='hover:after:animation-pulse after:-bottom-1 after:-translate-x-1/2 relative flex flex-col rounded-xl bg-transparent p-4 text-primary text-xl outline-none transition-all after:absolute after:left-1/2 after:h-[2px] after:w-0 after:rounded-xl after:bg-transparent after:transition-all hover:text-primary hover:after:w-full hover:after:shadow-xl focus:bg-transparent focus:text-primary focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:border-b-primary data-[active=true]:p-4 data-[active=true]:text-primary lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
      navigation={navigation}
    />
  )
}
