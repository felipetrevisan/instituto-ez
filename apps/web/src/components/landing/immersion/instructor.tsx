'use client'

import { cn } from '@ez/shared/lib/utils'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionImmersionInstructor } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Instructor = ({
  data,
  locale,
}: {
  data: SectionImmersionInstructor
  locale: string
}) => {
  const colors = ['cyan', 'coral']

  return (
    <StickySection className="bg-navy py-16 sm:py-20 md:py-28" id="instructors">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3 block font-semibold text-coral text-sm uppercase tracking-wider">
            Seus Guias
          </span>

          {data?.heading?.[locale] && (
            <motion.h2
              className="mb-6 font-bold text-3xl text-white md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data?.text?.[locale] && (
            <div className="mx-auto max-w-2xl text-lg text-white/70">
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
            </div>
          )}
        </motion.div>

        {data.items && data.items?.length > 0 && (
          <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-2'>
            {data.items.map((instructor, index) => {
              const color = colors[index % colors.length]
              return (
                <motion.div
                  className='rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-coral/30'
                  initial={{ opacity: 0, y: 30 }}
                  key={instructor.name}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={cn('mb-6 flex size-16 items-center justify-center rounded-full', {
                      'bg-cyan/50': color === 'cyan',
                      'bg-coral/50': color === 'coral',
                    })}
                  >
                    {instructor.icon && (
                      <Icon
                        className={cn('size-8', {
                          'text-cyan': color === 'cyan',
                          'text-coral': color === 'coral',
                        })}
                        name={instructor.icon}
                      />
                    )}
                  </div>

                  <h3 className='mb-1 font-bold text-2xl text-white'>
                    {instructor.name}
                    {instructor.subtitle?.[locale] && (
                      <span className='ml-2 font-normal text-coral'>
                        {instructor.subtitle[locale]}
                      </span>
                    )}
                  </h3>

                  <p
                    className={cn('mb-4 font-medium', {
                      'text-cyan': color === 'cyan',
                      'text-coral': color === 'coral',
                    })}
                  >
                    {instructor.title?.[locale]}
                  </p>

                  {instructor.description?.[locale] && (
                    <div className="text-white/70 leading-relaxed">
                      <PortableText
                        components={createPortableComponents()}
                        value={instructor.description[locale]}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {data?.footer?.[locale] && (
          <motion.div
            className="mt-12 text-center font-medium text-white/80 text-xl"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            <PortableText components={createPortableComponents()} value={data.footer[locale]} />
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
