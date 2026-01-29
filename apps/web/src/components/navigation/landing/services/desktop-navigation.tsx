'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/header/base-desktop-navigation'
import type { Navigation } from '@ez/web/types/site'
import { Phone } from 'lucide-react'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageServicesDesktopNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <BaseDesktopNavigation
      additionalContent={
        <Button
          base="services"
          className="mt-2"
          onClick={() => setIsContactDialogOpen(true)}
          rounded="full"
          size="sm"
          theme="background"
        >
          Falar com o Instituto
          <Phone className="size-4 transition-transform group-hover:rotate-12" />
        </Button>
      }
      navigation={navigation}
    />
  )
}
