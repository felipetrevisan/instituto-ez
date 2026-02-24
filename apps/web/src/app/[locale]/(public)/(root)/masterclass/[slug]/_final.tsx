'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import type { MasterclassFinal } from '@ez/web/types/masterclass'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'

export function Final({ data }: { data: MasterclassFinal }) {
  const heading = data?.heading
  const summary = data?.summary
  const benefits = data?.benefits ?? []
  const details = data?.details ?? []

  const mid = Math.ceil(benefits.length / 2)
  const leftBenefits = benefits.slice(0, mid)
  const rightBenefits = benefits.slice(mid)

  return (
    <section className="relative w-screen overflow-hidden bg-foreground py-20 text-card md:py-28 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 size-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_45%)]" />

      <div className="container relative z-10">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {heading && (
            <h2 className="text-balance font-bold text-2xl md:text-3xl lg:text-4xl">
              <span className="bg-gradient-to-r from-vivid-amber via-vivid-coral to-vivid-amber bg-clip-text text-transparent">
                {heading}
              </span>
            </h2>
          )}
        </motion.div>

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-6">
          {leftBenefits.length > 0 && (
            <div className="hidden flex-1 flex-col items-end gap-5 lg:flex">
              {leftBenefits.map((item, index) => (
                <BenefitCard index={index} key={`${item ?? 'benefit'}-left-${index}`} text={item} />
              ))}
            </div>
          )}

          <motion.div
            className="w-full flex-shrink-0 text-center lg:w-auto lg:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {summary && (
              <p className="mx-auto mb-10 max-w-2xl text-base text-card/80 md:text-lg dark:text-zinc-300">
                {summary}
              </p>
            )}

            {data?.cta && (
              <CallAction
                base="default"
                button={data.cta}
                className="h-14 rounded-md bg-primary px-10 font-semibold text-lg text-primary-foreground shadow-primary transition-all hover:scale-105 hover:bg-primary-hover"
              />
            )}

            {details.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-card/60 text-sm dark:text-zinc-400">
                {details.map((item, index) => (
                  <span
                    className="flex items-center gap-2"
                    key={`${item.label ?? 'detail'}-${index}`}
                  >
                    {item.icon ? (
                      <Icon className="size-4 text-primary" name={item.icon} />
                    ) : (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                    {item.label}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {rightBenefits.length > 0 && (
            <div className="hidden flex-1 flex-col items-start gap-5 lg:flex">
              {rightBenefits.map((item, index) => (
                <BenefitCard
                  index={index + leftBenefits.length}
                  key={`${item ?? 'benefit'}-right-${index}`}
                  text={item}
                />
              ))}
            </div>
          )}
        </div>

        {benefits.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {benefits.map((item, index) => (
              <BenefitCard
                compact
                index={index}
                key={`${item ?? 'benefit'}-mobile-${index}`}
                text={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function BenefitCard({
  text,
  index,
  compact = false,
}: {
  text?: string
  index: number
  compact?: boolean
}) {
  return (
    <motion.div
      className="max-w-[280px] rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
      initial={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className={compact ? 'size-3.5' : 'size-3.5'} />
        </span>
        <span className="text-card/80 text-sm leading-snug dark:text-zinc-300">{text}</span>
      </div>
    </motion.div>
  )
}
