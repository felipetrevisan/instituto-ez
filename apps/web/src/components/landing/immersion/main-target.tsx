'use client'

import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionImmersionMainTarget } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const MainTarget = ({
  data,
  locale,
}: {
  data: SectionImmersionMainTarget
  locale: string
}) => {
  return (
    <StickySection className="bg-background py-20 md:py-28" id="main-target">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3 block font-semibold text-coral text-sm uppercase tracking-wider">
            Para Quem é Esta Imersão
          </span>

          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold text-3xl text-navy-foreground md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
        </motion.div>

        {data?.profile && data.profile.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              {data.profile.map((item, index) => (
                <motion.div
                  className="flex items-start gap-4 rounded-xl bg-gray-light/50 p-4 transition-colors hover:bg-gray-light"
                  initial={{ opacity: 0, y: 20 }}
                  key={`${item._type}-${index}`}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {item.icon && (
                    <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-coral/20">
                      <Icon className="size-4 text-coral" name={item.icon} />
                    </div>
                  )}
                  <p className="text-gray-warm leading-relaxed">{item.text?.[locale]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data?.footer?.[locale] && (
          <motion.div
            className="mx-auto mt-16 max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-2xl border border-coral/20 bg-gradient-to-r from-coral/10 via-cyan/10 to-coral/10 p-8">
              <div className="mb-4 font-medium text-navy-foreground text-xl">
                <PortableText components={createPortableComponents()} value={data.footer[locale]} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
