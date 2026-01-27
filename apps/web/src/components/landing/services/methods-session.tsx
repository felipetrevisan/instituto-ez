'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { Card, CardContent } from '@ez/shared/ui'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionServicesMethodSessions } from '@ez/web/types/landing/services'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const MethodsSession = ({
  data,
  locale,
}: {
  data: SectionServicesMethodSessions
  locale: string
}) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection className="py-20 md:py-32" id="methods-session">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-6 text-center">
            {data?.heading?.[locale] && (
              <motion.h2
                className="text-center font-bold text-3xl md:text-4xl lg:text-5xl"
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

            {data?.subheading?.[locale] && (
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
          </div>

          {data.items && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {data.items.map((method, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`services-methods-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Card
                      className="hover-lift border-border bg-card transition-all duration-300 hover:border-accent/50"
                      theme="landing"
                      variant="landing"
                    >
                      <CardContent className="space-y-1.5 p-6">
                        {method.icon && (
                          <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10">
                            <Icon className="size-6 text-accent" name={method.icon} />
                          </div>
                        )}
                        <h3 className="font-bold text-xl">{method.title[locale]}</h3>
                        <p className="text-foreground/80">{method.description[locale]}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="mt-12 pt-8 text-center">
            {data?.footer?.[locale] && (
              <p className="mb-6 text-foreground/90 text-lg italic">
                <PortableText components={createPortableComponents()} value={data.footer[locale]} />
              </p>
            )}
            {data.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                {data.cta.map((button) => {
                  return (
                    <CallAction
                      action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                      base="about"
                      className="group px-8 py-6 font-semibold"
                      effect={button.theme.effect}
                      icon={{
                        prefix: {
                          className: 'mr-2 size-5',
                          name: button.iconPrefix as IconName,
                        },
                        suffix: {
                          className: 'ml-2 size-5 transition-transform group-hover:translate-x-1',
                          name: button.iconSuffix as IconName,
                        },
                      }}
                      key={button._key}
                      label={button.label[locale]}
                      link={button.type === LinkType.DIALOG ? undefined : button.link[locale]}
                      onClick={
                        button.type === LinkType.DIALOG
                          ? () => setIsContactDialogOpen(true)
                          : undefined
                      }
                      rounded={button.theme.rounded}
                      size={button.theme.size}
                      theme={button.theme.theme}
                      variant={button.theme.variant}
                    />
                  )
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
