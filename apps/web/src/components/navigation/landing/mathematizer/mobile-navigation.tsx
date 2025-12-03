'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseMobileNavigation } from '@ez/web/components/navigation/base/base-mobile-navigation'
import type { Navigation } from '@ez/web/types/site'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageMathematizerMobileNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <BaseMobileNavigation
      additionalContent={
        <Button
          base="mathematizer"
          className="mt-2 flex justify-self-center"
          onClick={() => setIsContactDialogOpen(true)}
          rounded="full"
          theme="background"
        >
          Solicitar Diagnóstico
        </Button>
      }
      navClassName="fixed top-[80px] z-90 w-full divide-y divide-primary/5 border-border/40 border-t bg-background/90 pb-4 backdrop-blur-2xl"
      navigation={navigation}
    />
  )
}
