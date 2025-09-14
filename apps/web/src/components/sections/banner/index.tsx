'use client'

import { Carousel, CarouselContent, CarouselItem } from '@ez/shared/ui/carousel'
import { textVariants } from '@ez/web/config/animation'
import { urlForImage } from '@ez/web/config/image'
import { useBanner } from '@ez/web/hooks/use-banner'
import ClassNames from 'embla-carousel-class-names'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'
import { Parallax } from 'react-parallax'
import { Skeleton } from './skeleton'

export function Banner() {
  const { data, isLoading } = useBanner()
  const locale = useLocale()

  if (!isLoading && !data) return null

  return (
    <motion.div className="relative flex h-[200px] w-full flex-col lg:h-[350px]" layout>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <Carousel
          opts={{ dragFree: false, watchDrag: false, watchFocus: false }}
          plugins={[ClassNames()]}
        >
          <CarouselContent>
            {data?.map(({ id, title, subtitle, image }) => (
              <CarouselItem className="basis-full" key={id}>
                <Parallax
                  bgImage={urlForImage(image.asset).format('webp').quality(80).url()}
                  className="h-full w-full overflow-hidden lg:rounded-lg"
                >
                  <motion.div
                    animate="show"
                    className="flex h-[200px] lg:h-[350px]"
                    initial="hide"
                    variants={textVariants}
                  >
                    <div className="flex w-full flex-col items-center justify-center p-5 font-bold font-oswald text-white md:p-5 lg:p-5 xl:p-0">
                      <motion.h3 className="text-4xl italic lg:text-6xl">
                        {title?.[locale]}
                      </motion.h3>
                      <motion.h1 className="w-full text-center text-2xl lg:text-4xl xl:w-3/5">
                        {subtitle?.[locale]}
                      </motion.h1>
                    </div>
                  </motion.div>
                </Parallax>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </motion.div>
  )
}
