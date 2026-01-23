'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@ez/shared/ui'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionAboutServices } from '@ez/web/types/landing/about'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Services = ({ data, locale }: { data: SectionAboutServices; locale: string }) => {
  return (
    <StickySection className="w-screen" id="services">
      <div className="bg-muted py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              className="mb-4 text-center font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>

            {data.subheading && (
              <motion.p
                className="mx-auto mb-16 max-w-3xl text-center text-gray-warm text-lg"
                initial={{ opacity: 0, y: -20 }}
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((service, index) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      key={`about-services-${index}`}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <Card
                        className="group h-full transition-all hover:border-cyan/30 hover:shadow-medium"
                        theme="landing"
                        variant="landing"
                      >
                        <CardHeader className="space-y-1.5 p-6">
                          {service.icon && (
                            <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-cyan transition-transform group-hover:scale-110 dark:from-navy-light">
                              <Icon
                                className="size-7 text-white"
                                name={service.icon}
                                strokeWidth={2}
                              />
                            </div>
                          )}
                          <CardTitle className="mb-2 text-navy text-xl dark:text-navy-light">
                            {service.title[locale]}
                          </CardTitle>
                          <CardDescription className="text-gray-warm leading-relaxed">
                            {service.description[locale]}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
