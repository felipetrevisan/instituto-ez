import type { SanityAsset } from '@ez/shared/types/assets'
import type { PortableTextBlock } from 'next-sanity'

export type About = {
  id: string
  title?: string
  content: PortableTextBlock[]
  background: SanityAsset
}
