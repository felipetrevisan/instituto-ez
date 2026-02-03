'use client'

import * as App from '@ez/web/components/app'
import { FooterFactory } from '@ez/web/components/layout/footer-factory'
import { HeaderFactory } from '@ez/web/components/layout/header-factory'
import { FooterLandingNavigation } from '@ez/web/components/navigation/landing/footer'
import { HeaderLandingNavigation } from '@ez/web/components/navigation/landing/header'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useSite } from '@ez/web/hooks/use-site'
import type { Landing } from '@ez/web/types/landing'
import { Fragment, useEffect } from 'react'

export function BaseLanding({
  theme,
  settings,
  children,
}: {
  children: React.ReactNode
  theme: string
  settings?: Landing
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
      <HeaderFactory
        data={data}
        HeaderComponent={HeaderLandingNavigation}
        navigation={settings?.settings.navigation}
        pageKey={theme}
        theme="landing"
      />
      <FadeIn inView={false}>
        <App.Content>{children}</App.Content>
      </FadeIn>
      <FooterFactory
        data={data}
        FooterComponent={FooterLandingNavigation}
        navigation={settings?.settings.navigation}
        pageKey={theme}
        theme="landing"
      />
    </Fragment>
  )
}

export function BaseNormal({ theme, children }: { children: React.ReactNode; theme: string }) {
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
      <HeaderFactory
        data={data}
        HeaderComponent={HeaderLandingNavigation}
        navigation={data?.navigation?.header}
        pageKey={theme}
        theme="default"
      />
      <FadeIn inView={false}>
        <App.Content>{children}</App.Content>
      </FadeIn>
      <FooterFactory
        data={data}
        FooterComponent={FooterLandingNavigation}
        navigation={data?.navigation?.footer}
        pageKey={theme}
        theme="default"
      />
    </Fragment>
  )
}
