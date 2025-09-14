import { getImageDimensions, type SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

const ImageComponent = ({
  value,
  urlForImage,
}: {
  value: SanityImageSource
  urlForImage?: (source: SanityImageSource) => ImageUrlBuilder
}) => {
  if (!value || !urlForImage) {
    return null
  }

  const { width, height } = getImageDimensions(value)

  return (
    <div
      className="overflow-hidden rounded-2xl"
      role="img"
      style={{
        backgroundImage: `url(${urlForImage(value).url()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: width,
        height: height,
        aspectRatio: width / height,
      }}
    />
  )
}

export { ImageComponent }
