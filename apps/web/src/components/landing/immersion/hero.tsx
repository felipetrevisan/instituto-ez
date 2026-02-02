'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  return (
    <StickySection className="relative w-screen overflow-hidden py-24 md:py-32 lg:py-40" id="hero">
      {data.image && (
        <div className="absolute inset-0 z-0">
          <Image
            alt=""
            className="h-full w-full object-cover"
            fill
            src={urlForImage(data.image.asset).auto('format').quality(80).url()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-6 py-20 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {data?.heading?.[locale] && (
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-balance font-bold text-4xl md:text-5xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h1>
          )}

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-wrap justify-center gap-x-3 gap-y-2"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-medium text-white text-xl md:text-2xl">Neurociência</span>
            <span className="text-white/50 text-xl md:text-2xl">•</span>
            <span className="font-medium text-white text-xl md:text-2xl">Espiritualidade</span>
            <span className="text-white/50 text-xl md:text-2xl">•</span>
            <span className="font-medium text-white text-xl md:text-2xl">Consciência</span>
            <span className="text-white/50 text-xl md:text-2xl">•</span>
            <span className="font-medium text-white text-xl md:text-2xl">Fé</span>
          </motion.div>

          {data.cta && data.cta.length > 0 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {data.cta.map((button, index) => {
                return (
                  <CallAction
                    base="mentory"
                    button={button}
                    className="group px-8 py-6 font-semibold"
                    key={button._key ?? index}
                  />
                )
              })}
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        className="-translate-x-1/2 absolute bottom-8 left-1/2"
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-2">
          <div className="h-2.5 w-1.5 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </StickySection>
  )
}
