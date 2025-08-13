import { CardsComponent, type CardsType } from '@ez/shared/sanity/components/cards'
import { urlForImage } from '@ez/web/config/image'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import Image from 'next/image'

export const CardsWrapper = ({ value }: { value: CardsType }) => {
  return (
    <CardsComponent
      value={value}
      imageBuilder={urlForImage}
      ImageComponent={Image}
      portableComponentsOverrides={createPortableComponents()}
    />
  )
}
