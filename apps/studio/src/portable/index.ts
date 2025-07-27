import type { PortableTextComponents } from '@portabletext/react'
import { portableLists } from './lists'
import { portableMarks } from './marks'
//import { portableTypes } from './type'

type PortableTypeKeys = [] //keyof typeof portableTypes

export function createPortableComponents(options?: {
  exclude?: PortableTypeKeys[]
}): PortableTextComponents {
  //const { exclude = [] } = options ?? {}

  // const filteredTypes = Object.fromEntries(
  //   Object.entries(portableTypes).filter(([key]) => !exclude.includes(key as PortableTypeKeys)),
  // )

  return {
    //types: filteredTypes,
    marks: portableMarks,
    list: portableLists,
  }
}
