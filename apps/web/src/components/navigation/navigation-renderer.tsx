import { FadeIn } from '@ez/web/components/ui/fade-in'
import type { Navigation } from '@ez/web/types/site'

type NavigationRendererProps = {
  Component?: React.ComponentType<{ navigation?: Navigation }>
  navigation?: Navigation
}

export function NavigationRenderer({ Component, navigation }: NavigationRendererProps) {
  if (!Component || !navigation) return null
  return (
    <FadeIn>
      <Component navigation={navigation} />
    </FadeIn>
  )
}
