'use client'

import { cn } from '@ez/shared/lib/utils'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import type { MasterclassWhy } from '@ez/web/types/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export function Why({ data }: { data: MasterclassWhy }) {
  const items = data?.items ?? []

  return (
    <section className="relative w-screen overflow-hidden bg-section-dark py-20 md:py-28">
      <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/3 left-1/2 size-[600px] rounded-full bg-vivid-amber/5 blur-[120px]" />
      <div className="container relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.badge && (
            <span className="inline-block rounded-full border border-vivid-amber/20 bg-vivid-amber/10 px-4 py-1.5 font-semibold text-sm text-vivid-amber">
              {data.badge}
            </span>
          )}
        </motion.div>

        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.statement && (
            <div className="inline-block rounded-2xl border border-vivid-amber/25 bg-section-dark/90 px-10 py-8 shadow-[0_0_60px_hsl(38_92%_50%/0.08)] backdrop-blur-xl md:px-14 md:py-10">
              <h3 className="font-bold text-3xl text-white leading-tight md:text-4xl">
                <PortableText components={createPortableComponents()} value={data.statement} />
              </h3>
            </div>
          )}
        </motion.div>

        {items.length > 0 && (
          <>
            <div className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-[900px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[350px] w-[700px] rounded-full border border-vivid-amber/10 border-dashed" />
                <div className="mx-auto grid max-w-[850px] grid-cols-3 gap-6">
                  {items.slice(0, 3).map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      key={`${item.title ?? 'highlight'}-${index}`}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <HighlightCard item={item} />
                    </motion.div>
                  ))}
                </div>
                <div className="mx-auto mt-6 grid max-w-[560px] grid-cols-2 gap-6">
                  {items.slice(3, 5).map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      key={`${item.title ?? 'highlight'}-bottom-${index}`}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <HighlightCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    key={`${item.title ?? 'highlight'}-mobile-${index}`}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <HighlightCard compact item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {data?.body && (
          <motion.div
            className="mx-auto mt-16 max-w-3xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="text-base text-white/65 leading-relaxed md:text-lg">
              <PortableText components={createPortableComponents()} value={data.body} />
            </div>
          </motion.div>
        )}

        {data?.closing && (
          <motion.div
            className="mx-auto mt-10 max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="font-semibold text-lg text-white/90">
              <PortableText components={createPortableComponents()} value={data.closing} />
            </div>
          </motion.div>
        )}

        {data?.cta && (
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <CallAction base="default" button={data.cta} />
          </motion.div>
        )}
      </div>
    </section>
  )
}

function HighlightCard({
  item,
  compact = false,
}: {
  item: { title?: string; description?: string }
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'group h-full rounded-xl border border-vivid-amber/30 bg-section-dark/80 p-6 transition-colors hover:border-vivid-amber/50',
        compact && 'p-5',
      )}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="size-2.5 rounded-full bg-vivid-amber" />
        <span className="font-bold text-sm text-white/90 md:text-base">{item.title}</span>
      </div>
      <p className="text-sm text-white/50 leading-relaxed transition-colors group-hover:text-white/65">
        {item.description}
      </p>
    </div>
  )
}
