import { portableBlocks } from '@ez/shared/sanity/portable/blocks'
import { portableLists } from '@ez/shared/sanity/portable/lists'
import { portableMarks } from '@ez/shared/sanity/portable/marks'
import { portableTypes } from '@ez/shared/sanity/portable/type'
import { CardsWrapper } from '@ez/web/components/portable/cards'
import { EbooksWrapper } from '@ez/web/components/portable/ebooks'
import { ImageWrapper } from '@ez/web/components/portable/image'
import { TabsWrapper } from '@ez/web/components/portable/tabs'
import { TestimonialsWrapper } from '@ez/web/components/portable/testimonials'

export const createPortableComponents = () => {
  const types = {
    ...portableTypes,
    image: ImageWrapper,
    testimonialWidget: TestimonialsWrapper,
    ebooksWidget: EbooksWrapper,
    tabsWidget: TabsWrapper,
    cardsWidget: CardsWrapper,
  }

  return {
    types,
    block: portableBlocks,
    marks: portableMarks,
    list: portableLists,
  }
}
