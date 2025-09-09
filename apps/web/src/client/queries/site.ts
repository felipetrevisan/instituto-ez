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
        "submenu": navigation_submenu_items[] {
          "label": navigation_label,
          "url": navigation_item_url {
            "isHome": is_home,
            "type": link_type,
            "link": internal_link->slug,
            "externalUrl": external_url,
          }
        },
        "url": navigation_item_url {
          "isHome": is_home,
          "type": link_type,
          "link": internal_link->slug,
          "externalUrl": external_url
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
