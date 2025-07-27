'use client'

import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import { useEbooks } from '@ez/web/hooks/use-ebook'
import ClassNames from 'embla-carousel-class-names'
import { motion } from 'framer-motion'
import { EbookCard as Card } from './card'
import { Skeleton } from './skeleton'

export function Ebooks() {
  const { data, isLoading } = useEbooks()

  const paginate = (pageSize: number) => {
    const pagseSize = pageSize ?? 6
    const pages = []

    if (!data) return []

    for (let i = 0; i < data?.length; i += pagseSize) {
      pages.push(data?.slice(i, i + pageSize))
    }

    return pages
  }

  const paginatedItems = paginate(6)

  return (
    <motion.div layout className="flex flex-col space-y-12">
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 h-full flex-wrap">
        {isLoading && <Skeleton />}
        {!isLoading && (
          <Carousel plugins={[ClassNames()]} className="overflow-visible">
            <CarouselDots theme="default" rootClassName="pb-24" />
            <CarouselContent>
              {paginatedItems.map((page, pageIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <CarouselItem key={pageIndex} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:grid-rows-2 gap-12 gap-y-12 place-items-center">
                    {page.map((ebook) => (
                      <Card key={ebook.id} item={ebook} theme="default" />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </motion.div>
  )
}
