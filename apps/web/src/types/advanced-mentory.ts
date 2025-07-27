import type { Button, SanityAsset } from '@ez/shared/types'
import type { PortableTextBlock } from 'next-sanity'

export type AdvancedMentory = {
  id: string
  title: string
  content: PortableTextBlock[]
  background: SanityAsset
  button: Button
  ribbon: {
    show: boolean
    text: string
  }
}
