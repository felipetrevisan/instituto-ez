import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Workshop = {
  id: string
  title: string
  subtitle?: string
  background: SanityAsset
  disabled: boolean
  button: Button
}
