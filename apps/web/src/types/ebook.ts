import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Ebook = {
  id: string
  title: string
  subtitle?: string
  slug: string
  description?: string
  metadata: Metadata[]
  chapters: Chapter[]
  theme: {
    text: string
    primary: string
    secondary: string
  }
  image: {
    background?: SanityAsset
    preview: SanityAsset
    large: SanityAsset
  }
  disabled: boolean
  button?: Button
}

export type EbookCollection = {
  id: string
  title: string
  ebooks?: Ebook[]
}

export type Metadata = {
  title: string
  type: 'string' | 'number'
  text?: string
  value?: number
  prefix?: string
  suffix?: string
  media: Media
}

export type Chapter = {
  title: string
  text: string
  media: Media
}

export type Media = {
  type: 'none' | 'icon' | 'image'
  icon?: { name: string }
  image?: SanityAsset
}
