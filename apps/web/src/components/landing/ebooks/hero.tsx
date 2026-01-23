'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionEbooksHero } from '@ez/web/types/landing/ebooks'

export const Hero = ({ data }: { data: SectionEbooksHero; locale: string }) => {
  return (
    <StickySection className="relative mt-24 h-[500px] w-screen" id="hero">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${urlForImage(data.image.asset).auto('format').quality(80).url()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </StickySection>
  )
}
