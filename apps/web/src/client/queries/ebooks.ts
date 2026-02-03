import { groq } from 'next-sanity'

const fields = `
   "id": _id,
    title,
    slug,
    subtitle,
    description,
`

const priceField = `
  "price": coalesce(price, priceRef->) {
    "regular": {
      "price": regular,
      "text": regular_text
    },
    "priceOffText": price_off_text,
    "priceByText": price_by_text,
    "hasDiscount": discount,
    "discount": {
      "price": discount_price,
      "text": discount_text
    }
  },
`

const imageField = `
  "image": {
    "en": {
      "background": images.background_image.en {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
      },
      "preview": images.small_image.en {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
      },
      "large": images.large_image.en {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
      }
    },
    "es": {
      "background": images.background_image.es {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
      },
      "preview": images.small_image.es {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
      },
      "large": images.large_image.es {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }
    },
    "pt": {
      "background": images.background_image.pt {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "preview": images.small_image.pt {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      },
      "large": images.large_image.pt {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }
    }
  },
`

const buttonField = `
  "button": button {
    "label": button_label,
    "type": button_link_type,
    "link": button_internal_link->slug,
    "externalUrl": button_external_url
  }
`

const badgeField = `
  "badges": badge[] {
    _key,
    type,
    prefix,
    suffix,
    text,
    value,
    icon
  },
`

const themeField = `
  "theme": coalesce(theme, themeRef->) {
    text,
    primary,
    secondary
  },
`

const seoField = `
  "seo": {
    "description": seoDescription,
    "image": seoImage {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    }
  },
`

const downloadField = `
  "download": download {
    disabled,
    label,
    url
  },
`

const overviewField = `
  "overview": overview {
    title,
    description
  },
`

const indexField = `
  "index": index {
    title,
    description,
    "video": {
      "title": video_title,
      "url": video
    }
  },
`

const questionField = `
  "questions": questions[] {
    _key,
    title,
    content
  },
`

const chapterField = `
  "chapter": chapter {
    "cover": {
     "en": {
        "cover": cover.en {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      "es": {
        "cover": cover.es {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
      "pt": {
        "cover": cover.pt {
        "asset": asset,
          "metadata": {
            "lqip": asset->metadata.lqip,
            "dimensions": asset->metadata.dimensions
          }
        }
      },
    },
    "chapters": chapters[] {
      content
    }
  },
`

const authorField = `
  "authors": author.authors[] {
    _key,
    name,
    "background": background {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "photo": photo {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    content
  },
`

const metadataField = `
  "metadata": data[] {
    _key,
    "media": media {
      type,
      icon,
      image
    },
    suffix,
    prefix,
    title,
    value,
    text,
    type
  },
`
export const ebookQuery = groq`
  *[ _type == 'ebook' ] | order(orderRank) { 
    ${fields}
    ${priceField}
    ${imageField}
    ${buttonField}
  }
`

export const ebookQueryBySlug = groq`
  *[ _type == 'ebook' && slug[$locale].current == $slug] [0] {
    ${fields}
    ${priceField}
    ${badgeField}
    ${themeField}
    ${seoField}
    ${downloadField}
    ${overviewField}
    ${indexField}
    ${questionField}
    ${chapterField}
    ${metadataField}
    ${imageField}
    ${authorField}
    ${buttonField}
  }
`
