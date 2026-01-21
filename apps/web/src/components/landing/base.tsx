'use client'

import * as App from '@ez/web/components/app'
import { FooterFactory } from '@ez/web/components/layout/footer-factory'
import { HeaderFactory } from '@ez/web/components/layout/header-factory'
import { FooterLandingNavigation } from '@ez/web/components/navigation/landing/footer'
import { HeaderLandingNavigation } from '@ez/web/components/navigation/landing/header'
import { useSite } from '@ez/web/hooks/use-site'
import type { Landing } from '@ez/web/types/landing'
import type { Site } from '@ez/web/types/site'
import { Fragment, useEffect } from 'react'

export default function BaseLanding({
  theme,
  settings,
  children,
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

  const { data } = useSite()

  if (!data) return

  return (
    <Fragment>
      {/* <App.Header
        customNavigation={settings?.settings.navigation}
        HeaderComponent={HeaderLandingNavigation}
        pageKey={theme}
        theme="landing"
      /> */}
      <HeaderFactory
        data={data}
        HeaderComponent={HeaderLandingNavigation}
        navigation={settings?.settings.navigation}
        pageKey={theme}
        theme="landing"
      />
      {/* <App.Header DesktopNavComponent={MainDesktopNavigation} data={data} theme="default" /> */}
      <App.Content>{children}</App.Content>
      <FooterFactory
        data={data}
        FooterComponent={FooterLandingNavigation}
        navigation={settings?.settings.navigation}
        pageKey={theme}
        theme="landing"
      />
      {/* <App.Footer
        customNavigation={settings?.settings.navigation}
        FooterComponent={FooterLandingNavigation}
        pageKey={theme}
        theme="landing"
      /> */}
    </Fragment>
  )
}
