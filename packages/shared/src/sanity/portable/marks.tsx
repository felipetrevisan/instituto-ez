import { TextAlignDecorator } from '@ez/shared/sanity/components/decorators'
import { Button } from '@ez/shared/ui/button'
import { Link } from '@ez/shared/ui/link'
import type { PortableTextComponents } from '@portabletext/react'
import { LinkIcon } from 'lucide-react'

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
  // biome-ignore lint/suspicious/noExplicitAny: required by PortableTextComponents API
  justify: (props: any) => TextAlignDecorator(props, 'justify'),
  // biome-ignore lint/suspicious/noExplicitAny: required by PortableTextComponents API
  center: (props: any) => TextAlignDecorator(props, 'center'),
  // biome-ignore lint/suspicious/noExplicitAny: required by PortableTextComponents API
  left: (props: any) => TextAlignDecorator(props, 'left'),
  // biome-ignore lint/suspicious/noExplicitAny: required by PortableTextComponents API
  right: (props: any) => TextAlignDecorator(props, 'right'),
  internalLink: ({ value, children }) => {
    const { slug = {} } = value as InternalLinkValue
    const href = `/${slug.current}`

    return (
      <Link asChild href={href}>
        <Button variant="link">
          <LinkIcon /> {children}
        </Button>
      </Link>
    )
  },
  link: ({ value, children }) => {
    const { blank, href } = value as ExternalLinkValue

    return blank ? (
      <Link href={href} rel="noopener" target="_blank">
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
