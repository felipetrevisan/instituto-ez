import type { SanityAsset } from '@ez/shared/types/assets'
import type { BorderRounded, LinkType, Theme, Variant } from '@ez/shared/types/global'
import type { Section } from './sections'

export type Site = {
  id: string
  title: string
  description?: string
  keywords?: string
  contact: { 
    form: { _ref: string }
    email: string
  }
  hero: Hero[]
  sections: Section[]
  logo?: SanityAsset
  primaryNavigation?: Navigation
  socialNavigation?: SocialNetwork
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
  label: string
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
  link: string
  isHome: boolean
  externalUrl?: string
}

export type Hero = {
  background: SanityAsset
  title: string
  description: string
}
