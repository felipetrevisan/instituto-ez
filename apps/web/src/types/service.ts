import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Service = {
  id: string
  title: string
  image: SanityAsset
  disabled: boolean
  button: Button
}
