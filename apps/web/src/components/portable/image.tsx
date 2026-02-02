import { ImageComponent } from '@ez/shared/sanity/components/image'
import type { Image } from '@ez/shared/types/assets'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { urlForImage } from '@ez/web/config/image'

export const ImageWrapper = ({ value }: Image) => {
  return (
    <FadeIn>
      <ImageComponent urlForImage={urlForImage} value={value} />
    </FadeIn>
  )
}
