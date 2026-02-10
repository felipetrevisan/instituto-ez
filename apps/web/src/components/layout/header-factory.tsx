import { Header } from '@ez/web/components/app'
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
  return (
    <Header
      customNavigation={navigation}
      data={data}
      HeaderComponent={HeaderComponent}
      pageKey={pageKey}
      theme={theme}
    />
  )
}
