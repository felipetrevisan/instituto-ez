import { TextAlignDecorator } from '@ez/studio/portable/decorators'
import type { PortableTextComponents } from '@portabletext/react'

export const portableMarks: PortableTextComponents['marks'] = {
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableTextComponent typing
  justify: (props: any) => TextAlignDecorator(props, 'justify'),
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableTextComponent typing
  center: (props: any) => TextAlignDecorator(props, 'center'),
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableTextComponent typing
  left: (props: any) => TextAlignDecorator(props, 'left'),
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableTextComponent typing
  right: (props: any) => TextAlignDecorator(props, 'right'),
  strong: ({ children }) => <span className="inline font-bold">{children}</span>,
  italic: ({ children }) => <span className="inline font-italic">{children}</span>,
}
