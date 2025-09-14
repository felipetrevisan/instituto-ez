import { ImageComponent } from '@ez/shared/sanity/components/image'
import type { Image } from '@ez/shared/types/assets'
import { urlForImage } from '@ez/web/config/image'

export const ImageWrapper = ({ value }: Image) => {
  return <ImageComponent urlForImage={urlForImage} value={value} />
}
