'use client'

import { WebinarCard } from '@ez/web/components/landing/digital-products/webinar-card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { useWebinars } from '@ez/web/hooks/use-webinar'
import type { SectionDigitalProductsWebinarCatalog } from '@ez/web/types/landing/digital-products'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { Video } from 'lucide-react'
import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'

export const CatalogWebinar = ({
  data,
  locale,
}: {
  data: SectionDigitalProductsWebinarCatalog
  locale: string
}) => {
  const { data: webinar } = useWebinars()

  return (
    <StickySection className="bg-navy py-20" id="catalog-webinar">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-cyan/20 px-4 py-2 font-medium text-cyan text-sm'>
            <Video className="size-4" />
            Webinários
          </div>
          {data?.heading?.[locale] && (
            <h2 className="mb-4 font-bold text-3xl text-navy md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.subheading?.[locale] && (
            <p className="mx-auto max-w-2xl text-gray-300 text-lg">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </p>
          )}
          <h2 className='mb-4 font-bold text-3xl text-white md:text-4xl lg:text-5xl'>
            Aprendizado em vídeo
          </h2>
          <p className='mx-auto max-w-2xl text-gray-300 text-lg'>
            Aulas gravadas com conteúdo aprofundado. Uma experiência imersiva de aprendizado com o
            neurocientista Enzo Pasqualetti.
          </p>
        </motion.div>

        {/* {ebooks && ebooks.length > 0 && (
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {ebooks.map((ebook, index) => (
              <WebinarCard ebook={ebook} index={index} key={ebook.id} />
            ))}
          </div>
        )} */}
      </div>
    </StickySection>
  )
}
