import type { Button } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionMentoringIntro = {
  heading: LocalizedPortableText
  text: LocalizedPortableText
  _type: string
}

export type LocalizedPortableText =
  | Record<string, PortableTextBlock[]>
  | { lang?: string; value?: PortableTextBlock[] }[]

export type SectionMentoringExpectedResults = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionMentoringExpectedResultsItem[]
  _type: string
}

export type SectionMentoringExpectedResultsItem = {
  title: Record<string, string>
  _type: string
}

export type SectionMentoringMethodsStep = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionMentoringMethodsStepItem[]
  cta?: Button
  _type: string
}

export type SectionMentoringMethodsStepItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionMentoringTargetAudience = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  _type: string
}

export type SectionMentoringCTA = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}
