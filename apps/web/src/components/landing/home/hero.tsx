'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  return (
    <StickySection
      className="relative mt-24 h-full w-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 dark:from-background dark:via-background/95 dark:to-background/90"
      id="hero"
    >
      {data?.image && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${urlForImage(data.image.asset).auto('format').quality(80).flipHorizontal().url()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <div className="relative z-10 px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {data?.heading?.[locale] && (
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-bold text-4xl text-primary-foreground leading-tight md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h1>
          )}

          {data?.subheading?.[locale] && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-10 max-w-3xl font-light text-base text-primary-foreground/90 md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </motion.div>
          )}

          {data.cta && data.cta.length > 0 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center gap-4 pt-8 md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              {data.cta.map((button, index) => {
                return (
                  <CallAction
                    base="default"
                    button={button}
                    className="group w-full px-8 py-6 font-semibold md:w-auto"
                    key={button._key ?? index}
                  />
                )
              })}
            </motion.div>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-18 bg-gradient-to-t from-background via-background/70 to-transparent" />{' '}
    </StickySection>
  )
}
