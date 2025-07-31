import type { PortableTextComponents } from '@portabletext/react'
import { portableLists } from './lists'
import { portableMarks } from './marks'

export function createPortableComponents(): PortableTextComponents {
  return {
    marks: portableMarks,
    list: portableLists,
  }
}
