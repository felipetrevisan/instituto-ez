import type { ReactNode } from 'react'

export type Section = {
  key: string
  show: boolean
  title?: {
    [key: string]: string
  }
  subtitle?: {
    [key: string]: string
  }
}

export type SectionKey = {
  key: string
  component: ReactNode
  classes?: string
}
