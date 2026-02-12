import type { Button, SanityAsset } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionHomeServices = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionHomeServicesItem[]
  image: SanityAsset
  cta: Button[]
  _type: string
}

export type SectionHomeServicesItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionHomeMentorShip = {
  heading: Record<string, PortableTextBlock[]>
  mainBox: SectionHomeMentorShipItem
  items: SectionHomeMentorShipItem[]
  cta: Button[]
  _type: string
}

export type SectionHomeMentorShipItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionHomeMathematizer = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionHomeMathematizerItem[]
  image: SanityAsset
  cta: Button[]
  _type: string
}

export type SectionHomeMathematizerItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionHomeDevelopment = {
  heading: Record<string, PortableTextBlock[]>
  mainBox: SectionHomeDevelopmentItem
  items: SectionHomeDevelopmentItem[]
  cta: Button[]
  _type: string
}

export type SectionHomeDevelopmentItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionHomeDigitalProducts = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  cards: SectionHomeDigitalProductsCard[]
  _type: string
}

export type SectionHomeDigitalProductsCard = {
  _key?: string
  image?: SanityAsset
  badgeLabel?: Record<string, string>
  badgeIcon?: IconName
  title?: Record<string, string>
  description?: Record<string, string>
  button?: Button
}

export type SectionHomeImmersion = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  image: SanityAsset
  cta: Button[]
  _type: string
}
