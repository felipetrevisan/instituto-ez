import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Workshop = {
  id: string
  title: Record<string, string>
  slug: Record<string, { current: string }>
  subtitle?: Record<string, string>
  background: SanityAsset
  disabled: boolean
  button: Button
}
