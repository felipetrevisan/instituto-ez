import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  title,
  description,
  slug,
`
export const pageQueryWithSlug = groq`*[ _type == 'page' && slug[$locale].current == $slug] [0] {
  ${fields}
  keywords,
  "sections": section[] {
    title,
    hash,
    "media": {
      "type": background_type,
      background_type == "IMAGE" => {
        "image": image {
          "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      background_type == "VIDEO" => {
        "video": {
          "url": video
        }
      }
    },
    content {
      ...,
      _type == "buttonLink" => {
        ...,
        link->{slug},
      }
    },
    "background": {
      "image": background {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "title": background_title
    }
  }
}`

export const pageQuery = groq`*[ _type == 'page'] {
  ${fields}
}`
