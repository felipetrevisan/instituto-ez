'use client'

import { cn } from '@ez/shared/lib/utils'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionImmersionExperience } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Experience = ({
  data,
  locale,
}: {
  data: SectionImmersionExperience
  locale: string
}) => {
  const colors = ['coral', 'cyan', 'amber', 'purple', 'rose', 'emerald']

  return (
    <StickySection className="bg-gradient-subtle" id="experience">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3 block font-semibold text-coral text-sm uppercase tracking-wider">
            O Que Você Vai Vivenciar
          </span>

          {data?.heading?.[locale] && (
            <motion.h2
              className="mb-6 font-bold text-3xl text-navy md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data?.subheading?.[locale] && (
            <div className="mx-auto max-w-3xl text-gray-warm text-lg leading-relaxed">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </div>
          )}
        </motion.div>

        {data.elements && data.elements?.length > 0 && (
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.elements.map((element, index) => {
              const color = colors[index % colors.length]
              return (
                <motion.div
                  className={cn(
                    'group rounded-2xl border border-navy/5 bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-medium',
                    {
                      'from-coral/20 to-coral/5': color === 'coral',
                      'from-cyan/20 to-cyan/5': color === 'cyan',
                      'from-amber-500/20 to-amber-500/5': color === 'amber',
                      'from-purple/20 to-pupple/5': color === 'purple',
                      'from-rose-500/20 to-rose-500/5': color === 'rose',
                      'from-emerald-500/20 to-emerald-500/5': color === 'emerald',
                    },
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  key={`${element._type}-${index}`}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {element.icon && (
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white shadow-soft transition-transform group-hover:scale-110">
                      <Icon className="size-6 text-navy" name={element.icon} />
                    </div>
                  )}

                  <h3 className="mb-3 font-bold text-navy text-xl">{element.title?.[locale]}</h3>

                  {element.description?.[locale] && (
                    <div className="text-gray-warm leading-relaxed">
                      <PortableText
                        components={createPortableComponents()}
                        value={element.description[locale]}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          className="mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 text-center">
            {data.featuredElement?.image && (
              <motion.div
                className="relative h-[400px] w-full"
                initial={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="absolute inset-0 opacity-20">
                  <Image
                    alt=""
                    className="h-full w-full object-cover"
                    fill
                    src={urlForImage(data.featuredElement.image.asset)
                      .auto('format')
                      .quality(80)
                      .url()}
                  />
                </div>
              </motion.div>
            )}
            <div className="relative z-10">
              {data?.featuredElement?.element?.icon && (
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-coral/20">
                  <Icon className="size-8 text-coral" name={data.featuredElement.element.icon} />
                </div>
              )}
              <h3 className="mb-4 font-bold text-2xl text-white">
                {data?.featuredElement?.element?.title?.[locale]}
              </h3>

              {data?.featuredElement?.element?.description && (
                <div className="text-lg text-white/80 leading-relaxed">
                  <PortableText
                    components={createPortableComponents()}
                    value={data.featuredElement.element.description[locale]}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl text-navy font-medium mb-8">
            Cada um desses elementos será vivido com{' '}
            <span className="text-coral">profundidade</span>,{' '}
            <span className="text-coral">respeito</span> e{' '}
            <span className="text-coral">verdade</span>. <br />
            Ao final da imersão, não será apenas sua fé que estará mais forte —{' '}
            <strong>será você por inteiro!</strong>
          </p>

          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-coral hover:bg-coral/90 text-white px-10 py-7 text-lg font-semibold shadow-medium transition-all hover:scale-105 rounded-full"
          >
            Quero Participar da Imersão
          </Button>
        </motion.div> */}
      </div>
    </StickySection>
  )
}
