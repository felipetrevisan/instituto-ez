'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHomeMathematizer } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Mathematizers = ({
  data,
  locale,
}: {
  data: SectionHomeMathematizer
  locale: string
}) => {
  const { setIsContactDialogOpen } = useShared()
  const t = useTranslations('LandingPageHome')

  return (
    <StickySection className="relative bg-background py-20 md:py-32" id="mathematizer">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--brand-accent-rgb),0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center">
            {data?.heading?.[locale] && (
              <motion.h2
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
              </motion.h2>
            )}

            {data?.subheading?.[locale] && (
              <div className="space-y-4 text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                alt=""
                className="h-[400px] w-full object-cover lg:h-[450px]"
                fill
                src={urlForImage(data.image.asset).format('webp').quality(80).url()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />

              <div className="absolute right-6 bottom-6 left-6 flex gap-4">
                <div
                  className="flex-1 rounded-xl bg-background/95 p-4 shadow-lg backdrop-blur-sm"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="mb-1 font-bold text-2xl text-primary">+90%</div>
                  <div className="text-muted-foreground text-xs">{t('metricsPrecision')}</div>
                </div>
                <div
                  className="flex-1 rounded-xl bg-background/95 p-4 shadow-lg backdrop-blur-sm"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="mb-1 font-bold text-2xl text-accent">100%</div>
                  <div className="text-muted-foreground text-xs">{t('safeDecision')}</div>
                </div>
              </div>
            </div>

            <div className="-bottom-4 -right-4 absolute size-32 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        {data.items.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((service, index) => {
              return (
                <motion.div
                  className="flex min-h-[88px] cursor-pointer items-center gap-4 rounded-2xl border border-accent/20 bg-card/60 p-5 shadow-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={`home-services-${index}`}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {service.icon && (
                    <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="size-6 text-accent/70" name={service.icon} strokeWidth={2} />
                    </div>
                  )}
                  <p className="font-semibold text-[0.9rem] text-foreground/95 leading-snug">
                    {service.title[locale]}
                  </p>
                </motion.div>
              )
            })}
          </div>
        )}

        {data.cta && data.cta.length > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          >
            {data.cta.map((button) => {
              return (
                <CallAction
                  action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                  base="default"
                  className="group px-8 py-6 font-semibold"
                  effect={button.theme.effect}
                  icon={{
                    prefix: {
                      className: 'size-5',
                      name: button.iconPrefix as IconName,
                    },
                    suffix: {
                      className: 'ml-2 size-5 transition-transform group-hover:translate-x-1',
                      name: button.iconSuffix as IconName,
                    },
                  }}
                  key={button._key}
                  label={button.label[locale]}
                  link={button.type === LinkType.DIALOG ? undefined : button.link[locale]}
                  onClick={
                    button.type === LinkType.DIALOG ? () => setIsContactDialogOpen(true) : undefined
                  }
                  rounded={button.theme.rounded}
                  size={button.theme.size}
                  theme={button.theme.theme}
                  variant={button.theme.variant}
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
