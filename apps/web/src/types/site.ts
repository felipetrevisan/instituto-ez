import type { SanityAsset } from '@ez/shared/types/assets'
import type { LinkType } from '@ez/shared/types/global'

export type Site = {
  id: string
  title: Record<string, string>
  slogan: Record<string, string>
  description?: Record<string, string>
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
