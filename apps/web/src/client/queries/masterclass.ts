import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  title,
  slug,
  enabled,
`

const imageField = `
  "asset": asset,
  "metadata": {
    "lqip": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions
  }
`

const cardField = `
  "card": card {
    title,
    description,
    badge,
    "image": image {
      ${imageField}
    }
  },
`

const seoField = `
  "seo": seo {
    title,
    description,
    "image": image {
      ${imageField}
    }
  },
`

const buttonFields = `
   _key,
  "label": button_label,
  "iconPrefix": button_icon_prefix,
  "iconSuffix": button_icon_suffix,
  "type": button_link_type,
  "link": select(
    button_link_type == "INTERNAL" || button_link_type == "LANDING" =>
      button_internal_link->slug,
    null
  ),
  "externalUrl": select(
    button_link_type == "EXTERNAL" => button_external_url,
    null
  ),
  "scrollTo": select(
    button_link_type == "HASH" => button_scroll_to,
    null
  ),
  "dialog": select(
    button_link_type == "DIALOG" => {
      "type": dialog_type,
      "subject": dialog_contact_subject
    },
    null
  ),
  "theme": {
    theme,
    variant,
    size
  }
`

export const masterclassQuery = groq`
  *[ _type == "masterclass" && (!defined(enabled) || enabled == true) ] | order(orderRank) {
    ${fields}
    ${cardField}
  }
`

export const masterclassQueryBySlug = groq`
  *[
    _type == "masterclass" &&
    (
      (
        (!defined(enabled) || enabled == true) &&
        (
          slug[$locale].current == $slug ||
          slug[$locale] == $slug ||
          slug.current == $slug ||
          slug == $slug ||
          slug[lang == $locale][0].value.current == $slug ||
          slug[lang == $locale][0].value == $slug
        )
      ) ||
      _id == $slug ||
      _id == "masterclass." + $slug ||
      _id == "drafts.masterclass." + $slug
    )
  ] [0] {
    ${fields}
    ${seoField}
    ${cardField}
    hero {
      badge,
      heading,
      "video": video {
        url,
        duration,
        caption
      }
    },
    pillars {
      badge,
      heading,
      subheading,
      items[] {
        number,
        title,
        subtitle,
        label,
        heading,
        body,
        icon,
        theme,
        "cta": cta {
          ${buttonFields}
        },
        "core": core {
          label,
          icon
        },
        "orbitItems": orbitItems[] {
          label,
          icon
        }
      },
      "cta": cta {
        ${buttonFields}
      }
    },
    testimonials {
      badge,
      heading,
      description
    },
    why {
      badge,
      statement,
      items[] {
        title,
        description
      },
      body,
      closing,
      "cta": cta {
        ${buttonFields}
      }
    },
    author {
      badge,
      heading,
      "author": author {
        name,
        role,
        bio,
        "image": image {
          ${imageField}
        }
      },
      highlights[] {
        icon,
        label,
        text
      }
    },
    offer {
      badge,
      heading,
      subheading,
      sealsHeading,
      seals[] {
        label,
        "image": image {
          ${imageField}
        }
      },
      "price": price {
        original,
        prefix,
        current
      },
      "cta": cta {
        ${buttonFields}
      }
    },
    final {
      heading,
      summary,
      benefits,
      "cta": cta {
        ${buttonFields}
      },
      details[] {
        icon,
        label
      }
    }
  }
`
