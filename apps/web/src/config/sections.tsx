import { Ebooks } from '@ez/web/components/sections/ebooks'
import type { SectionKey } from '@ez/web/types/sections'

export function getSections(): SectionKey[] {
  return [
    {
      key: 'ebooks',
      component: <Ebooks />,
      classes: 'section relative flex flex-col gap-10 h-full justify-center bg-background',
    },
  ]
}
