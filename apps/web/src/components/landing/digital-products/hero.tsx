'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionDigitalProductsHero } from '@ez/web/types/landing/digital-products'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { ArrowDown, BookOpen } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

export const Hero = ({ data, locale }: { data: SectionDigitalProductsHero; locale: string }) => {
  return (
    <StickySection className="relative mt-24 w-screen" id="hero">
      <div className="relative flex min-h-[90vh] items-center overflow-hidden">
        {data.image && (
          <div className="absolute inset-0 z-0">
            <Image
              alt=""
              className="h-full w-full object-cover"
              fill
              src={urlForImage(data.image.asset).auto('format').quality(80).url()}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60 dark:from-gray-light/95 dark:via-gray-light/80 dark:to-gray-light/60" />
          </div>
        )}

        <div className="container relative z-10 mx-auto px-6 py-20 md:px-8">
          <div className="max-w-3xl">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/20 px-4 py-2 font-medium text-cyan text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="size-4" />
              Produtos Digitais
            </motion.div>

            {data?.heading?.[locale] && (
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 font-bold text-4xl text-white leading-tight md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
              </motion.h1>
            )}

            {data?.subheading?.[locale] && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-gray-300 text-lg leading-relaxed md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.p>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                className="space-y-4 pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {data.cta.map((button, index) => {
                  return (
                    <CallAction
                      base="ebook"
                      button={button}
                      className="group px-8 py-6 font-semibold"
                      key={button._key ?? index}
                    />
                  )
                })}
                {data?.footer?.[locale] && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-2xl text-muted-foreground text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <PortableText
                      components={createPortableComponents()}
                      value={data.footer[locale]}
                    />
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: [0, 10, 0] }}
          className="-translate-x-1/2 absolute bottom-8 left-1/2 cursor-pointer text-white/60"
          initial={{ opacity: 0 }}
          //onClick={scrollToProducts}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1, duration: 1.5, repeat: Infinity },
          }}
        >
          <ArrowDown className="size-8" />
        </motion.div>
      </div>
    </StickySection>
  )
}
