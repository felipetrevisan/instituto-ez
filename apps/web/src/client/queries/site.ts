import { groq } from 'next-sanity'

export const siteConfigQuery = groq`
  *[ _type == 'siteConfig' ][0] {
    title,
    description,
    keywords,
    slogan,
    "contact": {
      "form": contactForm,
      "email": email,
    },
    "logo": logo {
      "asset": asset,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      }
    },
    "hero": hero[] { 
      "background": background_image {
        "asset": asset,
        "metadata": {
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        }
      }, 
      title, 
      description 
    },
    "sections": sections_home[] {
      "key": key_section,
      "show": show_section,
      "title": section_title,
      "subtitle": section_subtitle
    },
    "primaryNavigation": main_nav-> {
      "items": items[] {
        "id": _key,
        "hasSubmenu": has_submenu,
        "label": navigation_label,
        "columns": submenu_columns,
        has_submenu => {
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
          link_type == "LANDING" => {
            "link": internal_link->seo->slug
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
    "testimonialsConfig": {
      "type": testimonials_type,
      "theme": testimonials_theme,
      "variant": testimonials_variant,
      "rounded": testimonials_rounded,
    }
  }
`
