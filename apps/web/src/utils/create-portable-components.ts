import { portableBlocks } from '@ez/shared/sanity/portable/blocks'
import { portableLists } from '@ez/shared/sanity/portable/lists'
import { portableMarks } from '@ez/shared/sanity/portable/marks'
import { portableTypes } from '@ez/shared/sanity/portable/type'
import { ImageWrapper } from '@ez/web/components/portable/image'
import { ListWrapper } from '@ez/web/components/portable/list'
import { QuoteWrapper } from '@ez/web/components/portable/quote'
import { TestimonialsWrapper } from '@ez/web/components/portable/testimonials'
import type { PortableTextComponents } from '@portabletext/react'

export const createPortableComponents = (): PortableTextComponents => {
  const types: PortableTextComponents['types'] = {
    ...portableTypes,
    image: ImageWrapper,
    testimonialWidget: TestimonialsWrapper,
    list: ListWrapper,
    quote: QuoteWrapper,
    quoteWidget: QuoteWrapper,
  }

  return {
    types,
    block: portableBlocks,
    marks: portableMarks,
    list: portableLists,
  }
}
