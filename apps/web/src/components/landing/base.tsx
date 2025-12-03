'use client'

import * as App from '@ez/web/components/app'
import { HeaderLandingNavigation } from '@ez/web/components/navigation/landing/header'
import type { Landing } from '@ez/web/types/landing'
import type { Site } from '@ez/web/types/site'
import { Fragment, useEffect } from 'react'

export default function BaseLanding({
  theme,
  settings,
  children,
  site,
}: {
  children: React.ReactNode
  theme: string
  settings?: Landing
  site: Site
}) {
  useEffect(() => {
    import(`@ez/shared/styles/themes/${theme}.css`)

    document.body.dataset.theme = theme

    return () => {
      delete document.body.dataset.theme
    }
  }, [theme])

  return (
    <Fragment>
      <App.Header
        customNavigation={settings?.settings.navigation}
        data={site}
        HeaderComponent={HeaderLandingNavigation}
        pageKey={theme}
        theme="landing"
      />
      {children}
      <App.Footer />
    </Fragment>
  )
}
