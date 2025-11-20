import type { SanityAsset } from '@ez/shared/types/assets'
import type { Navigation } from '@ez/web/types/site'
import type { PortableTextBlock } from 'next-sanity'
import type { ReactNode } from 'react'

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
  type: 'page' | 'landing'
  sections?: Section[]
  key?: string
  navigation?: Navigation
  form?: { _ref: string }
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

export type LandingPageKey = {
  key: string
  component: ReactNode
  navigation: {
    desktop?: React.ComponentType<{ navigation?: Navigation }>
    mobile?: React.ComponentType<{ navigation?: Navigation }>
  }
  classes?: string
}
