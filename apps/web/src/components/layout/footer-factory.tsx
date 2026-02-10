import { Footer } from '@ez/web/components/app'
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
  return (
    <Footer
      customNavigation={navigation}
      data={data}
      FooterComponent={FooterComponent}
      pageKey={pageKey}
      theme={theme}
    />
  )
}
