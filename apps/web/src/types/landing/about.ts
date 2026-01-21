import type { Button } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionAboutIntro = {
  heading: Record<string, PortableTextBlock[]>
  items: SectionAboutIntroItem[]
  _type: string
}

export type SectionAboutIntroItem = {
  title: Record<string, PortableTextBlock[]>
  description: Record<string, PortableTextBlock[]>
  icon?: IconName
  _type: string
}

export type SectionAboutServices = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionAboutServicesItem[]
  _type: string
}

export type SectionAboutServicesItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionAboutWhyChoose = {
  heading: Record<string, PortableTextBlock[]>
  description: Record<string, PortableTextBlock[]>
  cta: Button
  _type: string
}
