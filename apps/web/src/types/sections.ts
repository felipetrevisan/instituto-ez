import type { ReactNode } from 'react'

export type Section = {
  key: string
  show: boolean
  title?: Record<string, string>
  subtitle?: Record<string, string>
}

export type SectionKey = {
  key: string
  component: ReactNode
  classes?: string
}
