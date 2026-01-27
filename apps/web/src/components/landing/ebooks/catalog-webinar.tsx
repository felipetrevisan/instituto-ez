'use client'

import { WebinarCard } from '@ez/web/components/landing/ebooks/webinar-card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { useEbooksByType } from '@ez/web/hooks/use-ebook'
import type { SectionEbooksCatalog } from '@ez/web/types/landing/ebooks'
import { BookOpen } from 'lucide-react'
import { motion } from 'motion/react'

export const CatalogWebinar = ({
  data,
  locale,
}: {
  data: SectionEbooksCatalog
  locale: string
}) => {
  const { data: ebooks } = useEbooksByType('webinar')

  return (
    <StickySection className="bg-navy py-20" id="catalog-webinar">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy/10 px-4 py-2 font-medium text-navy text-sm">
            <BookOpen className="size-4" />
            eBooks
          </div>
          <h2 className="mb-4 font-bold text-3xl text-navy md:text-4xl lg:text-5xl">
            Conhecimento em suas mãos
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            eBooks desenvolvidos com base em neurociência e comportamento humano para transformar
            sua mentalidade e acelerar seus resultados.
          </p>
        </motion.div>

        {ebooks && ebooks.length > 0 && (
          <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2'>
            {ebooks.map((ebook, index) => (
              <WebinarCard ebook={ebook} index={index} key={ebook.id} />
            ))}
          </div>
        )}
      </div>
    </StickySection>
  )
}
