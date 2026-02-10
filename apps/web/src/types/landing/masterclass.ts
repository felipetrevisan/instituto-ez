import type { Button, SanityAsset } from '@ez/shared/types'
import type { PortableTextBlock } from 'next-sanity'

type LocalizedString = string | Record<string, string>
type LocalizedPortableText = Record<string, PortableTextBlock[]>

export type MasterclassCatalogItem = {
  _key?: string
  number?: LocalizedString
  title?: LocalizedString
  description?: LocalizedString
  pain?: LocalizedString
  image?: SanityAsset
  masterclass?: { slug?: Record<string, { current: string }> }
  masterclassSlug?: string
  masterclassId?: string
  masterclassRef?: string
  exclusive?: boolean
  exclusiveLabel?: LocalizedString
  exclusiveBonus?: LocalizedString
}

export type MasterclassCatalogOption = {
  _key?: string
  title?: LocalizedString
  description?: LocalizedString
  badgeLabel?: LocalizedString
  benefits?: LocalizedString[]
  icon?: string
  featured?: boolean
  cta?: Button
}

export type MasterclassInsight = {
  _key?: string
  icon?: string
  text?: LocalizedString
}

export type MasterclassWorkArea = {
  _key?: string
  text?: LocalizedString
}

export type MasterclassProblemCard = {
  _key?: string
  icon?: string
  title?: LocalizedString
  text?: LocalizedString
  highlight?: boolean
}

export type MasterclassCTAOption = {
  _key?: string
  title?: LocalizedString
  description?: LocalizedString
  badgeLabel?: LocalizedString
  benefits?: LocalizedString[]
  icon?: string
  featured?: boolean
  cta?: Button
}

export type MasterclassHeroBadge = {
  _key?: string
  value?: LocalizedString
  label?: LocalizedString
}

export type MasterclassHeroVideo = {
  label?: LocalizedString
  duration?: string
}

export type SectionMasterclassHero = {
  headingPrimary?: LocalizedPortableText
  headingSecondary?: LocalizedPortableText
  subheading?: LocalizedPortableText
  backgroundImage?: SanityAsset
  video?: MasterclassHeroVideo
  badges?: MasterclassHeroBadge[]
  cta?: Button[]
  _type: string
}

export type SectionMasterclassCatalog = {
  heading?: LocalizedPortableText
  intro?: LocalizedPortableText
  featured?: MasterclassCatalogItem
  items?: MasterclassCatalogItem[]
  ctaOptions?: MasterclassCatalogOption[]
  _type: string
}

export type SectionMasterclassForWho = {
  heading?: LocalizedPortableText
  intro?: LocalizedPortableText
  introSecondary?: LocalizedPortableText
  insights?: MasterclassInsight[]
  label?: LocalizedString
  closing?: LocalizedPortableText
  cta?: Button[]
  _type: string
}

export type SectionMasterclassProblem = {
  heading?: LocalizedPortableText
  image?: SanityAsset
  cards?: MasterclassProblemCard[]
  footerNote?: LocalizedString
  cta?: Button[]
  _type: string
}

export type MasterclassCredential = {
  _key?: string
  icon?: string
  text?: LocalizedString
}

export type SectionMasterclassExpert = {
  heading?: LocalizedPortableText
  image?: SanityAsset
  name?: LocalizedString
  emphasis?: LocalizedString
  credentials?: MasterclassCredential[]
  bio?: LocalizedPortableText
  workAreas?: MasterclassWorkArea[]
  _type: string
}

export type MasterclassTrustBadge = {
  _key?: string
  icon?: string
  label?: LocalizedString
}

export type SectionMasterclassFinalCTA = {
  heading?: LocalizedPortableText
  subheading?: LocalizedPortableText
  icon?: string
  ctaOptions?: MasterclassCTAOption[]
  footerNote?: LocalizedString
  trustBadges?: MasterclassTrustBadge[]
  _type: string
}
