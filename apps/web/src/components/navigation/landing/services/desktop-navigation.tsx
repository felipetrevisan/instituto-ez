'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/base-desktop-navigation'
import type { Navigation } from '@ez/web/types/site'
import { Phone } from 'lucide-react'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageServicesDesktopNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <BaseDesktopNavigation
      activeClassName="bg-foreground/70 dark:bg-black/40 dark:text-accent text-foreground p-4 rounded-4xl"
      additionalContent={
        <Button
          base="services"
          className="mt-2"
          onClick={() => setIsContactDialogOpen(true)}
          rounded="full"
          theme="background"
        >
          Falar com o Instituto
          <Phone className="size-4 transition-transform group-hover:rotate-12" />
        </Button>
      }
      highlightClassName="flex flex-row bg-transparent text-accent"
      linkClassName='relative flex flex-col bg-transparent p-4 text-accent text-xl outline-none transition-all font-semibold hover:text-background dark:hover:text-accent focus:bg-transparent focus:text-accent focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:p-4 data-[active=true]:text-accent lg:gap-1 lg:text-sm! [&_svg:not([class*="size-"])]:size-4'
      navigation={navigation}
    />
  )
}
