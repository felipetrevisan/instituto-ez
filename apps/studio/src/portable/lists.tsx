import type { PortableTextComponents } from '@portabletext/react'

export const portableLists: PortableTextComponents['list'] = {
  bullet: ({ children }) => (
    <ul className="flex list-disc flex-col gap-2 p-4 [&>li]:py-2">{children}</ul>
  ),
  number: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-2 p-4 [&>li]:py-2">{children}</ol>
  ),
  checkmarks: ({ children }) => <ol className="flex flex-col gap-2 p-4 [&>li]:py-2">{children}</ol>,
}
