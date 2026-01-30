import { CardsComponent, type CardsType } from '@ez/shared/sanity/components/cards'
import { urlForImage } from '@ez/web/config/image'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import Image from 'next/image'

export const CardsWrapper = ({ value }: { value: CardsType }) => {
  return (
    <FadeIn>
      <CardsComponent
        ImageComponent={Image}
        imageBuilder={urlForImage}
        portableComponentsOverrides={createPortableComponents()}
        value={value}
      />
    </FadeIn>
  )
}
