'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionServicesWhoIsItFor } from '@ez/web/types/landing/services'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const WhoIsItFor = ({
  data,
  locale,
}: {
  data: SectionServicesWhoIsItFor
  locale: string
}) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection className="w-screen bg-gray-light py-20 md:py-32" id="assessment">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          {data?.heading?.[locale] && (
            <h2 className="mb-12 text-center font-bold text-3xl md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.text?.[locale] && (
            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
            </div>
          )}

          {data?.footer?.[locale] && (
            <p className="pt-4 text-center font-semibold text-accent text-xl">
              <PortableText components={createPortableComponents()} value={data.footer[locale]} />
            </p>
          )}
        </div>

        {data.cta && data.cta.length > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          >
            {data.cta.map((button) => {
              return (
                <CallAction
                  action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                  base="about"
                  className="group px-8 py-6 font-semibold"
                  effect={button.theme.effect}
                  icon={{
                    prefix: {
                      className: 'mr-2 size-5',
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
