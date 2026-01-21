'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { cn } from '@ez/shared/lib/utils'
import { LinkType } from '@ez/shared/types'
import { Card } from '@ez/shared/ui/card'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessConsulting } from '@ez/web/types/landing/for-business'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const Consulting = ({
  data,
  locale,
}: {
  data: SectionForBusinessConsulting
  locale: string
}) => {
  const colors = ['primary', 'secondary', 'accent']

  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="consulting">
      <div className="bg-gradient-to-br from-muted/30 to-background py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                className="p-8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-12"
                theme="landing"
                variant="landing"
              >
                <div className="space-y-8">
                  <div className="space-y-4 text-center">
                    <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                      {data.heading[locale]}
                    </h2>

                    {data.subheading && (
                      <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        {data.subheading[locale]}
                      </p>
                    )}
                  </div>

                  {data.items.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {data.items.map((item, index) => {
                        const color = colors[index % colors.length]

                        return (
                          <motion.div
                            className={cn(
                              'space-y-2 rounded-lg p-5 text-center transition-colors',
                              {
                                'bg-primary/5 hover:bg-primary/10': color === 'primary',
                                'bg-secondary/5 hover:bg-secondary/10': color === 'secondary',
                                'bg-accent/5 hover:bg-accent/10': color === 'accent',
                              },
                            )}
                            initial={{ opacity: 0, scale: 0.8 }}
                            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                            key={`forbusiness-consulting-${index}`}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                          >
                            {item.icon && (
                              <Icon
                                className={cn('mx-auto size-8', {
                                  'text-primary': color === 'primary',
                                  'text-secondary': color === 'secondary',
                                  'text-accent': color === 'accent',
                                })}
                                name={item.icon}
                              />
                            )}
                            <h4 className="font-semibold text-foreground">{item.title[locale]}</h4>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                  <div className="space-y-4 pt-4 text-center">
                    <p className="text-muted-foreground leading-relaxed">
                      O resultado é uma{' '}
                      <strong className="text-foreground">
                        cultura organizacional mais coerente, humana e eficiente
                      </strong>
                      .
                    </p>
                    {data.cta && (
                      <CallAction
                        action={data.cta.type === LinkType.DIALOG ? 'button' : 'link'}
                        base="for-business"
                        className="group"
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
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
