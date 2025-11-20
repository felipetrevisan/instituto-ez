'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { PageType } from '@ez/shared/types/global'
import { Dialog } from '@ez/shared/ui'
import { ContactFormDialog } from '@ez/web/components/contact-form-dialog'
import { getAvailableLandingPages } from '@ez/web/config/landing-page'
import { useApp } from '@ez/web/hooks/use-app'
import type { LandingPageKey, Page } from '@ez/web/types/page'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect } from 'react'

export default function LandingPage({ data }: { data: Page }) {
  const { isContactDialogOpen } = useShared()
  const { setPageType, isLandingPage } = useApp()
  const t = useTranslations('LandingPageMathematizer')

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional non-exhaustive deps
  useEffect(() => {
    if (isLandingPage()) return

    setPageType(PageType.landing)
  }, [])

  const avaliableLandingPages = getAvailableLandingPages().reduce(
    (acc, page) => {
      acc[page.key] = page
      return acc
    },
    {} as Record<string, LandingPageKey>,
  )

  return (
    <Fragment>
      {avaliableLandingPages[data.key as string]?.component}
      {data.form && (
        <Dialog open={isContactDialogOpen}>
          <ContactFormDialog
            formRef={data.form._ref}
            sendButtonLabel={t('sendButton')}
            title={t('title')}
          />
        </Dialog>
      )}
    </Fragment>
  )
}
