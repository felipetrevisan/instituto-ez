import { groq } from 'next-sanity'

const pageFields = `
  slug,
`

const buttonFields = `
   _key,
  "visible": show_button,
  "disabled": disable_button,
  "label": button_label,
  "iconPrefix": button_icon_prefix,
  "iconSuffix": button_icon_suffix,
  "type": button_link_type,
  "link": button_internal_link->slug,
  "params": button_internal_params,
  "externalUrl": button_external_url,
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
    _type == "section.hero" || 
    _type == "mathematizer.cta" || 
    _type == "forbusiness.cta" || 
    _type == "mentoring.cta" ||
    _type == "about.cta" ||
    _type == "services.cta" ||
    _type == "home.cta" ||
    _type == "home.services" ||
    _type == "home.mentorship" ||
    _type == "home.development" ||
    _type == "home.mathematizer" ||
    _type == "home.digitalproducts" ||
    _type == "home.immersion" ||
    _type == "services.methodsessions" ||
    _type == "services.whoisitfor" ||
    _type == "ebooks.cta" => cta[] {
      ...,
     ${buttonFields}
    },
    cta {
      ...,
      ${buttonFields}
    } 
  )
`

const navigationFields = `
  "navigation": navigation-> {
    "items": items[] {
      "id": _key,
      "hasSubmenu": has_submenu,
      "label": navigation_label,
      "columns": submenu_columns,
      "submenu": navigation_submenu_items[] {
        "label": navigation_label,
        "url": navigation_item_url {
          "isHome": is_home,
          "type": link_type,
          is_home == true => {
            "link": "/"
          },
          link_type == "INTERNAL" || link_type == "LANDING" => {
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
      },
      "url": navigation_item_url {
        "isHome": is_home,
        "type": link_type,
        is_home == true => {
          "link": "/"
        },
        link_type == "INTERNAL" => {
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
  },
`

export const landingPageQuery = groq`*[ _type == 'landingPage' && slug[$locale].current == $slug] [0] {
  "id": _id,
  key,
  "settings": {
    ...page,
    ${pageFields}
    ${navigationFields}
    form,
  },
  sections[] {
    ...,
    ${ctaField},
    _type == "forbusiness.courses" || _type == "forbusiness.lectures" => {
      "items": items[] {
        ...,
        "cta": cta {
          ${buttonFields}
        }
      }
    }
  }
}`
