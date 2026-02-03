import type { SanityImageMetadata, SanityImageSource } from '@sanity/asset-utils'

export type SanityAsset = {
  _key?: string
  asset: SanityImageSource
  metadata: Pick<SanityImageMetadata, 'lqip' | 'dimensions'>
}

export type Image = {
  value: SanityImageSource
}
