import { Footer } from '@ez/web/components/app'
import { useLandingConfig } from '@ez/web/hooks/use-landing-config'
import type { Navigation, Site } from '@ez/web/types/site'
import type { HTMLMotionProps } from 'motion/react'

type FooterFactoryFactoryProps = {
  theme: 'default' | 'landing'
  pageKey?: string
  data: Site
  navigation?: Navigation
  FooterComponent?: React.ComponentType<
    HTMLMotionProps<'footer'> & { theme: 'default' | 'landing' }
  >
}

export function FooterFactory({
  theme,
  pageKey,
  data,
  navigation,
  FooterComponent,
}: FooterFactoryFactoryProps) {
  const landing = useLandingConfig(pageKey)

  return (
    <Footer
      customNavigation={navigation}
      DesktopNavComponent={landing?.navigation?.footer?.desktop}
      data={data}
      FooterComponent={FooterComponent}
      pageKey={pageKey}
      theme={theme}
    />
  )
}
