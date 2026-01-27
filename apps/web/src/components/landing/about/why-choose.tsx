'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionAboutWhyChoose } from '@ez/web/types/landing/about'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const WhyChoose = ({ data, locale }: { data: SectionAboutWhyChoose; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="why-choose">
      <div className="bg-gradient-subtle py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            {data?.heading?.[locale] && (
              <motion.h2
                className="mb-12 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: -20 }}
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

            {data?.description?.[locale] && (
              <motion.div
                className="mb-12 space-y-6"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-warm text-lg leading-relaxed md:text-xl">
                  <PortableText
                    components={createPortableComponents()}
                    value={data.description[locale]}
                  />
                </p>
              </motion.div>
            )}

            {data.cta && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <CallAction
                  action={data.cta.type === LinkType.DIALOG ? 'button' : 'link'}
                  base="about"
                  className="group px-8 py-6 font-semibold"
                  effect={data.cta.theme.effect}
                  icon={{
                    prefix: {
                      className: 'mr-2 size-5',
                      name: data.cta.iconPrefix as IconName,
                    },
                    suffix: {
                      className: 'ml-2 size-5 transition-transform group-hover:translate-x-1',
                      name: data.cta.iconSuffix as IconName,
                    },
                  }}
                  key={data.cta._key}
                  label={data.cta.label[locale]}
                  link={data.cta.type === LinkType.DIALOG ? undefined : data.cta.link[locale]}
                  onClick={
                    data.cta.type === LinkType.DIALOG
                      ? () => setIsContactDialogOpen(true)
                      : undefined
                  }
                  rounded={data.cta.theme.rounded}
                  size={data.cta.theme.size}
                  theme={data.cta.theme.theme}
                  variant={data.cta.theme.variant}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
