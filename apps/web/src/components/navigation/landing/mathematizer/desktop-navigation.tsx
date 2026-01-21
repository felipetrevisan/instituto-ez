'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/header/base-desktop-navigation'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageMathematizerDesktopNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <BaseDesktopNavigation
      additionalContent={
        <Button
          base="mathematizer"
          className="mt-2"
          onClick={() => setIsContactDialogOpen(true)}
          rounded="full"
          size="sm"
          theme="background"
        >
          Solicitar Diagnóstico
        </Button>
      }
      navigation={navigation}
    />
  )
}
