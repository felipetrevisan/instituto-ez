import type { PortableTextComponents } from '@portabletext/react'

export const portableBlocks: PortableTextComponents['block'] = {
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h1: ({ children }: any) => <h1 className="my-6 inline-block font-bold text-4xl">{children}</h1>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h2: ({ children }: any) => (
    <h2 className="my-5 inline-block font-semibold text-3xl">{children}</h2>
  ),
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h3: ({ children }: any) => <h3 className="my-4 inline-block font-medium text-2xl">{children}</h3>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h4: ({ children }: any) => <h4 className="inline-blockfont-medium my-3 text-xl">{children}</h4>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  h5: ({ children }: any) => <h5 className="my-2 inline-block font-medium text-lg">{children}</h5>,
  // biome-ignore lint/suspicious/noExplicitAny: required for PortableText component typing
  normal: ({ children }: any) => <span className="my-2 inline-block">{children}</span>,

  'h1-center': ({ children }) => (
    <h1 className="my-6 inline-block text-center font-bold text-4xl">{children}</h1>
  ),
  'h2-center': ({ children }) => (
    <h2 className="my-5 inline-block text-center font-semibold text-3xl">{children}</h2>
  ),
  'h3-center': ({ children }) => (
    <h3 className="my-4 inline-block text-center font-medium text-2xl">{children}</h3>
  ),
  'h4-center': ({ children }) => (
    <h4 className="my-3 inline-block text-center font-medium text-xl">{children}</h4>
  ),
  'h5-center': ({ children }) => (
    <h5 className="my-2 inline-block text-center font-medium text-lg">{children}</h5>
  ),
  'normal-center': ({ children }) => (
    <span className="my-2 inline-block text-center text-base">{children}</span>
  ),
  'h1-left': ({ children }) => (
    <h1 className="my-6 inline-block text-left font-bold text-4xl">{children}</h1>
  ),
  'h2-left': ({ children }) => (
    <h2 className="my-5 inline-block text-left font-semibold text-3xl">{children}</h2>
  ),
  'h3-left': ({ children }) => (
    <h3 className="my-4 inline-block text-left font-medium text-2xl">{children}</h3>
  ),
  'h4-left': ({ children }) => (
    <h4 className="my-3 inline-block text-left font-medium text-xl">{children}</h4>
  ),
  'h5-left': ({ children }) => (
    <h5 className="my-2 inline-block text-left font-medium text-lg">{children}</h5>
  ),
  'normal-left': ({ children }) => (
    <span className="my-2 inline-block text-left text-base">{children}</span>
  ),
  'h1-right': ({ children }) => (
    <h1 className="my-6 inline-block text-right font-bold text-4xl">{children}</h1>
  ),
  'h2-right': ({ children }) => (
    <h2 className="my-5 inline-block text-right font-semibold text-3xl">{children}</h2>
  ),
  'h3-right': ({ children }) => (
    <h3 className="my-4 inline-block text-right font-medium text-2xl">{children}</h3>
  ),
  'h4-right': ({ children }) => (
    <h4 className="my-3 inline-block text-right font-medium text-xl">{children}</h4>
  ),
  'h5-right': ({ children }) => (
    <h5 className="my-2 inline-block text-right font-medium text-lg">{children}</h5>
  ),
  'normal-right': ({ children }) => (
    <span className="my-2 inline-block text-right">{children}</span>
  ),
  'h1-justify': ({ children }) => (
    <h1 className="my-6 inline-block text-justify text-4xl">{children}</h1>
  ),
  'h2-justify': ({ children }) => (
    <h2 className="my-5 inline-block text-justify text-3xl">{children}</h2>
  ),
  'h3-justify': ({ children }) => (
    <h3 className="my-4 inline-block text-justify text-2xl">{children}</h3>
  ),
  'h4-justify': ({ children }) => (
    <h4 className="my-3 inline-block text-justify text-xl">{children}</h4>
  ),
  'h5-justify': ({ children }) => (
    <h5 className="my-2 inline-block text-justify text-lg">{children}</h5>
  ),
  'normal-justify': ({ children }) => (
    <span className="my-2 inline-block text-justify">{children}</span>
  ),
}
