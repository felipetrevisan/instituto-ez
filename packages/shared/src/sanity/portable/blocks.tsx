import type { PortableTextComponents } from '@portabletext/react'

export const portableBlocks: PortableTextComponents['block'] = {
  normal: ({ children }) => <div>{children}</div>,
}
