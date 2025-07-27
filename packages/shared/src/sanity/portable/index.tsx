import type { PortableTextComponents } from '@portabletext/react'

export function createPortableComponents(
  overrides: Partial<PortableTextComponents> = {},
): PortableTextComponents {
  return {
    types: {
      ...(overrides.types || {}),
    },
    marks: {
      ...(overrides.marks || {}),
    },
    block: overrides.block,
    list: overrides.list,
  }
}
