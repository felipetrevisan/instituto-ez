import { groq } from 'next-sanity'

export const servicesQuery = groq`
  *[ _type == 'service' ] | order(orderRank) { 
    "id": _id,
    title,
    "image": image {
      "asset": asset,
        "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    disabled,
    "button": button {
      "visible": show_button,
      "disabled": disable_button,
      "label": button_label,
      "type": button_link_type,
      "link": button_internal_link->slug,
      "params": button_internal_params,
      "externalUrl": button_external_url
    }
  }
`
