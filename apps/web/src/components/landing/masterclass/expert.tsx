'use client'

import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionMasterclassExpert } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { Target } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

export const Expert = ({ data, locale }: { data: SectionMasterclassExpert; locale: string }) => {
  const name = resolveLocaleString(data?.name, locale)
  const emphasis = resolveLocaleString(data?.emphasis, locale)

  return (
    <StickySection className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32" id="expert">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container relative z-10 px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="font-bold font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="relative">
              <div className="-inset-4 absolute rounded-3xl bg-gradient-gold opacity-20 blur-2xl" />
              {data?.image && (
                <Image
                  alt={name ?? 'Especialista'}
                  className="relative z-10 mx-auto aspect-[3/4] w-full max-w-md rounded-2xl object-cover shadow-card"
                  height={900}
                  src={urlForImage(data.image.asset).auto('format').quality(80).url()}
                  width={720}
                />
              )}
              <div className="-bottom-4 -right-4 absolute h-full w-full rounded-2xl border-2 border-primary/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {name && (
              <h3 className="mb-6 font-bold font-display text-2xl text-foreground md:text-3xl">
                {name}
              </h3>
            )}
            {emphasis && <p className="mb-4 text-muted-foreground text-sm">{emphasis}</p>}

            {data?.credentials && data.credentials.length > 0 && (
              <div className="mb-8 space-y-3">
                {data.credentials.map((credential, index) => (
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    key={credential._key ?? `credential-${index}`}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    {credential.icon ? (
                      <Icon className="size-5 text-primary" name={credential.icon} />
                    ) : (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                    <span className="text-muted-foreground">
                      {resolveLocaleString(credential.text, locale)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {data?.bio?.[locale] && (
              <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                <PortableText components={createPortableComponents()} value={data.bio[locale]} />
              </p>
            )}

            {data?.workAreas && data.workAreas.length > 0 && (
              <div className="grid gap-3">
                {data.workAreas.map((area, index) => (
                  <motion.div
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3"
                    initial={{ opacity: 0, y: 10 }}
                    key={area?._key ?? `work-area-${index}`}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Target className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground text-sm">
                      {resolveLocaleString(area?.text, locale)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </StickySection>
  )
}
