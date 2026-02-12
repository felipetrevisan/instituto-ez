'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHomeMentorShip } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const MentorShip = ({ data, locale }: { data: SectionHomeMentorShip; locale: string }) => {
  return (
    <StickySection className="relative bg-brand-light py-20 md:py-32" id="mentor-ship">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--brand-accent-rgb),0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-5 py-2 font-semibold text-accent text-sm uppercase tracking-widest shadow-[0_0_18px_rgba(var(--brand-accent-rgb),0.12)]">
            Atendimentos Personalizados
          </span>
        </motion.div>
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
                  <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20 transition-all duration-300 group-hover:bg-accent/30">
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
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item, index) => {
                return (
                  <motion.div
                    className="group rounded-2xl border border-border/50 bg-card/90 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`home-mentorship-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {item.icon && (
                      <div className="mb-4 flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 transition-all duration-300 group-hover:bg-primary/25">
                        <Icon className="size-6 text-primary" name={item.icon} strokeWidth={2} />
                      </div>
                    )}
                    <h3 className="mb-2 font-bold text-foreground text-lg">{item.title[locale]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description[locale]}
                    </p>
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
                  base="default"
                  button={button}
                  className="group px-8 py-6 font-semibold"
                  key={button._key ?? index}
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
