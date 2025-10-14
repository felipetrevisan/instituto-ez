import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Workshop = {
  id: string
  title: {
    [key: string]: string
  }
  slug: {
    [key: string]: {
      current: string
    }
  }
  subtitle?: {
    [key: string]: string
  }
  background: SanityAsset
  disabled: boolean
  button: Button
}
