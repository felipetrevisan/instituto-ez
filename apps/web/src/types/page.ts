import type { SanityAsset } from '@ez/shared/types/assets'
import type { PortableTextBlock } from 'next-sanity'

export type Page = {
  id: string
  title: {
    [key: string]: string
  }
  slug: {
    [key: string]: {
      current: string
    }
  }
  description?: {
    [key: string]: string
  }
  keywords?: {
    [key: string]: string
  }
  sections: Section[]
}

export type Section = {
  title?: {
    [key: string]: string
  }
  hash: {
    [key: string]: string
  }
  content: {
    [key: string]: PortableTextBlock[]
  }
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
