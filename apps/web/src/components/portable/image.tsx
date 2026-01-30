import { ImageComponent } from '@ez/shared/sanity/components/image'
import type { Image } from '@ez/shared/types/assets'
import { urlForImage } from '@ez/web/config/image'
import { FadeIn } from '@ez/web/components/ui/fade-in'

export const ImageWrapper = ({ value }: Image) => {
  return (
    <FadeIn>
      <ImageComponent urlForImage={urlForImage} value={value} />
    </FadeIn>
  )
}
