import { CardsComponent, type CardsType } from '@ez/shared/sanity/components/cards'
import { urlForImage } from '@ez/web/config/image'
import Image from 'next/image'

export const CardsWrapper = ({ value }: { value: CardsType }) => {
  return <CardsComponent value={value} imageBuilder={urlForImage} ImageComponent={Image} />
}
