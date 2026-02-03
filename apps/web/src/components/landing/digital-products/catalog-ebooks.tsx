'use client'

import { EbookCard } from '@ez/web/components/landing/digital-products/ebook-card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { useEbooks } from '@ez/web/hooks/use-ebook'
import type { SectionDigitalProductsEbooksCatalog } from '@ez/web/types/landing/digital-products'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { BookOpen } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { PortableText } from 'next-sanity'

export const CatalogEbooks = ({
  data,
  locale,
}: {
  data: SectionDigitalProductsEbooksCatalog
  locale: string
}) => {
  const { data: ebooks } = useEbooks()
  const t = useTranslations('DigitalProducts')

  return (
    <StickySection
      className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-background dark:to-secondary"
      id="catalog"
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy/10 px-4 py-2 font-medium text-navy text-sm">
            <BookOpen className="size-4" />
            {t('badgeEbooks')}
          </div>
          {data?.heading?.[locale] && (
            <h2 className="mb-4 font-bold text-3xl text-navy md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.subheading?.[locale] && (
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </p>
          )}
        </motion.div>

        {ebooks && ebooks.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ebooks.map((ebook, index) => (
              <EbookCard ebook={ebook} index={index} key={ebook.id} />
            ))}
          </div>
        )}
      </div>
    </StickySection>
  )
}
