'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { cn } from '@ez/shared/lib/utils'
import { LinkType } from '@ez/shared/types'
import { Card } from '@ez/shared/ui/card'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { Category, SectionForBusinessCourses } from '@ez/web/types/landing/for-business'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const Courses = ({ data, locale }: { data: SectionForBusinessCourses; locale: string }) => {
  const colors = ['primary', 'secondary', 'tertiary', 'accent']

  const { setIsContactDialogOpen } = useShared()

  const formatCategory = (categories: Category[]) =>
    categories.reduce((acc, item, index) => {
      if (index === 0) return item[locale]
      if (index === categories.length - 1) return `${acc} e ${item[locale]}`
      return `${acc}, ${item[locale]}`
    }, '')

  return (
    <StickySection id="courses">
      <div className="bg-muted/30 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div
              className="mx-auto max-w-3xl space-y-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                {data.heading[locale]}
              </h2>
              {data.subheading && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.subheading[locale]}
                </p>
              )}
            </motion.div>

            {data.items.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2">
                {data.items.map((item, index) => {
                  const color = colors[index % colors.length]

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      key={`forbusiness-courses-${index}`}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                      viewport={{ once: true, margin: '-100px' }}
                      whileHover={{ y: -8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <Card
                        className="h-full space-y-6 p-8 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
                        theme="landing"
                        variant="landing"
                      >
                        {item.icon && (
                          <div
                            className={cn(
                              'flex size-14 items-center justify-center rounded-lg bg-gradient-to-br',
                              {
                                'from-primary to-primary/70': color === 'primary',
                                'from-secondary to-secondary/70': color === 'secondary',
                                'from-tertiary to-tertiary/70': color === 'tertiary',
                                'from-accent to-accent/70': color === 'accent',
                              },
                            )}
                          >
                            <Icon
                              className={cn('size-7', {
                                'text-primary-foreground': color === 'primary',
                                'text-secondary-foreground': color === 'secondary',
                                'text-tertiary-foreground': color === 'tertiary',
                                'text-accent-foreground': color === 'accent',
                              })}
                              name={item.icon}
                            />
                          </div>
                        )}
                        <div className="space-y-3">
                          <h3 className="font-bold text-2xl text-foreground">
                            {item.title[locale]}
                          </h3>
                          <p className="font-medium text-lg text-secondary">
                            {item.description[locale]}
                          </p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{item.text[locale]}</p>

                        <div className="space-y-2 text-muted-foreground text-sm">
                          <p>
                            <span className="font-semibold text-foreground">Formato:</span> Workshop{' '}
                            {item.type === 'INPERSON' ? 'presencial' : 'remoto'},{' '}
                            {item.time?.[locale]}
                          </p>
                          {item.categories && (
                            <p>
                              <span className="font-semibold text-foreground">Foco:</span>{' '}
                              {formatCategory(item.categories ?? [])}
                            </p>
                          )}
                        </div>

                        {item.cta && (
                          <CallAction
                            action={item.cta.type === LinkType.DIALOG ? 'button' : 'link'}
                            base="for-business"
                            className="group"
                            effect={item.cta.theme.effect}
                            icon={{
                              prefix: {
                                className: 'mr-2 size-5',
                                name: item.cta.iconPrefix as IconName,
                              },
                              suffix: {
                                className:
                                  'ml-2 size-5 transition-transform group-hover:translate-x-1',
                                name: item.cta.iconSuffix as IconName,
                              },
                            }}
                            key={item.cta._key}
                            label={item.cta.label[locale]}
                            onClick={() => setIsContactDialogOpen(true)}
                            rounded={item.cta.theme.rounded}
                            size={item.cta.theme.size}
                            theme={item.cta.theme.theme}
                          />
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
