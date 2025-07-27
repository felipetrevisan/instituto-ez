import { getImageUrlBuilder } from '@ez/shared/sanity/image'
import { env } from '@ez/web/config/env'

const { urlForImage, resolveOpenGraphImage } = getImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
})

export { urlForImage, resolveOpenGraphImage }
