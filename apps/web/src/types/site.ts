import type { SanityAsset } from '@ez/shared/types/assets'
import type { BorderRounded, LinkType, Theme, Variant } from '@ez/shared/types/global'

export type Site = {
  id: string
  title: Record<string, string>
  slogan: Record<string, string>
  description?: Record<string, string>
  keywords?: Record<string, string>
  contact: {
    form: { _ref: string }
    email: string
    phone?: string
    location?: string
  }
  logo?: SanityAsset
  seoImage?: SanityAsset
  navigation?: {
    header?: Navigation
    footer?: Navigation
    social?: SocialNetwork
  }
  testimonialsConfig: {
    type: 'ANIMATED' | 'MINIMALIST'
    theme: keyof typeof Theme
    variant: keyof typeof Variant
    rounded: keyof typeof BorderRounded
  }
}

export type Navigation = {
  items: NavigationItem[]
}

export type SocialNetwork = {
  items: SocialNetworkItem[]
}

export type NavigationItem = {
  id: string
  label: Record<string, string>
  url: NavigationItemURL
  hasSubmenu: boolean
  columns?: number
  submenu: NavigationItem[]
}

export type SocialNetworkItem = {
  id: string
  label: string
  url: string
  icon: string
}

export type NavigationItemURL = {
  type: LinkType
  link: Record<string, { current: string }>
  isHome: boolean
  isExternal?: boolean
}
