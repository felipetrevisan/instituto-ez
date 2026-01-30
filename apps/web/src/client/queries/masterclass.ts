import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  title,
  slug,
  "template": {
    "id": templateId
  },
  enabled,
  status,
  startAt,
  duration,
  timezone,
  location,
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
    keywords,
    "image": image {
      ${imageField}
    }
  },
`

const buttonFields = `
   _key,
  "visible": show_button,
  "disabled": disable_button,
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
  "dialog": select(
    button_link_type == "DIALOG" => {
      "type": dialog_type,
      "subject": dialog_contact_subject
    },
    null
  ),
  "params": button_internal_params,
  "theme": {
    theme,
    variant,
    rounded,
    size,
    effect
  }
`

const ctaField = `
  "cta": select(
    _type == "masterclass.hero" || _type == "masterclass.finalCta" => cta[] {
      ...,
      ${buttonFields}
    },
    cta {
      ...,
      ${buttonFields}
    }
  )
`

export const masterclassQuery = groq`
  *[ _type == "masterclass" && enabled == true ] | order(orderRank) {
    ${fields}
    ${cardField}
  }
`

export const masterclassQueryBySlug = groq`
  *[ _type == "masterclass" && slug[$locale].current == $slug && enabled == true ] [0] {
    ${fields}
    ${seoField}
    ${cardField}
    sections[] {
      ...,
      ${ctaField},
      _type == "masterclass.hero" => {
        ...,
        "image": image {
          ${imageField}
        }
      },
      _type == "masterclass.finalCta" => {
        ...,
        "image": image {
          ${imageField}
        }
      },
      _type == "masterclass.expert" => {
        ...,
        "experts": experts[] {
          ...,
          "photo": photo {
            ${imageField}
          },
          "socials": socials[] { ... }
        }
      }
    }
  }
`
