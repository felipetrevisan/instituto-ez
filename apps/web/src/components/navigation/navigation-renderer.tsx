import type { Navigation } from '@ez/web/types/site'

type NavigationRendererProps = {
  Component?: React.ComponentType<{ navigation?: Navigation }>
  navigation?: Navigation
}

export function NavigationRenderer({ Component, navigation }: NavigationRendererProps) {
  if (!Component || !navigation) return null
  return <Component navigation={navigation} />
}
