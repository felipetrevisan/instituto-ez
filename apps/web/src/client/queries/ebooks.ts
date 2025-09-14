import { groq } from 'next-sanity'

const fields = `
   "id": _id,
    title,
    slug,
    subtitle,
    description,
`

const priceField = `
  "price": price {
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
    },
    "theme": {
      "regular": price_regular_color {
        "background": {
          "primary": background_primary,
          "secondary": background_secondary,
        },
        border,
        "text": {
          "stroke": text_stroke,
          "fill": text_fill
        }
      },
      "free": price_free_color {
        "background": {
          "primary": background_primary,
          "secondary": background_secondary,
        },
        border,
        "text": {
          "stroke": text_stroke,
          "fill": text_fill
        }
      }
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
    "visible": show_button,
    "disabled": disable_button,
    "label": button_label,
    "type": button_link_type,
    "link": button_internal_link->slug,
    "params": button_internal_params,
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
  "theme": theme {
    text,
    primary,
    secondary,
    tertiary,
    "button": {
      "header": header_button {
        "default": {
          "text": text_default,
          "background": default
        },
        "hover": {
          "text": text_hover,
          "background": hover
        },
      },
      "stickyHeader": sticky_header_button {
        "default": {
          "text": text_default,
          "background": default
        },
        "hover": {
          "text": text_hover,
          "background": hover
        },
      }
    }
  },
`

const seoField = `
  "seo": {
    "description": seoDescription,
    "keywords": seoKeywords
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
    disabled,
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
    disabled,
    ${buttonField}
  }
`

export const ebooksCollectionQuery = groq`
  *[ _type == 'ebooks-collection'] { 
    "id": _id,
    title,
    ebooks[]-> {
      ${fields}
      ${priceField}
      ${imageField}
      disabled,
      ${buttonField}
    }
  }
`

export const ebooksCollectionQueryByCollection = groq`
  *[ _type == 'ebooks-collection' && _id == $id] [0] { 
    "id": _id,
    title,
    ebooks[]-> {
      ${fields}
      ${priceField}
      ${imageField}
      disabled,
      ${buttonField}
    }
  }
`
