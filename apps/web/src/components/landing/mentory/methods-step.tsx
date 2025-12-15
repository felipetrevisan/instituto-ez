'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringMethodsStep } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const MethodsStep = ({
  data,
  locale,
}: {
  data: SectionMentoringMethodsStep
  locale: string
}) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="methods-step">
      <div className="bg-background py-16 sm:py-20 md:py-28 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              className="mb-4 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>

            {data.subheading && (
              <motion.p
                className="mx-auto mb-16 max-w-3xl text-center text-gray-warm text-lg"
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

            {data.items.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {data.items.map((step, index) => {
                  return (
                    <motion.div
                      className="group rounded-2xl border border-border/50 bg-card p-8 shadow-soft transition-all hover:border-cyan/30 hover:shadow-medium"
                      initial={{ opacity: 0, y: 30 }}
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      key={`mentory-step-${index}`}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex h-full flex-col">
                        <div className="mb-6 flex items-center gap-4">
                          {step.icon && (
                            <div className="flex size-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-cyan transition-transform group-hover:scale-110">
                              <Icon
                                className="size-8 text-white"
                                name={step.icon}
                                strokeWidth={2}
                              />
                            </div>
                          )}
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy/10 font-bold text-lg text-navy">
                            {index + 1}
                          </div>
                        </div>
                        <h3 className="mb-4 font-semibold text-navy text-xl">
                          {step.title[locale]}
                        </h3>
                        <p className="text-base text-gray-warm leading-relaxed">
                          {step.description[locale]}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {data.cta && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <CallAction
                  action={data.cta.type === LinkType.DIALOG ? 'button' : 'link'}
                  base="mentory"
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
                  onClick={() => setIsContactDialogOpen(true)}
                  rounded={data.cta.theme.rounded}
                  size={data.cta.theme.size}
                  theme={data.cta.theme.theme}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
