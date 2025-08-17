import { cn } from '@ez/shared/lib/utils'
import type { Chapter } from '@ez/web/types/ebook'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from 'next-sanity'

type PageBookProps = React.ComponentProps<'div'> & {
  chapter: Chapter
  ref?: React.RefObject<HTMLDivElement>
}

export const PageBook = ({ chapter, className, ref }: PageBookProps) => {
  return (
    <div
      className={cn('overflow-hidden bg-white p-20 shadow-2xl', className)}
      ref={ref}
      data-density="0"
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between">
        <h2 className="font-bold text-3xl">{chapter.title}</h2>
        <PortableText components={createPortableComponents()} value={chapter.content}  />
      </div>
    </div>
  )
}
