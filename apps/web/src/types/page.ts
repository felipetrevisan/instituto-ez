import type { SanityAsset } from '@ez/shared/types/assets'
import type { Navigation } from '@ez/web/types/site'
import type { PortableTextBlock } from 'next-sanity'

export type Page = {
  id: string
  title: Record<string, string>
  slug: Record<string, { current: string }>
  description?: Record<string, string>
  keywords?: Record<string, string>
  type: 'page' | 'landing'
  sections?: Section[]
  key?: string
  navigation?: Navigation
  form?: { _ref: string }
}

export type Section = {
  title?: Record<string, string>
  hash: Record<string, string>
  content: Record<string, PortableTextBlock[]>
  media: {
    type: 'VIDEO' | 'IMAGE'
    video?: {
      url: string
    }
    image?: SanityAsset
  }
  background: {
    image: SanityAsset
    title?: string
  }
}