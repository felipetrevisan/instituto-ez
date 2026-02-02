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
  bold: ({ children }) => <span className="font-bold">{children}</span>,
  semibold: ({ children }) => <span className="font-semibold">{children}</span>,
  'size-sm': ({ children }) => <span className="text-sm">{children}</span>,
  'size-base': ({ children }) => <span className="text-base">{children}</span>,
  'size-lg': ({ children }) => <span className="text-lg">{children}</span>,
  accent: ({ children }) => <span className="text-accent">{children}</span>,
  primary: ({ children }) => <span className="text-primary">{children}</span>,
  secondary: ({ children }) => <span className="text-secondary">{children}</span>,
  tertiary: ({ children }) => <span className="text-tertiary">{children}</span>,
  navy: ({ children }) => <span className="text-navy dark:text-navy-light">{children}</span>,
  cyan: ({ children }) => <span className="text-cyan">{children}</span>,
  coral: ({ children }) => <span className="text-coral">{children}</span>,
  white: ({ children }) => <span className="text-white">{children}</span>,
  'gradient-primary': ({ children }) => (
    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {children}
    </span>
  ),
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
