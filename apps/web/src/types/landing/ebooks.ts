import type { SanityAsset } from '@ez/shared/types'
import type { PortableTextBlock } from 'next-sanity'

export type SectionEbooksHero = {
  image: SanityAsset
  _type: string
}

export type SectionEbooksCatalog = {
  content: Record<string, PortableTextBlock[]>
  _type: string
}
