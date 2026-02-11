'use client'

import { cn } from '@ez/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@ez/shared/ui'
import { Logo } from '@ez/web/components/logo'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionAboutIntro } from '@ez/web/types/landing/about'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Intro = ({ data, locale }: { data: SectionAboutIntro; locale: string }) => {
  const colors = ['cyan', 'coral', 'purple']

  return (
    <StickySection className="bg-background py-20 md:py-28" id="intro">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-12 flex flex-col items-center justify-center gap-4 md:flex-row"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
          <Logo showSlogan={false} />
        </motion.div>

        {data.items.length > 0 && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            {data.items.map((item, index) => {
              const color = colors[index % colors.length]

              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={`about-intro-${index}`}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card
                    className={cn(
                      'border-2 border-cyan/20 shadow-soft transition-all duration-300 hover:shadow-medium',
                      {
                        'border-cyan/20 hover:border-cyan/40': color === 'cyan',
                        'border-coral/20 hover:border-coral/40': color === 'coral',
                        'border-purple/20 hover:border-purple/40': color === 'purple',
                      },
                    )}
                    theme="landing"
                    variant="landing"
                  >
                    <CardHeader className="space-y-1.5 p-6">
                      <CardTitle className="text-center text-2xl">
                        <PortableText
                          components={createPortableComponents()}
                          value={item.title[locale]}
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <p className="mb-6 text-gray-warm leading-relaxed">
                        <PortableText
                          components={createPortableComponents()}
                          value={item.description[locale]}
                        />
                      </p>
                      {item.icon && (
                        <Icon
                          className={cn('size-12 opacity-60', {
                            'text-cyan': color === 'cyan',
                            'text-coral': color === 'coral',
                            'text-purple': color === 'purple',
                          })}
                          name={item.icon}
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </StickySection>
  )
}
