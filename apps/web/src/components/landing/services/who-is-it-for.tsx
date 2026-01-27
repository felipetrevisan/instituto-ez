'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionServicesWhoIsItFor } from '@ez/web/types/landing/services'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const WhoIsItFor = ({
  data,
  locale,
}: {
  data: SectionServicesWhoIsItFor
  locale: string
}) => {
  return (
    <StickySection className="w-screen bg-gray-light py-20 md:py-32" id="assessment">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          {data?.heading?.[locale] && (
            <h2 className="mb-12 text-center font-bold text-3xl md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.text?.[locale] && (
            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
            </div>
          )}

          {data?.footer?.[locale] && (
            <p className="pt-4 text-center font-semibold text-accent text-xl">
              <PortableText components={createPortableComponents()} value={data.footer[locale]} />
            </p>
          )}
        </div>

        {data.cta && data.cta.length > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          >
            {data.cta.map((button, index) => {
              return (
                <CallAction
                  key={button._key ?? index}
                  base="about"
                  button={button}
                  className="group px-8 py-6 font-semibold"
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
