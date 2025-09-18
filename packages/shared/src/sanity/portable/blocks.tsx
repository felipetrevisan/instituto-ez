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

  'h1-center': ({ children }) => <p className="my-6 text-center font-bold text-4xl">{children}</p>,
  'h2-center': ({ children }) => (
    <p className="my-5 text-center font-semibold text-3xl">{children}</p>
  ),
  'h3-center': ({ children }) => (
    <p className="my-4 text-center font-medium text-2xl">{children}</p>
  ),
  'h4-center': ({ children }) => <p className="my-3 text-center font-medium text-xl">{children}</p>,
  'h5-center': ({ children }) => <p className="my-2 text-center font-medium text-lg">{children}</p>,
  'normal-center': ({ children }) => <p className="my-2 text-center text-base">{children}</p>,

  'h1-left': ({ children }) => <p className="my-6 text-left font-bold text-4xl">{children}</p>,
  'h2-left': ({ children }) => <p className="my-5 text-left font-semibold text-3xl">{children}</p>,
  'h3-left': ({ children }) => <p className="my-4 text-left font-medium text-2xl">{children}</p>,
  'h4-left': ({ children }) => <p className="my-3 text-left font-medium text-xl">{children}</p>,
  'h5-left': ({ children }) => <p className="my-2 text-left font-medium text-lg">{children}</p>,
  'normal-left': ({ children }) => <p className="my-2 text-left text-base">{children}</p>,

  'h1-right': ({ children }) => <p className="my-6 text-right font-bold text-4xl">{children}</p>,
  'h2-right': ({ children }) => (
    <p className="my-5 text-right font-semibold text-3xl">{children}</p>
  ),
  'h3-right': ({ children }) => <p className="my-4 text-right font-medium text-2xl">{children}</p>,
  'h4-right': ({ children }) => <p className="my-3 text-right font-medium text-xl">{children}</p>,
  'h5-right': ({ children }) => <p className="my-2 text-right font-medium text-lg">{children}</p>,
  'normal-right': ({ children }) => <p className="my-2 text-right text-base">{children}</p>,

  'h1-justify': ({ children }) => <p className="my-6 text-justify text-4xl">{children}</p>,
  'h2-justify': ({ children }) => <p className="my-5 text-justify text-3xl">{children}</p>,
  'h3-justify': ({ children }) => <p className="my-4 text-justify text-2xl">{children}</p>,
  'h4-justify': ({ children }) => <p className="my-3 text-justify text-xl">{children}</p>,
  'h5-justify': ({ children }) => <p className="my-2 text-justify text-lg">{children}</p>,
  'normal-justify': ({ children }) => <p className="my-2 text-left text-base">{children}</p>,
}
