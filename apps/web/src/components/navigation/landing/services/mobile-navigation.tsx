'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { BaseMobileNavigation } from '@ez/web/components/navigation/base/header/base-mobile-navigation'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Navigation } from '@ez/web/types/site'
import { Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

type NavigationProps = {
  navigation?: Navigation
}

export const LandingPageServicesMobileNavigation = ({ navigation }: NavigationProps) => {
  const { setIsContactDialogOpen } = useShared()
  const t = useTranslations('Navigation')

  return (
    <FadeIn className="mx-10">
      <BaseMobileNavigation
        additionalContent={
          <Button
            base="services"
            className="m-2 flex justify-self-center"
            onClick={() => setIsContactDialogOpen(true)}
            rounded="full"
            theme="background"
          >
            {t('talkToInstitute')}
            <Phone className="size-4 transition-transform group-hover:rotate-12" />
          </Button>
        }
        navClassName="fixed top-[80px] z-90 w-full divide-y divide-primary/5 border-border/40 border-t bg-background/90 pb-4 backdrop-blur-2xl"
        navigation={navigation}
      />
    </FadeIn>
  )
}
