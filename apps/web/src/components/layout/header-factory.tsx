import { Header } from '@ez/web/components/app'
import { useLandingConfig } from '@ez/web/hooks/use-landing-config'
import type { Navigation, Site } from '@ez/web/types/site'
import type { HTMLMotionProps } from 'motion/react'

type HeaderFactoryProps = {
  theme: 'default' | 'landing'
  pageKey?: string
  data: Site
  navigation?: Navigation
  HeaderComponent?: React.ComponentType<
    HTMLMotionProps<'header'> & { theme: 'default' | 'landing'; currentScrollY?: number }
  >
}

export function HeaderFactory({
  theme,
  pageKey,
  data,
  navigation,
  HeaderComponent,
}: HeaderFactoryProps) {
  const landing = useLandingConfig(pageKey)

  return (
    <Header
      customNavigation={navigation}
      DesktopNavComponent={landing?.navigation?.header?.desktop}
      data={data}
      HeaderComponent={HeaderComponent}
      MobileNavComponent={landing?.navigation?.header?.mobile}
      pageKey={pageKey}
      theme={theme}
    />
  )
}
