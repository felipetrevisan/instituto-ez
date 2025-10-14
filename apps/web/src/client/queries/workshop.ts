import { groq } from 'next-sanity'

export const workshopQuery = groq`
  *[ _type == 'workshop' ] | order(orderRank) { 
    "id": _id,
    title,
    slug,
    subtitle,
    disabled,
    "background": image {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
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
