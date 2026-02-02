'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringIntro } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Intro = ({ data, locale }: { data: SectionMentoringIntro; locale: string }) => {
  const resolvePortableText = (value: SectionMentoringIntro['text']) => {
    if (!value) return undefined
    if (Array.isArray(value)) {
      return value.find((item) => item?.lang === locale)?.value
    }
    return value[locale]
  }

  const heading = resolvePortableText(data.heading)
  const text = resolvePortableText(data.text)

  return (
    <StickySection className="bg-gray-light py-16 sm:py-20 md:py-28" id="intro">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          {heading && (
            <motion.h2
              className="mb-12 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={heading} />
            </motion.h2>
          )}

          {text && text.length > 0 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="text-justify text-gray-warm text-lg leading-relaxed md:text-left md:text-xl">
                <PortableText components={createPortableComponents()} value={text} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
