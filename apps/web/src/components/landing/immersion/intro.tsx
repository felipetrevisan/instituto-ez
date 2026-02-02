'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionImmersionIntro } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Intro = ({ data, locale }: { data: SectionImmersionIntro; locale: string }) => {
  return (
    <StickySection className="bg-gray-light py-16 sm:py-20 md:py-28" id="intro">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {data?.heading?.[locale] && (
              <motion.h2
                className="font-bold text-3xl text-navy md:text-4xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
              </motion.h2>
            )}

            {data?.text?.[locale] && (
              <div className="text-gray-warm text-lg leading-relaxed">
                <PortableText components={createPortableComponents()} value={data.text[locale]} />
              </div>
            )}
          </motion.div>

          {data.image && (
            <motion.div
              className="relative h-[400px] w-full"
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Image
                alt=""
                className="mx-auto w-full max-w-md rounded-2xl shadow-medium"
                fill
                src={urlForImage(data.image.asset).auto('format').quality(80).url()}
              />
            </motion.div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
