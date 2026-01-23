'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringTargetAudience } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const TargetAudience = ({
  data,
  locale,
}: {
  data: SectionMentoringTargetAudience
  locale: string
}) => {
  return (
    <StickySection id="target-audience">
      <div className="bg-gradient-subtle py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              className="mb-8 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>

            {data.text && (
              <motion.div
                className="space-y-6 text-justify text-gray-warm text-lg leading-relaxed md:text-left md:text-xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText components={createPortableComponents()} value={data.text[locale]} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
