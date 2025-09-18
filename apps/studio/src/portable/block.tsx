/** biome-ignore-all lint/suspicious/noExplicitAny:using any for decorator props */
import type { PortableTextComponents } from '@portabletext/react'

export const portableBlocks: PortableTextComponents['block'] = {
  h1: ({ children }: any) => <h1 className="my-6 font-bold text-4xl">{children}</h1>,
  h2: ({ children }: any) => <h2 className="my-5 font-semibold text-3xl">{children}</h2>,
  h3: ({ children }: any) => <h3 className="my-4 font-medium text-2xl">{children}</h3>,
  h4: ({ children }: any) => <h4 className="my-3 font-medium text-xl">{children}</h4>,
  h5: ({ children }: any) => <h5 className="my-2 font-medium text-lg">{children}</h5>,
  normal: ({ children }: any) => <p className="my-2 text-base">{children}</p>,
  justify: ({ children }) => <p className="my-2 text-justify text-base">{children}</p>,
}
