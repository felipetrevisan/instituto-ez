'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ez/shared/ui/carousel'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionImmersionFinalCTA } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const FinalCTA = ({ data, locale }: { data: SectionImmersionFinalCTA; locale: string }) => {
  const t = useTranslations('LandingPageImmersion')

  return (
    <StickySection
      className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-navy py-20 md:py-28"
      id="final-cta"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 size-80 rounded-full bg-cyan blur-[100px]" />
        <div className="absolute right-1/4 bottom-20 size-60 rounded-full bg-purple blur-[80px]" />
      </div>
      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="mb-4 font-bold text-3xl text-white md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.subheading?.[locale] && (
            <div className="text-lg text-white/70">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </div>
          )}
        </motion.div>

        {data?.images && data.images.length > 0 && (
          <motion.div
            className="relative mx-auto mb-16 max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Carousel
              className="w-full"
              opts={{
                align: 'center',
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {data.images.map((image, index) => {
                  const imageKey =
                    image._key ??
                    (image.asset as { _ref?: string; _id?: string })?._ref ??
                    (image.asset as { _id?: string })?._id ??
                    'image'

                  return (
                    <CarouselItem className="pl-4 md:basis-1/3" key={imageKey}>
                      <div className="overflow-hidden rounded-2xl">
                        {image?.asset && (
                          <Image
                            alt={t('finalCtaImageAlt', { index: index + 1 })}
                            className="h-[28rem] w-full object-cover transition-transform duration-500 hover:scale-105"
                            height={448}
                            src={urlForImage(image.asset).auto('format').quality(80).url()}
                            width={560}
                          />
                        )}
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="-left-4 hidden border-white/20 bg-white/10 text-white hover:bg-white/20 md:flex" />
              <CarouselNext className="-right-4 hidden border-white/20 bg-white/10 text-white hover:bg-white/20 md:flex" />
            </Carousel>
          </motion.div>
        )}

        {data?.cta && data.cta.length > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data.cta.map((button, index) => (
              <CallAction
                base="immersion"
                button={button}
                className="group px-8 py-6 font-semibold"
                key={button._key ?? index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
