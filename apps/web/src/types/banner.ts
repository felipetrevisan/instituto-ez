import type { SanityAsset } from '@ez/shared/types/assets'

export type Banner = {
  id: string
  title: {
    [key: string]: string
  }
  subtitle: {
    [key: string]: string
  }
  image: SanityAsset
}
