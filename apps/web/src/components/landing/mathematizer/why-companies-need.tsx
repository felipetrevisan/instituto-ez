'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerWhyCompanyNeed } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const WhyCompaniesNeed = ({
  data,
  locale,
}: {
  data: SectionMathematizerWhyCompanyNeed
  locale: string
}) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="why-i-need">
      <div className="bg-secondary/30 py-16 sm:py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            {data?.heading?.[locale] && (
              <motion.h2
                className="font-bold text-3xl md:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
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
                className="mx-auto max-w-3xl text-foreground/90 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.p>
            )}

            {data.cta && (
              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <CallAction
                  action={data.cta.type === LinkType.DIALOG ? 'button' : 'link'}
                  base="mathematizer"
                  className="group px-8 py-6 dark:hover:bg-accent dark:hover:outline-accent"
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
