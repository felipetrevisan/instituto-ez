import type { Button, SanityAsset } from '@ez/shared/types'
import type { PortableTextBlock } from 'next-sanity'

export type AdvancedMentory = {
  id: string
  title: {
    [key: string]: string
  }
  content: {
    [key: string]: PortableTextBlock[]
  }
  background: SanityAsset
  button: Button
  ribbon: {
    show: boolean
    text: {
      [key: string]: string
    }
  }
}
