'use client'

import { Carousel, CarouselContent, CarouselItem } from '@ez/shared/ui/carousel'
import { textVariants } from '@ez/web/config/animation'
import { urlForImage } from '@ez/web/config/image'
import { useBanner } from '@ez/web/hooks/use-banner'
import ClassNames from 'embla-carousel-class-names'
import { motion } from 'framer-motion'
import { Parallax } from 'react-parallax'
import { Skeleton } from './skeleton'

export function Banner() {
  const { data, isLoading } = useBanner()

  if (!isLoading && !data) return <></>

  return (
    <motion.div layout className='relative flex h-[200px] w-full flex-col lg:h-[350px]'>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <Carousel
          opts={{ dragFree: false, watchDrag: false, watchFocus: false }}
          plugins={[ClassNames()]}
        >
          <CarouselContent>
            {data?.map(({ id, title, subtitle, image }) => (
              <CarouselItem key={id} className="basis-full">
                <Parallax
                  bgImage={urlForImage(image.asset).url()}
                  className='h-full w-full overflow-hidden lg:rounded-lg'
                >
                  <motion.div
                    className="flex h-[200px] lg:h-[350px]"
                    variants={textVariants}
                    animate="show"
                    initial="hide"
                  >
                    {/* absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 */}
                    <div className='flex w-full flex-col items-center justify-center p-5 font-bold font-oswald text-white md:p-5 lg:p-5 xl:p-0'>
                      <motion.h3 className="clamp-[text,4xl,6xl] italic">{title}</motion.h3>
                      <motion.h1 className='clamp-[text,2xl,6xl] w-full text-center xl:w-3/5'>
                        {subtitle}
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
