import { groq } from 'next-sanity'

const fields = `
  "id": _id,
  title,
  description,
  keywords,
  slug,
  type,
`
export const pageQueryWithSlug = groq`*[ _type == 'page' && slug[$locale].current == $slug && enabled == true] [0] {
  ${fields}
  ...select(
    type == "page" => {
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
        content,
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
    },
    type == "landing" => {
      form,
      "key": key
    }
  )
}`

export const pageQuery = groq`*[ _type == 'page' && enabled == true] {
  ${fields}
}`

export const pageSettingsQueryWithSlug = groq`*[ _type == 'page' && slug[$locale].current == $slug && enabled == true] [0] {
  type,
  type == "landing" => {
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
      }
    },
    form,
    "key": key
  }
}`
