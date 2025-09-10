import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import Image from 'next/image'

type CoverBookProps = React.ComponentProps<'div'> & {
  cover: Ebook['chapter']['cover']
  locale: string
  ref?: React.RefObject<HTMLDivElement>
}

export const CoverBook = ({ cover, locale, ref }: CoverBookProps) => {
  return (
    <div
      className="--right --hard --simple overflow-hidden bg-white p-20 shadow-2xl"
      data-density="hard"
      ref={ref}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between">
        {cover?.[locale]?.cover.asset && (
          <Image
            alt="Book Cover"
            blurDataURL={cover?.[locale].cover.metadata.lqip}
            className="object-cover"
            fill
            priority
            src={urlForImage(cover?.[locale]?.cover.asset).format('webp').quality(80).url()}
          />
        )}
      </div>
    </div>
  )
}
