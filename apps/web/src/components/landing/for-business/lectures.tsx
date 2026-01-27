'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card } from '@ez/shared/ui/card'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessLectures } from '@ez/web/types/landing/for-business'
import { motion } from 'motion/react'

export const Lectures = ({
  data,
  locale,
}: {
  data: SectionForBusinessLectures
  locale: string
}) => {
  const colors = ['primary', 'secondary', 'tertiary', 'accent']

  return (
    <StickySection id="lectures">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div
              className="mx-auto max-w-3xl space-y-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {data?.heading?.[locale] && (
                <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                  {data.heading[locale]}
                </h2>
              )}

              {data?.subheading?.[locale] && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.subheading[locale]}
                </p>
              )}
            </motion.div>

            {data.items.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2">
                {data.items.map((item, index: number) => {
                  const color = colors[index % colors.length]

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      key={`forbusiness-lectures-${index}`}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                      viewport={{ once: true, margin: '-100px' }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <Card
                        base="for-business"
                        className={cn(
                          'h-full space-y-6 border-l-4 bg-card p-8 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]',
                          {
                            'border-l-primary': color === 'primary',
                            'border-l-secondary': color === 'secondary',
                            'border-l-tertiary': color === 'tertiary',
                            'border-l-accent': color === 'accent',
                          },
                        )}
                        theme="accent"
                        variant="landing"
                      >
                        <div className="flex items-start gap-4">
                          {item.icon && (
                            <div
                              className={cn(
                                'flex size-12 flex-shrink-0 items-center justify-center rounded-lg',
                                {
                                  'bg-primary/10': color === 'primary',
                                  'bg-secondary/10': color === 'secondary',
                                  'bg-tertiary/10': color === 'tertiary',
                                  'bg-accent/10': color === 'accent',
                                },
                              )}
                            >
                              <Icon
                                className={cn('size-6', {
                                  'text-primary': color === 'primary',
                                  'text-secondary': color === 'secondary',
                                  'text-tertiary': color === 'tertiary',
                                  'text-accent': color === 'accent',
                                })}
                                name={item.icon}
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-xl">
                              {item.title[locale]}
                            </h3>
                            {item.tag && (
                              <div
                                className={cn(
                                  'inline-block rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs',
                                  {
                                    'bg-primary/10': color === 'primary',
                                    'bg-secondary/10': color === 'secondary',
                                    'bg-tertiary/10': color === 'tertiary',
                                    'bg-accent/10': color === 'accent',
                                  },
                                )}
                              >
                                {item.tag[locale]}
                              </div>
                            )}
                            <p className="font-medium text-secondary text-sm">
                              {item.description[locale]}
                            </p>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{item.text[locale]}</p>

                        {item.cta && (
                          <CallAction base="for-business" button={item.cta} className="group" />
                        )}
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
