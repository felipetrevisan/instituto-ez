import { type SanityImageSource, getImageDimensions } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

const ImageComponent = ({
  value,
  urlForImage,
}: { value: SanityImageSource; urlForImage?: (source: SanityImageSource) => ImageUrlBuilder }) => {
  if (!value || !urlForImage) {
    return null
  }

  const { width, height } = getImageDimensions(value)

  return (
    <img
      src={urlForImage(value).url()}
      alt=""
      loading="lazy"
      sizes="(max-width: 800px) 100vw, 800px"
      width={width}
      height={height}
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      className="overflow-hidden rounded-2xl"
    />
  )
}

export { ImageComponent }
