'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card } from '@ez/shared/ui/card'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessDiagnostic } from '@ez/web/types/landing/for-business'
import { motion } from 'motion/react'

export const Diagnostic = ({
  data,
  locale,
}: {
  data: SectionForBusinessDiagnostic
  locale: string
}) => {
  const colors = ['primary', 'secondary', 'tertiary', 'accent']

  return (
    <StickySection id="diagnostics">
      <div className="bg-card py-16 sm:py-20">
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
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  <div className="space-y-6">
                    <h2 className="font-bold text-3xl text-foreground leading-tight md:text-4xl">
                      {data.heading[locale]}
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {data.subheading[locale]}
                    </p>
                  </div>

                  {data.items && (
                    <div className="space-y-4">
                      {data.items.map((item, index) => {
                        const color = colors[index % colors.length]

                        return (
                          <motion.div
                            className={cn(
                              'flex items-start gap-4 rounded-lg p-6 transition-colors',
                              {
                                'bg-primary/5 hover:bg-primary/10': color === 'primary',
                                'bg-secondary/5 hover:bg-secondary/10': color === 'secondary',
                                'bg-tertiary/5 hover:bg-tertiary/10': color === 'tertiary',
                                'bg-accent/5 hover:bg-accent/10': color === 'accent',
                              },
                            )}
                            initial={{ opacity: 0, x: 40 }}
                            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                            key={`forbusiness-diagnostic-${index}`}
                            transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, x: 0 }}
                          >
                            {item.icon && (
                              <Icon
                                className={cn('flex-shrink-0', {
                                  'text-primary': color === 'primary',
                                  'text-secondary': color === 'secondary',
                                  'text-tertiary': color === 'tertiary',
                                  'text-accent': color === 'accent',
                                })}
                                name={item.icon}
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {item.title[locale]}
                              </h3>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
