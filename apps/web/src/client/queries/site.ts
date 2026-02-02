import { groq } from 'next-sanity'

const navigation = `
  "items": items[] {
    "id": _key,
    "label": navigation_label,
    "url": navigation_item_url {
      "isHome": is_home,
      "type": link_type,
      is_home == true => {
        "link": "/"
      },
      link_type == "INTERNAL" => {
        "link": internal_link->slug
      },
      link_type == "LANDING" => {
        "link": internal_link->slug
      },
      link_type == "EXTERNAL" => {
        "link": external_url,
        "isExternal": true
      },
      link_type == "HASH" => {
        "link": hash_id
      },
    }
  }
`
export const siteConfigQuery = groq`
  *[ _type == 'siteConfig' ][0] {
    title,
    description,
    slogan,
    "contact": {
      "form": contactForm,
      email,
      phone,
      location
    },
    "logo": logo {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "seoImage": seoImage {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "navigation": {
      "header": main_nav-> {
        ${navigation}
      },
      "footer": footer_nav-> {
        ${navigation}
      },
    }
  }
`
