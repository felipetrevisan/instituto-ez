'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { PageType } from '@ez/shared/types/global'
import { Dialog } from '@ez/shared/ui'
import { ContactFormDialog } from '@ez/web/components/contact-form-dialog'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { useApp } from '@ez/web/hooks/use-app'
import type { Landing } from '@ez/web/types/landing'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect } from 'react'

export default function LandingPage({ data }: { data: Landing }) {
  const { isContactDialogOpen } = useShared()
  const { setPageType, isLandingPage } = useApp()
  const t = useTranslations('LandingPageMathematizer')

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional non-exhaustive deps
  useEffect(() => {
    if (isLandingPage()) return

    setPageType(PageType.landing)
  }, [])

  const available = getAvailableLandingPages()
  const landing = available.find((p) => p.key === data.key)

  if (!landing) return null

  const Component = landing.component

  return (
    <Fragment>
      <Component data={data} />
      {data.settings.form && (
        <Dialog open={isContactDialogOpen}>
          <ContactFormDialog
            formRef={data.settings.form._ref}
            sendButtonLabel={t('sendButton')}
            title={t('title')}
          />
        </Dialog>
      )}
    </Fragment>
  )
}
