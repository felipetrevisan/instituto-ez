import type { SanityImageSource } from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'
import { dataset } from './env'

const imageBuilder = createImageUrlBuilder({
  dataset,
  projectId,
})

export function urlForImage(source: SanityImageSource) {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export function resolveOpenGraphImage(image: SanityImageSource, width = 1200, height = 627) {
  if (!image) return

  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()

  if (!url) return

  return { url, alt: '', width, height }
}
