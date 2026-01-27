'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringExpectedResults } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const ExpectedResults = ({
  data,
  locale,
}: {
  data: SectionMentoringExpectedResults
  locale: string
}) => {
  return (
    <StickySection className="w-screen" id="results">
      <div className="bg-navy py-16 sm:py-20 md:py-28 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            {data?.heading?.[locale] && (
              <motion.h2
                className="mb-4 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
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

            {data?.subheading?.[locale] && (
              <motion.p
                className="mx-auto mb-12 max-w-3xl text-justify text-lg text-white/80 md:text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {data.items.map((result, index) => (
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan/30 hover:bg-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={`mentory-expected-results-${index}`}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-coral">
                      <svg
                        className="size-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                        />
                      </svg>
                    </div>
                    <p className="text-base text-white/90 leading-relaxed md:text-lg">
                      {result.title[locale]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
