'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionServicesAssessment } from '@ez/web/types/landing/services'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'

export const Assessment = ({
  data,
  locale,
}: {
  data: SectionServicesAssessment
  locale: string
}) => {
  return (
    <StickySection className="w-screen bg-gray-light py-20 md:py-32" id="assessment">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          {data?.heading?.[locale] && (
            <h2 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.text?.[locale] && (
            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
            </div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
