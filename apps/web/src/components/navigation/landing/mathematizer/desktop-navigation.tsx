'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseDesktopNavigation } from '@ez/web/components/navigation/base/header/base-desktop-navigation'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Navigation } from '@ez/web/types/site'
import { useTranslations } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageMathematizerDesktopNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()
  const t = useTranslations('Navigation')

  return (
    <FadeIn>
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
            {t('requestDiagnosis')}
          </Button>
        }
        navigation={navigation}
      />
    </FadeIn>
  )
}
