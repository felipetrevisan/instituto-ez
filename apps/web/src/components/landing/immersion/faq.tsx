'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ez/shared/ui/accordion'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionImmersionFAQ } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const FAQ = ({ data, locale }: { data: SectionImmersionFAQ; locale: string }) => {
  const t = useTranslations('LandingPageImmersion')

  return (
    <StickySection className="bg-gray-light py-20 md:py-28" id="faq">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3 block font-semibold text-coral text-sm uppercase tracking-wider">
            {t('faqLabel')}
          </span>
          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold text-3xl text-navy md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Accordion className="space-y-4" collapsible rounded="lg" theme="navy" type="single">
            {data?.questions?.map((item, index) => (
              <AccordionItem
                className="overflow-hidden rounded-xl border border-navy/10 bg-white px-6"
                key={item._key ?? item.question?.[locale] ?? item.answer?.[locale] ?? 'faq-item'}
                value={`item-${index}`}
              >
                <AccordionTrigger className="py-5 text-left font-semibold">
                  {item.question?.[locale]}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-gray-warm leading-relaxed">
                  {item.answer?.[locale]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </StickySection>
  )
}
