import type { Button } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionForBusinessDiagnostic = {
  heading: Record<string, string>
  subheading: Record<string, string>
  items: SectionForBusinessDiagnosticItem[]
  _type: string
}

export type SectionForBusinessDiagnosticItem = {
  title: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionForBusinessCourses = {
  heading: Record<string, string>
  subheading: Record<string, string>
  items: SectionForBusinessCoursesItem[]
  _type: string
}

export type SectionForBusinessCoursesItem = {
  title: Record<string, string>
  description: Record<string, string>
  text: Record<string, string>
  type?: 'INPERSON' | 'REMOTE'
  time?: Record<string, string>
  categories?: Category[]
  classname?: string
  icon?: IconName
  cta?: Button
  _type: string
}

export type Category = Record<string, string> & {
  _type: string
  _key: string
}

export type SectionForBusinessLectures = {
  heading: Record<string, string>
  subheading: Record<string, string>
  items: SectionForBusinessLecturesItem[]
  _type: string
}

export type SectionForBusinessLecturesItem = {
  title: Record<string, string>
  description: Record<string, string>
  tag: Record<string, string>
  text: Record<string, string>
  classname?: string
  icon?: IconName
  cta?: Button
  _type: string
}

export type SectionForBusinessConsulting = {
  heading: Record<string, string>
  subheading: Record<string, string>
  footer: Record<string, PortableTextBlock[]>
  items: SectionForBusinessConsultingItem[]
  cta?: Button
  _type: string
}

export type SectionForBusinessConsultingItem = {
  title: Record<string, string>
  classname?: string
  icon?: IconName
  _type: string
}

export type SectionForBusinessTestimonial = {
  heading: Record<string, string>
  items: SectionForBusinessTestimonialItem[]
  cta?: Button
  _type: string
}

export type SectionForBusinessTestimonialItem = {
  title: Record<string, string>
  description: Record<string, string>
  text: Record<string, string>
  classname?: string
  icon?: IconName
  _type: string
}

export type SectionForBusinessCTA = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}
