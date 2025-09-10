import { cn } from '@ez/shared/lib/utils'
import type { Chapter } from '@ez/web/types/ebook'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { useLocale } from 'next-intl'
import { PortableText } from 'next-sanity'

type PageBookProps = React.ComponentProps<'div'> & {
  chapter: Chapter
  index: number
  ref?: React.RefObject<HTMLDivElement>
}

export const PageBook = ({ chapter, index, className, ref }: PageBookProps) => {
  const locale = useLocale()

  return (
    <div
      className={cn('overflow-hidden bg-white shadow-2xl', className)}
      data-density="0"
      ref={ref}
    >
      <div className="flex flex-col justify-center">
        {index}{' '}
        <PortableText components={createPortableComponents()} value={chapter.content?.[locale]} />
      </div>
    </div>
  )
}
