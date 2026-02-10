'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { urlForImage } from '@ez/web/config/image'
import type { MasterclassOffer } from '@ez/web/types/masterclass'
import { motion } from 'motion/react'
import Image from 'next/image'

export function Offer({ data }: { data: MasterclassOffer }) {
  const heading = data?.heading
  const subheading = data?.subheading
  const price = data?.price
  const seals = data?.seals ?? []

  return (
    <section className="relative overflow-hidden bg-section-dark py-20 md:py-28">
      <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-vivid-amber/40 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-vivid-amber via-vivid-coral to-vivid-amber" />

            {data?.badge && (
              <span className="mb-6 inline-block rounded-full border border-vivid-amber/20 bg-vivid-amber/10 px-4 py-1.5 font-bold text-sm text-vivid-amber">
                {data.badge}
              </span>
            )}

            {heading && (
              <h2 className="mb-2 text-balance font-bold text-2xl text-white md:text-3xl">
                {heading}
              </h2>
            )}

            {subheading && <p className="mb-8 text-base text-white/60 md:text-lg">{subheading}</p>}

            {(price?.original || price?.current) && (
              <div className="mb-8">
                {price?.original && (
                  <p className="mb-1 text-base text-white/40 line-through md:text-lg">
                    {price.original}
                  </p>
                )}
                <div className="flex items-baseline justify-center gap-2">
                  {price?.prefix && (
                    <span className="text-base text-white/60 md:text-lg">{price.prefix}</span>
                  )}
                  {price?.current && (
                    <span className="font-bold text-3xl text-vivid-amber md:text-4xl">
                      {price.current}
                    </span>
                  )}
                </div>
              </div>
            )}

            {data?.cta && (
              <CallAction
                base="default"
                button={data.cta}
                className="h-16 w-full rounded-md bg-vivid-amber px-12 font-bold text-lg text-section-dark shadow-[0_0_40px_hsl(38_92%_50%/0.35)] transition-all hover:scale-105 hover:bg-vivid-amber/90 hover:shadow-[0_0_60px_hsl(38_92%_50%/0.5)] md:w-auto"
              />
            )}
          </div>
        </motion.div>

        {seals.length > 0 && (
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {data?.sealsHeading && (
              <>
                <h3 className="mb-2 text-center font-bold text-vivid-amber text-xl md:text-2xl">
                  {data.sealsHeading}
                </h3>
                <div className="mx-auto mb-10 h-1 w-12 rounded-full bg-vivid-amber/60" />
              </>
            )}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {seals.map((seal, index) => (
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  key={seal._key ?? `seal-${index}`}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <div className="relative">
                    {seal.image && (
                      <Image
                        alt={seal.label ?? 'Selo'}
                        className="size-28 rounded-full object-cover md:size-32"
                        height={128}
                        src={urlForImage(seal.image.asset).auto('format').quality(80).url()}
                        width={128}
                      />
                    )}
                  </div>
                  {seal.label && (
                    <p className="text-center font-semibold text-sm text-white/80">{seal.label}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
