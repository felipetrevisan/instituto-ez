import { groq } from 'next-sanity'

export const bannerQuery = groq`
  *[ _type == 'banner' ] | order(orderRank) { 
    "id": _id,
    title,
    subtitle,
    "image": background_image {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`
