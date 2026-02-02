import type { Button, SanityAsset } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionImmersionIntro = {
  heading?: Record<string, PortableTextBlock[]>
  text?: SectionImmersionIntroText
  image?: SanityAsset
  _type: string
}

export type SectionImmersionIntroText = Record<string, PortableTextBlock[]>

export type SectionImmersionInstructor = {
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  footer?: Record<string, PortableTextBlock[]>
  items?: SectionImmersionInstructorItem[]
  _type: string
}

export type SectionImmersionInstructorItem = {
  name: string
  title?: Record<string, string>
  subtitle?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
  _type: string
}

export type SectionImmersionExperience = {
  heading?: Record<string, PortableTextBlock[]>
  subheading?: Record<string, PortableTextBlock[]>
  footer?: Record<string, PortableTextBlock[]>
  elements?: SectionImmersionExperienceElement[]
  featuredElement?: SectionImmersionExperienceFeaturedElement
  cta?: Button[]
  _type: string
}

export type SectionImmersionExperienceElement = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
  _type: string
}

export type SectionImmersionExperienceFeaturedElement = {
  element?: SectionImmersionExperienceElement
  image?: SanityAsset
  icon?: IconName
  _type: string
}
