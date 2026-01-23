'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionEbooksCatalog } from '@ez/web/types/landing/ebooks'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'

export const Catalog = ({ data, locale }: { data: SectionEbooksCatalog; locale: string }) => {
  return (
    <StickySection className="mt-4" id="catalog">
      <div className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8">
          <PortableText components={createPortableComponents()} value={data.content[locale]} />
        </div>
      </div>
    </StickySection>
  )
}
