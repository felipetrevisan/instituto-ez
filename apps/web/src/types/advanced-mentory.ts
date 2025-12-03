import type { Button, SanityAsset } from '@ez/shared/types'
import type { PortableTextBlock } from 'next-sanity'

export type AdvancedMentory = {
  id: string
  title: Record<string, string>
  content: Record<string, PortableTextBlock[]>
  background: SanityAsset
  button: Button
  ribbon: {
    show: boolean
    text: Record<string, string>
  }
}
