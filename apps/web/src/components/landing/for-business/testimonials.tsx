'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { cn } from '@ez/shared/lib/utils'
import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessTestimonial } from '@ez/web/types/landing/for-business'
import { motion } from 'motion/react'

export const Testimonials = ({
  data,
  locale,
}: {
  data: SectionForBusinessTestimonial
  locale: string
}) => {
  const colors = ['primary', 'secondary', 'tertiary', 'accent']

  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="testimonials">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div
              className="space-y-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                {data.heading[locale]}
              </h2>
            </motion.div>

            {data.items && (
              <div className="grid gap-6 md:grid-cols-3">
                {data.items.map((item, index) => {
                  const color = colors[index % colors.length]

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      key={`forbusiness-testimonial-${index}`}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <Card
                        base="for-business"
                        className={cn(
                          'hover:-translate-y-1 space-y-4 bg-gradient-to-br from-card p-6 text-center hover:shadow-[var(--shadow-card-hover)]',
                          {
                            'to-primary/5': color === 'primary',
                            'to-secondary/5': color === 'secondary',
                            'to-tertiary/5': color === 'tertiary',
                            'to-accent/5': color === 'accent',
                          },
                        )}
                        theme="accent"
                        variant="landing"
                      >
                        {item.icon && (
                          <div
                            className={cn(
                              'mx-auto flex size-16 items-center justify-center rounded-full',
                              {
                                'bg-primary/10': color === 'primary',
                                'bg-secondary/10': color === 'secondary',
                                'bg-tertiary/10': color === 'tertiary',
                                'bg-accent/10': color === 'accent',
                              },
                            )}
                          >
                            <Icon
                              className={cn('size-8', {
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
                          <p
                            className={cn('font-bold text-4xl', {
                              'text-primary': color === 'primary',
                              'text-secondary': color === 'secondary',
                              'text-tertiary': color === 'tertiary',
                              'text-accent': color === 'accent',
                            })}
                          >
                            {item.title[locale]}
                          </p>
                          <p className="font-semibold text-foreground">
                            {item.description[locale]}
                          </p>
                          <p className="text-muted-foreground text-sm">{item.text[locale]}</p>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {data.cta && (
              <div className="pt-4 text-center">
                <Button
                  base="for-business"
                  className="group"
                  effect={data.cta.theme.effect}
                  onClick={() => setIsContactDialogOpen(true)}
                  rounded={data.cta.theme.rounded}
                  scaleEffect={false}
                  size={data.cta.theme.size}
                  theme={data.cta.theme.theme}
                >
                  {data.cta.iconPrefix && (
                    <Icon className="mr-2 size-4" name={data.cta.iconPrefix} />
                  )}
                  {data.cta.label?.[locale]}
                  {data.cta.iconSuffix && (
                    <Icon
                      className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                      name={data.cta.iconSuffix}
                    />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
