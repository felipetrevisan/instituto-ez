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
      className={cn('overflow-hidden bg-white p-10 shadow-2xl', className)}
      ref={ref}
      data-density="0"
    >
      <div className="flex flex-col justify-center">
        <h2 className='chapter-title font-bold text-[var(--primary-c)] text-xl'>{chapter.title}</h2>
        <PortableText components={createPortableComponents()} value={chapter.content} />
      </div>
    </div>
  )
}
