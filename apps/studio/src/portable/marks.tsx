import { Button } from '@ez/studio/components/ui/button'
import { Link } from '@ez/studio/components/ui/link'
import { TextAlignDecorator } from '@ez/studio/portable/decorators'
import type { PortableTextComponents } from '@portabletext/react'
import { LinkIcon } from '@sanity/icons'

type InternalLinkValue = {
  slug?: {
    current?: string
  }
}

type ExternalLinkValue = {
  href: string
  blank?: boolean
}

export const portableMarks: PortableTextComponents['marks'] = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  justify: (props: any) => TextAlignDecorator(props, 'justify'),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  center: (props: any) => TextAlignDecorator(props, 'center'),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  left: (props: any) => TextAlignDecorator(props, 'left'),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  right: (props: any) => TextAlignDecorator(props, 'right'),
  internalLink: ({ value, children }) => {
    const { slug = {} } = value as InternalLinkValue
    const href = `/${slug.current}`

    return (
      <Link href={href} asChild>
        <Button variant="link">
          <LinkIcon /> {children}
        </Button>
      </Link>
    )
  },
  link: ({ value, children }) => {
    const { blank, href } = value as ExternalLinkValue

    return blank ? (
      <Link href={href} target="_blank" rel="noopener">
        <Button variant="link">
          <LinkIcon /> {children}
        </Button>
      </Link>
    ) : (
      <Link href={href}>
        <Button variant="link">
          <LinkIcon /> {children}
        </Button>
      </Link>
    )
  },
}
