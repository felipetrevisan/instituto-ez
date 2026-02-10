'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMasterclassForWho } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'

export const ForWho = ({ data, locale }: { data: SectionMasterclassForWho; locale: string }) => {
  return (
    <StickySection
      className="relative w-screen overflow-hidden bg-card py-24 lg:py-32"
      id="for-who"
    >
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold font-display text-3xl md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
        </motion.div>

        <motion.div
          className="mx-auto mb-16 max-w-3xl space-y-5"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.intro?.[locale] && (
            <p className="text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
              <PortableText components={createPortableComponents()} value={data.intro[locale]} />
            </p>
          )}
          {data?.introSecondary?.[locale] && (
            <p className="text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
              <PortableText
                components={createPortableComponents()}
                value={data.introSecondary[locale]}
              />
            </p>
          )}
        </motion.div>

        {data?.label && (
          <motion.div
            className="mx-auto mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-semibold text-foreground text-lg">
              {resolveLocaleString(data.label, locale)}
            </p>
          </motion.div>
        )}

        {data?.insights && data.insights.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4">
              {data.insights.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  key={item._key ?? `insight-${index}`}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <div className="group flex items-start gap-5 rounded-xl border border-border bg-secondary/50 p-5 transition-all duration-300 hover:border-primary/30">
                    <div className="mt-0.5 flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-gold shadow-button transition-transform duration-300 group-hover:scale-110">
                      {item.icon ? (
                        <Icon className="size-6 text-primary-foreground" name={item.icon} />
                      ) : (
                        <span className="size-2.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <p className="font-medium text-foreground text-lg leading-relaxed">
                      {resolveLocaleString(item.text, locale)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          className="mx-auto mt-16 max-w-3xl space-y-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.closing?.[locale] && (
            <p className="text-center text-lg text-muted-foreground leading-relaxed md:text-xl">
              <PortableText components={createPortableComponents()} value={data.closing[locale]} />
            </p>
          )}

          {data?.cta && data.cta.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              {data.cta.map((button, index) => (
                <CallAction
                  base="default"
                  button={button}
                  className="px-6 py-4 text-lg"
                  key={button._key ?? index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </StickySection>
  )
}
