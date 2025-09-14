import type { PortableTextComponents } from '@portabletext/react'

export const portableBlocks: PortableTextComponents['block'] = {
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h1: ({ children }: any) => <h1 className="my-6 font-bold text-4xl">{children}</h1>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h2: ({ children }: any) => <h2 className="my-5 font-semibold text-3xl">{children}</h2>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h3: ({ children }: any) => <h3 className="my-4 font-medium text-2xl">{children}</h3>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h4: ({ children }: any) => <h4 className="my-3 font-medium text-xl">{children}</h4>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h5: ({ children }: any) => <h5 className="my-2 font-medium text-lg">{children}</h5>,
  normal: ({ children }) => <div>{children}</div>,
}
