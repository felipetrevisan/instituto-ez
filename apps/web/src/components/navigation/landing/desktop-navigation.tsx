'use client'

import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/base-desktop-navigation'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageDesktopNavigation = ({ navigation }: NavigationProps) => {
  return (
    <BaseDesktopNavigation
      activeClassName="bg-foreground/70 dark:bg-black/40 text-foreground p-4 rounded-4xl"
      highlightClassName="flex flex-row bg-transparent text-accent"
      linkClassName='relative flex flex-col bg-transparent p-4 text-accent text-xl outline-none transition-all hover:font-semibold hover:text-background focus:bg-transparent focus:text-accent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:p-4 data-[active=true]:text-accent lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
      navigation={navigation}
    />
  )
}
