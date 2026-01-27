'use client'

import { cn } from '@ez/shared/lib/utils'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHomeDevelopment } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Development = ({ data, locale }: { data: SectionHomeDevelopment; locale: string }) => {
  const colors = ['blue', 'emerald', 'amber', 'rose']

  return (
    <StickySection className="relative bg-brand-light py-20 md:py-32" id="development">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--brand-accent-rgb),0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {data?.heading?.[locale] && (
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-center font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <PortableText components={createPortableComponents()} value={data.heading[locale]} />
          </motion.h2>
        )}

        <div className="space-y-5">
          {data.mainBox && (
            <div className="group rounded-2xl border border-accent/20 bg-card/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40">
              <div className="flex items-start gap-5">
                {data.mainBox.icon && (
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20 transition-all duration-300 group-hover:bg-accent/30">
                    <Icon className="size-7 text-accent" name={data.mainBox.icon} strokeWidth={2} />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="mb-2 font-bold text-foreground text-xl">
                    {data.mainBox.title[locale]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.mainBox.description[locale]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.items.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
              {data.items.map((item, index) => {
                const color = colors[index % colors.length]

                return (
                  <motion.div
                    className={cn(
                      'flex items-start gap-4 rounded-xl border border-border/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30',
                      {
                        'bg-gradient-to-l from-blue-100/80 to-blue-50/40 dark:from-blue-800/80 dark:to-blue-450/40':
                          color === 'blue',
                        'bg-gradient-to-l from-emerald-100/80 to-emerald-50/40 dark:from-emerald-800/80 dark:to-emerald-450/40':
                          color === 'emerald',
                        'bg-gradient-to-l from-amber-100/80 to-amber-50/40 dark:from-amber-800/80 dark:to-amber-450/40':
                          color === 'amber',
                        'bg-gradient-to-l from-rose-100/80 to-rose-50/40 dark:from-rose-800/80 dark:to-rose-450/40':
                          color === 'rose',
                      },
                    )}
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`home-development-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {item.icon && (
                      <div className="flex-shrink-0 rounded-xl bg-background/60 p-3">
                        <Icon className="size-6 text-accent" name={item.icon} strokeWidth={2} />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-2 font-bold text-foreground text-lg">
                        {item.title[locale]}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description[locale]}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
        {data.cta && data.cta.length > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          >
            {data.cta.map((button, index) => {
              return (
                <CallAction
                  key={button._key ?? index}
                  base="default"
                  button={button}
                  className="group px-8 py-6 font-semibold"
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
